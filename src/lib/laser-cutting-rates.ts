/**
 * Базовый прайс лазера — как на romedov.by (BYN за пог. м).
 * На tehmehcomplex.ru — ₽, целые суммы, +60 % к белорусскому ориентиру.
 */

import { RU_PRICE_FACTOR_VS_BY } from "@/lib/calculator-ru-pricing";

export const LASER_EQUIPMENT_SLUG = "metatec-1530b";
export const LASER_CURRENCY_LABEL = "₽";

/** Курс BYN → ₽ до наценки */
export const LASER_BYN_TO_RUB = 28;

export type LaserMaterial = "carbon" | "stainless";

type ThicknessRates = {
  thicknessMm: number;
  label: string;
  ratesByn: [number, number, number, number, number];
};

export const LASER_LENGTH_TIERS = [
  { id: 0, label: "0–100 м", max: 100 },
  { id: 1, label: "101–200 м", max: 200 },
  { id: 2, label: "201–300 м", max: 300 },
  { id: 3, label: "301–400 м", max: 400 },
  { id: 4, label: "401+ м", max: Infinity },
] as const;

export const LASER_CARBON_RATES: ThicknessRates[] = [
  { thicknessMm: 0.6, label: "0,6 мм", ratesByn: [0.05, 0.05, 0.05, 0.04, 0.04] },
  { thicknessMm: 0.7, label: "0,7 мм", ratesByn: [0.06, 0.06, 0.05, 0.05, 0.05] },
  { thicknessMm: 0.8, label: "0,8 мм", ratesByn: [0.07, 0.07, 0.06, 0.06, 0.06] },
  { thicknessMm: 1.0, label: "1,0 мм", ratesByn: [0.09, 0.09, 0.08, 0.08, 0.07] },
  { thicknessMm: 1.2, label: "1,2 мм", ratesByn: [0.1, 0.1, 0.09, 0.09, 0.08] },
  { thicknessMm: 1.5, label: "1,5 мм", ratesByn: [0.12, 0.11, 0.11, 0.1, 0.1] },
  { thicknessMm: 2.0, label: "2,0 мм", ratesByn: [0.15, 0.14, 0.14, 0.13, 0.12] },
  { thicknessMm: 2.5, label: "2,5 мм", ratesByn: [0.17, 0.16, 0.15, 0.14, 0.14] },
  { thicknessMm: 3.0, label: "3,0 мм", ratesByn: [0.2, 0.19, 0.18, 0.17, 0.16] },
  { thicknessMm: 4.0, label: "4,0 мм", ratesByn: [0.22, 0.21, 0.2, 0.19, 0.18] },
  { thicknessMm: 5.0, label: "5,0 мм", ratesByn: [0.26, 0.25, 0.23, 0.22, 0.21] },
  { thicknessMm: 6.0, label: "6,0 мм", ratesByn: [0.3, 0.29, 0.27, 0.26, 0.24] },
  { thicknessMm: 8.0, label: "8,0 мм", ratesByn: [0.35, 0.33, 0.32, 0.3, 0.28] },
  { thicknessMm: 10.0, label: "10,0 мм", ratesByn: [0.4, 0.38, 0.36, 0.34, 0.32] },
  { thicknessMm: 12.0, label: "12,0 мм", ratesByn: [0.5, 0.48, 0.45, 0.43, 0.4] },
  { thicknessMm: 14.0, label: "14,0 мм", ratesByn: [0.6, 0.57, 0.54, 0.51, 0.48] },
  { thicknessMm: 16.0, label: "16,0 мм", ratesByn: [0.7, 0.67, 0.63, 0.6, 0.56] },
  { thicknessMm: 20.0, label: "20,0 мм", ratesByn: [1.0, 0.95, 0.9, 0.85, 0.8] },
];

