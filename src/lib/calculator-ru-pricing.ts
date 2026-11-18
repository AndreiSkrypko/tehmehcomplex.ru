/** Цены на tehmehcomplex.ru — на 60 % выше, чем на romedov.by (в пересчёте). */
export const RU_PRICE_FACTOR_VS_BY = 1.6;

export function bynToRuRubMarkedUp(byn: number, bynToRub = 28): number {
  return Math.round(byn * bynToRub * RU_PRICE_FACTOR_VS_BY);
}

/** База расчёта токарки (как в BY до деления на BYN), +60 % для RU. */
export function byBaseRubToRuRetail(baseRub: number): number {
  return Math.round(baseRub * RU_PRICE_FACTOR_VS_BY);
}