import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

import { EQUIPMENT_SLUGS } from "./src/lib/equipment-slugs";
import { GEO_SLUGS } from "./src/lib/geo-slugs";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      server: { entry: "./src/server.ts" },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
      pages: [
        { path: "/cases", prerender: { enabled: true } },
        ...EQUIPMENT_SLUGS.map((slug) => ({
          path: `/production/${slug}`,
          prerender: { enabled: true },
        })),
        ...GEO_SLUGS.map((slug) => ({
          path: `/geo/${slug}`,
          prerender: { enabled: true },
        })),
      ],
    }),
    nitro(),
    viteReact(),
  ],
});