export const LASER_STAINLESS_RATES: ThicknessRates[] = [
  { thicknessMm: 0.5, label: "0,5 мм", ratesByn: [0.15, 0.14, 0.14, 0.13, 0.12] },
  { thicknessMm: 0.6, label: "0,6 мм", ratesByn: [0.2, 0.19, 0.18, 0.17, 0.16] },
  { thicknessMm: 0.7, label: "0,7 мм", ratesByn: [0.22, 0.21, 0.2, 0.19, 0.17] },
  { thicknessMm: 0.8, label: "0,8 мм", ratesByn: [0.24, 0.23, 0.22, 0.2, 0.19] },
  { thicknessMm: 1.0, label: "1,0 мм", ratesByn: [0.3, 0.29, 0.27, 0.26, 0.24] },
  { thicknessMm: 1.2, label: "1,2 мм", ratesByn: [0.36, 0.34, 0.32, 0.31, 0.29] },
  { thicknessMm: 1.5, label: "1,5 мм", ratesByn: [0.54, 0.51, 0.49, 0.46, 0.43] },
  { thicknessMm: 2.0, label: "2,0 мм", ratesByn: [0.6, 0.57, 0.54, 0.51, 0.48] },
  { thicknessMm: 2.5, label: "2,5 мм", ratesByn: [0.63, 0.6, 0.57, 0.54, 0.5] },
  { thicknessMm: 3.0, label: "3,0 мм", ratesByn: [0.75, 0.71, 0.68, 0.64, 0.6] },
  { thicknessMm: 4.0, label: "4,0 мм", ratesByn: [1.2, 1.14, 1.08, 1.02, 0.96] },
  { thicknessMm: 5.0, label: "5,0 мм", ratesByn: [1.5, 1.43, 1.35, 1.28, 1.2] },
  { thicknessMm: 6.0, label: "6,0 мм", ratesByn: [2.1, 2.0, 1.89, 1.79, 1.68] },
  { thicknessMm: 8.0, label: "8,0 мм", ratesByn: [3.36, 3.19, 3.02, 2.86, 2.69] },
  { thicknessMm: 10.0, label: "10,0 мм", ratesByn: [4.2, 3.99, 3.78, 3.57, 3.36] },
  { thicknessMm: 12.0, label: "12,0 мм", ratesByn: [5.52, 5.24, 4.97, 4.69, 4.42] },
];

export function getRatesTable(material: LaserMaterial): ThicknessRates[] {
  return material === "carbon" ? LASER_CARBON_RATES : LASER_STAINLESS_RATES;
}

export function getLengthTierIndex(totalLengthM: number): number {
  if (!Number.isFinite(totalLengthM) || totalLengthM <= 0) return 0;
  if (totalLengthM <= 100) return 0;
  if (totalLengthM <= 200) return 1;
  if (totalLengthM <= 300) return 2;
  if (totalLengthM <= 400) return 3;
  return 4;
}

export function bynRateToRubRounded(rateByn: number): number {
  return Math.round(rateByn * LASER_BYN_TO_RUB * RU_PRICE_FACTOR_VS_BY);
}

export type LaserCutQuote = {
  ratePerMeter: number;
  totalLengthM: number;
  totalRub: number;
  tierLabel: string;
  materialLabel: string;
  thicknessLabel: string;
};

export function quoteLaserCut(
  material: LaserMaterial,
  thicknessMm: number,
  totalLengthM: number,
): LaserCutQuote | null {
  if (!Number.isFinite(totalLengthM) || totalLengthM <= 0) return null;
  const table = getRatesTable(material);
  const row = table.find((r) => r.thicknessMm === thicknessMm);
  if (!row) return null;
  const tier = getLengthTierIndex(totalLengthM);
  const ratePerMeter = bynRateToRubRounded(row.ratesByn[tier]);
  const materialLabel =
    material === "carbon"
      ? "Углеродистая сталь (резка с кислородом)"
      : "Нержавеющая сталь (резка с азотом)";
  return {
    ratePerMeter,
    totalLengthM,
    totalRub: Math.round(ratePerMeter * totalLengthM),
    tierLabel: LASER_LENGTH_TIERS[tier].label,
    materialLabel,
    thicknessLabel: row.label,
  };
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}