/**
 * Токарка: та же логика, что на romedov.by; на RU — целые ₽, +60 % к белорусскому ориентиру.
 */

import { byBaseRubToRuRetail } from "@/lib/calculator-ru-pricing";

export const TURNING_EQUIPMENT_SLUG = "metatec-next-36x750-pro";
export const TURNING_CURRENCY_LABEL = "₽";

export const MACHINE_RATE_RUB_PER_MIN = 75;
export const SETUP_MINUTES = 3;
export const MIN_OPERATION_MINUTES = 2;
const LENGTH_FACTOR_DOP1 = 0.02;
const LENGTH_FACTOR_PASS = 0.071;
const SURCHARGE_QUALITY_RUB = 400;
const SURCHARGE_ROUGHNESS_RUB = 400;

export type TurningMaterialId =
  | "steel"
  | "aluminum"
  | "titanium"
  | "brass"
  | "bronze"
  | "stainless";

export type PartTypeId = "rod" | "flange" | "pipe";

export type TurningMaterial = {
  id: TurningMaterialId;
  label: string;
  densityKgPerMm3: number;
  priceRubPerKg: number;
  workCoeff: number;
  cutSpeedCoeff: number;
};

export const TURNING_MATERIALS: TurningMaterial[] = [
  {
    id: "steel",
    label: "Сталь",
    densityKgPerMm3: 7.85e-6,
    priceRubPerKg: 171,
    workCoeff: 1,
    cutSpeedCoeff: 1,
  },
  {
    id: "aluminum",
    label: "Алюминий",
    densityKgPerMm3: 2.7e-6,
    priceRubPerKg: 505,
    workCoeff: 0.7,
    cutSpeedCoeff: 2.5,
  },
  {
    id: "titanium",
    label: "Титан",
    densityKgPerMm3: 4.5e-6,
    priceRubPerKg: 2950,
    workCoeff: 2.5,
    cutSpeedCoeff: 0.4,
  },
  {
    id: "brass",
    label: "Латунь",
    densityKgPerMm3: 8.5e-6,
    priceRubPerKg: 1780,
    workCoeff: 0.8,
    cutSpeedCoeff: 1.8,
  },
  {
    id: "bronze",
    label: "Бронза",
    densityKgPerMm3: 8.8e-6,
    priceRubPerKg: 3380,
    workCoeff: 1.2,
    cutSpeedCoeff: 0.7,
  },
  {
    id: "stainless",
    label: "Нержавейка",
    densityKgPerMm3: 8e-6,
    priceRubPerKg: 895,
    workCoeff: 1.8,
    cutSpeedCoeff: 0.6,
  },
];

export const PART_TYPES: { id: PartTypeId; label: string }[] = [
  { id: "rod", label: "Пруток" },
  { id: "flange", label: "Фланец" },
  { id: "pipe", label: "Труба" },
];

export const QUALITY_GRADES = [0, 14, 12, 10, 8, 6] as const;
export const ROUGHNESS_RA = [0, 12.5, 6.3, 3.2, 1.6, 0.8] as const;

export type QualityGrade = (typeof QUALITY_GRADES)[number];
export type RoughnessRa = (typeof ROUGHNESS_RA)[number];

const COUNT_OP_MINUTES: Record<string, number> = {
  dop6: 10,
  dop7: 5,
  dop8: 4,
  dop9: 15,
  dop10: 8,
  dop11: 3,
  dop12: 25,
  dop13: 20,
  dop14: 12,
  dop15: 8,
};

const COUNT_OP_LABELS: Record<string, string> = {
  dop6: "Шпоночный паз",
  dop7: "Внутренняя резьба",
  dop8: "Наружная резьба до М20",
  dop9: "Наружная резьба свыше М20",
  dop10: "Точные посадки",
  dop11: "Сверление",
  dop12: "Конус внутренний",
  dop13: "Конус наружный",
  dop14: "Сфера",
  dop15: "Накатка",
};

export type DiameterPassOp = {
  enabled: boolean;
  diameterMm: number;
  lengthMm: number;
  count: number;
};

export type CountOpKey = keyof typeof COUNT_OP_MINUTES;

export type TurningOperationState = {
  turnOverallDiameter: boolean;
  outer1: DiameterPassOp;
  outer2: DiameterPassOp;
  outer3: DiameterPassOp;
  inner: DiameterPassOp;
  counts: Record<CountOpKey, { enabled: boolean; count: number }>;
};

export type TurningDimensions = {
  type: PartTypeId;
  diameterMm: number;
  lengthMm: number;
  thicknessMm: number;
};

export type TurningQuoteInput = {
  materialId: TurningMaterialId;
  dimensions: TurningDimensions;
  operations: TurningOperationState;
  quality: QualityGrade;
  roughness: RoughnessRa;
  quantity: number;
};

export type TurningTimeLine = { label: string; minutes: number; billable: boolean };

export type TurningQuote = {
  materialLabel: string;
  workCoeff: number;
  cutSpeedCoeff: number;
  materialCostRub: number;
  workCostRub: number;
  unitPriceRub: number;
  batchPriceRub: number;
  salePercent: number;
  quantity: number;
  minutesPerUnit: number;
  minutesBatch: number;
  timeLines: TurningTimeLine[];
};

export function getWorkDiscountPercent(quantity: number): number {
  if (quantity >= 100) return 50;
  if (quantity >= 50) return 40;
  if (quantity >= 20) return 30;
  if (quantity >= 10) return 10;
  return 0;
}

