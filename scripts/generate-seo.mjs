import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "public");

const SITE_URL = "https://tehmehcomplex.ru";

function readEquipmentSlugs() {
  const source = readFileSync(resolve(root, "src/lib/equipment-slugs.ts"), "utf8");
  const block = source.slice(source.indexOf("export const EQUIPMENT_SLUGS"));
  const list = block.slice(0, block.indexOf("] as const"));
  return [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
}

function readGeoSlugs() {
  const source = readFileSync(resolve(root, "src/lib/geo-landings.ts"), "utf8");
  const block = source.slice(source.indexOf("export const GEO_LANDINGS"));
  return [...block.matchAll(/\{\s*\n\s+slug: "([a-z0-9-]+)"/g)].map((match) => match[1]);
}

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlEntry(loc, { changefreq, priority }) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const equipmentSlugs = readEquipmentSlugs();
const geoSlugs = readGeoSlugs();
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  urlEntry(`${SITE_URL}/`, { changefreq: "weekly", priority: "1.0" }),
  urlEntry(`${SITE_URL}/transport`, { changefreq: "weekly", priority: "0.9" }),
  ...equipmentSlugs.map((slug) =>
    urlEntry(`${SITE_URL}/production/${slug}`, {
      changefreq: "monthly",
      priority: slug.startsWith("lite-") || slug.startsWith("obrabotka-") ? "0.85" : "0.9",
    }),
  ),
  ...geoSlugs.map((slug) =>
    urlEntry(`${SITE_URL}/geo/${slug}`, {
      changefreq: "monthly",
      priority: slug === "moskva" || slug === "sankt-peterburg" ? "0.8" : "0.75",
    }),
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(resolve(publicDir, "robots.txt"), robots, "utf8");

console.log(
  `Generated public/robots.txt and public/sitemap.xml (${urls.length} URLs, lastmod ${lastmod})`,
);
