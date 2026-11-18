import { useMemo, useState, type ReactNode } from "react";

import { RU_PRICE_FACTOR_VS_BY } from "@/lib/calculator-ru-pricing";
import {
  defaultTurningOperations,
  formatTurningRub,
  PART_TYPES,
  QUALITY_GRADES,
  quoteTurning,
  ROUGHNESS_RA,
  TURNING_CURRENCY_LABEL,
  TURNING_MATERIALS,
  type CountOpKey,
  type PartTypeId,
  type QualityGrade,
  type RoughnessRa,
  type TurningMaterialId,
} from "@/lib/turning-rates";

const COUNT_OP_UI: { key: CountOpKey; label: string }[] = [
  { key: "dop6", label: "Шпоночный паз" },
  { key: "dop7", label: "Нарезать внутреннюю резьбу" },
  { key: "dop8", label: "Нарезать наружную резьбу до М20" },
  { key: "dop9", label: "Нарезать наружную резьбу свыше М20" },
  { key: "dop10", label: "Точные посадки" },
  { key: "dop11", label: "Сверлить" },
  { key: "dop12", label: "Конус внутренний" },
  { key: "dop13", label: "Конус наружный" },
  { key: "dop14", label: "Сфера" },
  { key: "dop15", label: "Накатка" },
];

type Props = {
  variant?: "default" | "compact";
  onRequestQuote?: () => void;
};

