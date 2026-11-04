import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("node", ["scripts/generate-og.mjs"]);
run("node", ["scripts/generate-seo.mjs"]);
run("npx", ["vite", "build"]);
run("node", ["scripts/copy-dist.mjs"]);

const distDir = resolve(root, "dist");
if (!existsSync(resolve(distDir, "index.html"))) {
  console.error("Vercel build failed: dist/index.html not found after copy-dist.");
  process.exit(1);
}

console.log(`Vercel static build ready at ${distDir}`);
