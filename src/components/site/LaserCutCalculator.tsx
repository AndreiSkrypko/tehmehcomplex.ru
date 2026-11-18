import { useMemo, useState } from "react";

import {
  formatRub,
  getRatesTable,
  LASER_CURRENCY_LABEL,
  quoteLaserCut,
  type LaserMaterial,
} from "@/lib/laser-cutting-rates";

type Props = {
  variant?: "default" | "compact";
  onRequestQuote?: () => void;
};

export function LaserCutCalculator({ variant = "default", onRequestQuote }: Props) {
  const [material, setMaterial] = useState<LaserMaterial>("carbon");
  const thicknessOptions = useMemo(() => getRatesTable(material), [material]);
  const [thicknessMm, setThicknessMm] = useState(thicknessOptions[0]?.thicknessMm ?? 1);
  const [lengthInput, setLengthInput] = useState("10");

  const lengthM = Number.parseFloat(lengthInput.replace(",", "."));

  const quote = useMemo(() => {
    if (!Number.isFinite(lengthM) || lengthM <= 0) return null;
    return quoteLaserCut(material, thicknessMm, lengthM);
  }, [lengthM, material, thicknessMm]);

  const field =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink";
  const label = "mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

  const isCompact = variant === "compact";

  return (
    <div
      className={
        isCompact
          ? ""
          : "rounded-2xl border border-border bg-background p-6 shadow-sm lg:p-8"
      }
    >
      {!isCompact && (
        <div className="mb-6 max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
            Онлайн-расчёт
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight lg:text-3xl">
            Калькулятор лазерной резки
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Сумма по длине реза в погонных метрах. Тариф зависит от толщины, материала и объёма
            партии. Цены в российских рублях, без НДС, округление до целых — ориентир до проверки
            DXF.
          </p>
        </div>
      )}

      <div className={`grid gap-4 ${isCompact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className={label} htmlFor="laser-material">
            Материал
          </label>
          <select
            id="laser-material"
            className={field}
            value={material}
            onChange={(e) => {
              const next = e.target.value as LaserMaterial;
              setMaterial(next);
              const first = getRatesTable(next)[0];
              if (first) setThicknessMm(first.thicknessMm);
            }}
          >
            <option value="carbon">Сталь углеродистая (O₂)</option>
            <option value="stainless">Сталь нержавеющая (N₂)</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="laser-thickness">
            Толщина листа
          </label>
          <select
            id="laser-thickness"
            className={field}
            value={thicknessMm}
            onChange={(e) => setThicknessMm(Number(e.target.value))}
          >
            {thicknessOptions.map((row) => (
              <option key={row.thicknessMm} value={row.thicknessMm}>
                {row.label}
              </option>
            ))}
          </select>
        </div>

        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label className={label} htmlFor="laser-length">
            Суммарная длина реза, м
          </label>
          <input
            id="laser-length"
            type="text"
            inputMode="decimal"
            className={field}
            value={lengthInput}
            onChange={(e) => setLengthInput(e.target.value)}
            placeholder="Например, 48.5"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Сложите длину всех контуров в заказе (включая отверстия). Для скидки учитывается сумма
            по всей партии.
          </p>
        </div>
      </div>

      <div
        className={`mt-6 rounded-xl border border-brand/25 bg-brand/5 p-5 ${
          isCompact ? "text-sm" : ""
        }`}
        aria-live="polite"
      >
        {quote ? (
          <dl className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Итого</dt>
              <dd className="font-display text-2xl font-semibold text-foreground lg:text-3xl">
                {formatRub(quote.totalRub)}{" "}
                <span className="text-base font-medium text-muted-foreground">{LASER_CURRENCY_LABEL}</span>
              </dd>
            </div>
            <div className="grid gap-2 border-t border-brand/20 pt-3 text-xs text-muted-foreground sm:grid-cols-2">
              <p>
                <span className="text-foreground">
                  {formatRub(quote.ratePerMeter)} {LASER_CURRENCY_LABEL}/м
                </span>{" "}
                · диапазон {quote.tierLabel}
              </p>
              <p>
                {quote.thicknessLabel} · {quote.materialLabel}
              </p>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">Укажите длину реза больше нуля.</p>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Не входит: материал листа, разметка, гибка, доставка. Итоговая смета — после согласования
        чертежа или DXF.
      </p>

      {onRequestQuote && (
        <button
          type="button"
          onClick={onRequestQuote}
          className="mt-5 w-full rounded-full bg-brand px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Отправить DXF на точный расчёт
        </button>
      )}
    </div>
  );
}