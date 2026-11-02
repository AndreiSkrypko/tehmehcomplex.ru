export const OG_HOME_IMAGE = "/og/home.png";

const EQUIPMENT_OG: Record<string, string> = {
  "topmill-800s": "/og/topmill-800s.png",
  "metatec-1530b": "/og/metatec-1530b.png",
  "metatec-hbc-90-2500": "/og/metatec-hbc-90-2500.png",
  "metatec-next-36x750-pro": "/og/metatec-next-36x750-pro.png",
  "metatec-bs-200-fh": "/og/metatec-bs-200-fh.png",
  "svarochnye-raboty": "/og/svarochnye-raboty.png",
};

export function getEquipmentOgImage(slug: string): string {
  return EQUIPMENT_OG[slug] ?? OG_HOME_IMAGE;
}