function blankMassKg(material: TurningMaterial, dim: TurningDimensions): number {
  const r = dim.diameterMm / 2;
  if (dim.type === "rod") {
    const vol = Math.PI * r * r * dim.lengthMm;
    return vol * material.densityKgPerMm3;
  }
  if (dim.type === "flange") {
    const vol = Math.PI * r * r * dim.thicknessMm;
    return vol * material.densityKgPerMm3;
  }
  const l = dim.lengthMm;
  const t = dim.thicknessMm;
  const outer = Math.PI * r * r * l;
  const innerR = Math.max(0, r - t);
  const inner = Math.PI * innerR * innerR * l;
  return Math.max(0, outer - inner) * material.densityKgPerMm3;
}

function passMinutes(
  lengthMm: number,
  count: number,
  cutSpeedCoeff: number,
  factor: number,
): number {
  if (lengthMm <= 0 || count <= 0) return 0;
  const base = (lengthMm * count * factor) / Math.max(cutSpeedCoeff, 0.05);
  return Math.max(MIN_OPERATION_MINUTES, base);
}

function effectiveTurnLength(dim: TurningDimensions): number {
  if (dim.type === "flange") return dim.thicknessMm;
  return dim.lengthMm;
}

export function quoteTurning(input: TurningQuoteInput): TurningQuote | null {
  const material = TURNING_MATERIALS.find((m) => m.id === input.materialId);
  if (!material) return null;
  if (!Number.isFinite(input.quantity) || input.quantity < 1) return null;

  const dim = input.dimensions;
  if (dim.diameterMm <= 0) return null;
  if (dim.type === "rod" && dim.lengthMm <= 0) return null;
  if (dim.type === "flange" && dim.thicknessMm <= 0) return null;
  if (dim.type === "pipe" && (dim.lengthMm <= 0 || dim.thicknessMm <= 0)) return null;

  const lines: TurningTimeLine[] = [];
  lines.push({ label: "Установка/снятие", minutes: SETUP_MINUTES, billable: true });

  const { operations: op } = input;

  if (op.turnOverallDiameter && dim.type !== "flange") {
    const len = effectiveTurnLength(dim);
    const m = passMinutes(len, 1, material.cutSpeedCoeff, LENGTH_FACTOR_DOP1);
    if (m > 0) lines.push({ label: "Точить общий диаметр", minutes: m, billable: true });
  }

  const passOps: { state: DiameterPassOp; label: string }[] = [
    { state: op.outer1, label: "Наружный диаметр 1" },
    { state: op.outer2, label: "Наружный диаметр 2" },
    { state: op.outer3, label: "Наружный диаметр 3" },
    { state: op.inner, label: "Внутренний диаметр" },
  ];

  for (const { state, label } of passOps) {
    if (!state.enabled) continue;
    if (state.diameterMm <= 0 || state.diameterMm >= dim.diameterMm) continue;
    const m = passMinutes(state.lengthMm, state.count, material.cutSpeedCoeff, LENGTH_FACTOR_PASS);
    if (m > 0) lines.push({ label, minutes: m, billable: true });
  }

  for (const key of Object.keys(COUNT_OP_MINUTES) as CountOpKey[]) {
    const entry = op.counts[key];
    if (!entry?.enabled || entry.count < 1) continue;
    const per = COUNT_OP_MINUTES[key];
    const m = per * entry.count;
    lines.push({ label: COUNT_OP_LABELS[key], minutes: m, billable: true });
  }

  if (input.quality === 6 || input.quality === 8) {
    lines.push({ label: "Точный квалитет", minutes: 5, billable: false });
  }

  if (input.roughness > 0 && input.roughness <= 3.2) {
    lines.push({ label: "Низкая шероховатость", minutes: 6, billable: false });
  }

  const billableMinutes = lines.filter((l) => l.billable).reduce((s, l) => s + l.minutes, 0);
  const displayMinutes = lines.reduce((s, l) => s + l.minutes, 0);

  let surchargeRub = 0;
  if (input.quality > 0) surchargeRub += SURCHARGE_QUALITY_RUB;
  if (input.roughness > 0) surchargeRub += SURCHARGE_ROUGHNESS_RUB;

  const minuteRate = MACHINE_RATE_RUB_PER_MIN * material.workCoeff;
  const workBeforeDiscount = billableMinutes * minuteRate + surchargeRub;

  const salePercent = getWorkDiscountPercent(input.quantity);
  const workBaseRub = Math.round(workBeforeDiscount * (1 - salePercent / 100));
  const materialBaseRub = Math.round(blankMassKg(material, dim) * material.priceRubPerKg);

  const materialCostRub = byBaseRubToRuRetail(materialBaseRub);
  const workCostRub = byBaseRubToRuRetail(workBaseRub);
  const unitPriceRub = materialCostRub + workCostRub;
  const batchPriceRub = materialCostRub * input.quantity + workCostRub * input.quantity;

  return {
    materialLabel: material.label,
    workCoeff: material.workCoeff,
    cutSpeedCoeff: material.cutSpeedCoeff,
    materialCostRub,
    workCostRub,
    unitPriceRub,
    batchPriceRub,
    salePercent,
    quantity: input.quantity,
    minutesPerUnit: Math.round(displayMinutes * 10) / 10,
    minutesBatch: Math.round(displayMinutes * input.quantity * 10) / 10,
    timeLines: lines,
  };
}

export function formatTurningRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function defaultTurningOperations(): TurningOperationState {
  const counts = {} as TurningOperationState["counts"];
  for (const key of Object.keys(COUNT_OP_MINUTES) as CountOpKey[]) {
    counts[key] = { enabled: false, count: 1 };
  }
  const emptyPass = (): DiameterPassOp => ({
    enabled: false,
    diameterMm: 0,
    lengthMm: 0,
    count: 1,
  });
  return {
    turnOverallDiameter: true,
    outer1: emptyPass(),
    outer2: emptyPass(),
    outer3: emptyPass(),
    inner: emptyPass(),
    counts,
  };
}