export function TurningCalculator({ variant = "default", onRequestQuote }: Props) {
  const [materialId, setMaterialId] = useState<TurningMaterialId>("steel");
  const [partType, setPartType] = useState<PartTypeId>("rod");
  const [diameter, setDiameter] = useState("50");
  const [length, setLength] = useState("100");
  const [thickness, setThickness] = useState("30");
  const [operations, setOperations] = useState(defaultTurningOperations);
  const [quality, setQuality] = useState<QualityGrade>(0);
  const [roughness, setRoughness] = useState<RoughnessRa>(0);
  const [quantity, setQuantity] = useState("1");

  const parseNum = (s: string) => Number.parseFloat(s.replace(",", "."));

  const quote = useMemo(() => {
    return quoteTurning({
      materialId,
      dimensions: {
        type: partType,
        diameterMm: parseNum(diameter),
        lengthMm: parseNum(length),
        thicknessMm: parseNum(thickness),
      },
      operations,
      quality,
      roughness,
      quantity: Math.max(1, Math.round(parseNum(quantity)) || 1),
    });
  }, [diameter, length, materialId, operations, partType, quality, quantity, roughness, thickness]);

  const field =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink";
  const label = "mb-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground";
  const isCompact = variant === "compact";

  const patchPass = (
    key: "outer1" | "outer2" | "outer3" | "inner",
    patch: Partial<(typeof operations)[typeof key]>,
  ) => {
    setOperations((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const patchCountOp = (key: CountOpKey, patch: Partial<{ enabled: boolean; count: number }>) => {
    setOperations((prev) => ({
      ...prev,
      counts: { ...prev.counts, [key]: { ...prev.counts[key], ...patch } },
    }));
  };

  return (
    <div
      className={
        isCompact ? "" : "rounded-2xl border border-border bg-background p-6 shadow-sm lg:p-8"
      }
    >
      {!isCompact && (
        <div className="mb-6 max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
            Онлайн-расчёт
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight lg:text-3xl">
            Калькулятор токарной обработки
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Предварительная смета по габаритам и операциям. Цены в {TURNING_CURRENCY_LABEL}, целые
            суммы, ориентир на {Math.round((RU_PRICE_FACTOR_VS_BY - 1) * 100)} % выше базы
            romedov.by — до проверки чертежа.
          </p>
        </div>
      )}

      <FormGrid className={isCompact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label className={label} htmlFor="turn-material">
            Материал заготовки
          </label>
          <select
            id="turn-material"
            className={field}
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value as TurningMaterialId)}
          >
            {TURNING_MATERIALS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label className={label} htmlFor="turn-type">
            Тип детали
          </label>
          <select
            id="turn-type"
            className={field}
            value={partType}
            onChange={(e) => setPartType(e.target.value as PartTypeId)}
          >
            {PART_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          <div className="mt-3 flex flex-wrap gap-3">
            <div className="min-w-[8rem] flex-1">
              <label className={label} htmlFor="turn-diameter">
                Наружный Ø, мм
              </label>
              <input id="turn-diameter" className={field} value={diameter} onChange={(e) => setDiameter(e.target.value)} inputMode="decimal" />
            </div>
            {(partType === "rod" || partType === "pipe") && (
              <div className="min-w-[8rem] flex-1">
                <label className={label} htmlFor="turn-length">
                  Длина, мм
                </label>
                <input id="turn-length" className={field} value={length} onChange={(e) => setLength(e.target.value)} inputMode="decimal" />
              </div>
            )}
            {(partType === "flange" || partType === "pipe") && (
              <div className="min-w-[8rem] flex-1">
                <label className={label} htmlFor="turn-thickness">
                  {partType === "flange" ? "Толщина, мм" : "Толщина стенки, мм"}
                </label>
                <input id="turn-thickness" className={field} value={thickness} onChange={(e) => setThickness(e.target.value)} inputMode="decimal" />
              </div>
            )}
          </div>
        </div>

        <div className={isCompact ? "" : "sm:col-span-2"}>
          <p className={label}>Операции</p>
          <label className="mb-3 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={operations.turnOverallDiameter}
              onChange={(e) =>
                setOperations((p) => ({ ...p, turnOverallDiameter: e.target.checked }))
              }
            />
            <span>
              <span className="font-medium text-foreground">Точить общий диаметр</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                По всей длине детали (для прутка и трубы)
              </span>
            </span>
          </label>

          <details className="group mb-2 rounded-lg border border-border open:bg-secondary/30">
            <summary className="cursor-pointer px-3 py-2.5 text-sm font-medium">Наружные и внутренние участки</summary>
            <div className="space-y-3 px-3 pb-3">
              {(
                [
                  ["outer1", "Наружный диаметр 1"],
                  ["outer2", "Наружный диаметр 2"],
                  ["outer3", "Наружный диаметр 3"],
                  ["inner", "Внутренний диаметр"],
                ] as const
              ).map(([key, title]) => (
                <div key={key} className="rounded-lg border border-border/80 p-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={operations[key].enabled}
                      onChange={(e) => patchPass(key, { enabled: e.target.checked })}
                    />
                    {title}
                  </label>
                  {operations[key].enabled && (
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <input
                        className={field}
                        placeholder="Ø, мм"
                        value={operations[key].diameterMm || ""}
                        onChange={(e) => patchPass(key, { diameterMm: parseNum(e.target.value) || 0 })}
                      />
                      <input
                        className={field}
                        placeholder="Длина, мм"
                        value={operations[key].lengthMm || ""}
                        onChange={(e) => patchPass(key, { lengthMm: parseNum(e.target.value) || 0 })}
                      />
                      <input
                        className={field}
                        placeholder="Кол-во"
                        value={operations[key].count}
                        onChange={(e) => patchPass(key, { count: Math.max(1, parseNum(e.target.value) || 1) })}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>

          <details className="group rounded-lg border border-border open:bg-secondary/30">
            <summary className="cursor-pointer px-3 py-2.5 text-sm font-medium">Резьба, пазы, конусы</summary>
            <div className="space-y-2 px-3 pb-3">
              {COUNT_OP_UI.map(({ key, label: opLabel }) => (
                <label
                  key={key}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-transparent py-1 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={operations.counts[key].enabled}
                      onChange={(e) => patchCountOp(key, { enabled: e.target.checked })}
                    />
                    {opLabel}
                  </span>
                  {operations.counts[key].enabled && (
                    <input
                      className="w-20 rounded-md border border-border px-2 py-1 text-sm"
                      type="number"
                      min={1}
                      value={operations.counts[key].count}
                      onChange={(e) => patchCountOp(key, { count: Math.max(1, Number(e.target.value) || 1) })}
                    />
                  )}
                </label>
              ))}
            </div>
          </details>
        </div>

        <div>
          <label className={label} htmlFor="turn-quality">
            Квалитет (кроме резьбы)
          </label>
          <select
            id="turn-quality"
            className={field}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value) as QualityGrade)}
          >
            <option value={0}>Не задан</option>
            {QUALITY_GRADES.filter((q) => q > 0).map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="turn-ra">
            Шероховатость Ra
          </label>
          <select
            id="turn-ra"
            className={field}
            value={roughness}
            onChange={(e) => setRoughness(Number(e.target.value) as RoughnessRa)}
          >
            <option value={0}>Не задана</option>
            {ROUGHNESS_RA.filter((r) => r > 0).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label className={label} htmlFor="turn-qty">
            Количество деталей, шт
          </label>
          <input
            id="turn-qty"
            className={`${field} max-w-[8rem]`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputMode="numeric"
          />
        </div>
      </FormGrid>

      <div
        className={`mt-6 rounded-xl border border-brand/25 bg-brand/5 p-5 ${isCompact ? "text-sm" : ""}`}
        aria-live="polite"
      >
        {quote ? (
          <dl className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Цена за деталь</dt>
              <dd className="font-display text-2xl font-semibold text-foreground lg:text-3xl">
                {formatTurningRub(quote.unitPriceRub)}{" "}
                <span className="text-base font-medium text-muted-foreground">{TURNING_CURRENCY_LABEL}</span>
              </dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-t border-brand/20 pt-3 text-sm">
              <span className="text-muted-foreground">Партия ({quote.quantity} шт)</span>
              <span className="font-semibold text-foreground">
                {formatTurningRub(quote.batchPriceRub)} {TURNING_CURRENCY_LABEL}
              </span>
            </div>
            <FormGrid className="grid gap-2 border-t border-brand/20 pt-3 text-xs text-muted-foreground sm:grid-cols-2">
              <p>
                Материал:{" "}
                <span className="text-foreground">
                  {formatTurningRub(quote.materialCostRub)} {TURNING_CURRENCY_LABEL}
                </span>
              </p>
              <p>
                Обработка
                {quote.salePercent > 0 ? ` (−${quote.salePercent}%)` : ""}:{" "}
                <span className="text-foreground">
                  {formatTurningRub(quote.workCostRub)} {TURNING_CURRENCY_LABEL}
                </span>
              </p>
              <p className="sm:col-span-2">
                {quote.materialLabel} · коэф. сложности {quote.workCoeff} · скорости{" "}
                {quote.cutSpeedCoeff}
              </p>
              <p className="sm:col-span-2">
                Время на деталь: ~{quote.minutesPerUnit} мин
                {quote.timeLines.length > 0 && (
                  <span className="mt-1 block font-mono text-[11px] leading-relaxed text-foreground/80">
                    {quote.timeLines.map((l) => `• ${l.label}: ${l.minutes} мин`).join("\n")}
                  </span>
                )}
              </p>
            </FormGrid>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">Заполните размеры заготовки.</p>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Ориентир до согласования чертежа. Не включает оснастку, термообработку, ОТК и доставку.
      </p>

      {onRequestQuote && (
        <button
          type="button"
          onClick={onRequestQuote}
          className="mt-5 w-full rounded-full bg-brand px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Отправить чертёж на точный расчёт
        </button>
      )}
    </div>
  );
}

function FormGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>;
}