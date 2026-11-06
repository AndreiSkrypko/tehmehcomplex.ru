import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ogDir = join(root, "public", "og");

const homeCard = {
  file: "home.svg",
  accent: "#ECE92C",
  tag: "МЕТАЛЛООБРАБОТКА",
  title: "НА ЧПУ",
  subtitle: "Фрезерование, лазер, гибка, токарка",
  badge: "Точность до 0,02 мм",
};

const cards = [
  {
    file: "topmill-800s.svg",
    accent: "#ECE92C",
    tag: "ФРЕЗЕРОВАНИЕ",
    title: "НА ЧПУ",
    subtitle: "Корпусные детали · отверстия · резьба",
    badge: "TOPMILL 800S",
  },
  {
    file: "metatec-1530b.svg",
    accent: "#7FD44A",
    tag: "ЛАЗЕРНАЯ РЕЗКА",
    title: "МЕТАЛЛА",
    subtitle: "Раскрой по DXF - зона 1530x3050 мм",
    badge: "MetalTec 1530B",
  },
  {
    file: "metatec-hbc-90-2500.svg",
    accent: "#ECE92C",
    tag: "ГИБКА ЛИСТА",
    title: "НА ЧПУ",
    subtitle: "Корпуса · профили · серии",
    badge: "HBC 90/2500",
  },
  {
    file: "metatec-next-36x750-pro.svg",
    accent: "#7FD44A",
    tag: "ТОКАРНЫЕ РАБОТЫ",
    title: "НА ЧПУ",
    subtitle: "Валы · втулки · резьба",
    badge: "NEXT 36x750 Pro",
  },
  {
    file: "metatec-bs-200-fh.svg",
    accent: "#ECE92C",
    tag: "РЕЗКА ЗАГОТОВОК",
    title: "МЕТАЛЛА",
    subtitle: "Ленточнопильный раскрой проката",
    badge: "BS 200 FH",
  },
  {
    file: "svarochnye-raboty.svg",
    accent: "#7FD44A",
    tag: "СВАРОЧНЫЕ",
    title: "РАБОТЫ",
    subtitle: "Каркасы · корпуса · металлоконструкции",
    badge: "MIG / TIG / MMA",
  },
];

function cardSvg({ accent, tag, title, subtitle, badge }) {
  const badgeWidth = Math.max(280, badge.length * 12 + 48);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#14181D"/>
      <stop offset="0.5" stop-color="#232A31"/>
      <stop offset="1" stop-color="#101418"/>
    </linearGradient>
    <linearGradient id="bar" x1="72" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3CD53C"/>
      <stop offset="0.5" stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(930 300) scale(260)">
      <stop stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" stroke="#FFFFFF" stroke-opacity="0.035"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="930" cy="300" r="260" fill="url(#glow)"/>
  <rect x="72" y="88" width="6" height="76" fill="url(#bar)"/>
  <text x="96" y="118" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="5" fill="${accent}">T M K</text>
  <text x="72" y="206" font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="700" fill="#FFFFFF">${tag}</text>
  <text x="72" y="270" font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="700" fill="${accent}">${title}</text>
  <text x="72" y="326" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#FFFFFF" fill-opacity="0.78">${subtitle}</text>
  <rect x="72" y="360" width="${badgeWidth}" height="44" rx="22" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="92" y="389" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">${badge}</text>
  <text x="72" y="536" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="600" letter-spacing="2" fill="#FFFFFF" fill-opacity="0.48">СМОЛЕНСК · TMK</text>
  <text x="72" y="572" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#FFFFFF">tehmehcomplex.ru</text>
  <circle cx="930" cy="300" r="132" fill="none" stroke="${accent}" stroke-opacity="0.24" stroke-width="2"/>
  <circle cx="930" cy="300" r="88" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
  <path d="M850 390 L930 230 L1010 390 Z" fill="#FFFFFF" fill-opacity="0.04"/>
</svg>`;
}

mkdirSync(ogDir, { recursive: true });

writeFileSync(join(ogDir, homeCard.file), cardSvg(homeCard));

for (const card of cards) {
  writeFileSync(join(ogDir, card.file), cardSvg(card));
}

async function rasterize() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("sharp not installed — OG PNG files skipped. Run: npm i -D sharp && node scripts/generate-og.mjs");
    return;
  }

  const files = readdirSync(ogDir).filter((name) => name.endsWith(".svg"));
  for (const file of files) {
    const input = join(ogDir, file);
    const output = join(ogDir, file.replace(/\.svg$/, ".png"));
    const svg = readFileSync(input);
    await sharp(svg, { density: 150 }).resize(1200, 630).png({ quality: 94 }).toFile(output);
    console.log(`Generated ${output}`);
  }

  const homePng = join(ogDir, "home.png");
  if (existsSync(join(ogDir, "home.svg"))) {
    await sharp(readFileSync(join(ogDir, "home.svg")), { density: 150 })
      .resize(1200, 630)
      .png({ quality: 94 })
      .toFile(homePng);
    console.log(`Generated ${homePng}`);
  }

  const rootOg = join(root, "public", "og-image.png");
  if (existsSync(homePng)) {
    writeFileSync(rootOg, readFileSync(homePng));
    console.log(`Copied to ${rootOg}`);
  }
}

await rasterize();
