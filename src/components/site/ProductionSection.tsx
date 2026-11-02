import { Link } from "@tanstack/react-router";

import productionImg from "@/assets/production.jpg";
import type { EquipmentItem } from "@/lib/equipment";
import {
  EQUIPMENT_CASTING,
  EQUIPMENT_MACHINING,
  EQUIPMENT_MATERIALS,
} from "@/lib/equipment";
import { getEquipmentSeoOrFallback } from "@/lib/equipment-seo";

function ProductionRow({
  item,
  indexLabel,
}: {
  item: EquipmentItem;
  indexLabel: string;
}) {
  const seo = getEquipmentSeoOrFallback(item);
  return (
    <Link
      to="/production/$slug"
      params={{ slug: item.slug }}
      title={`${seo.h1}. ${item.groupDescription}`}
      className="group flex items-center justify-between gap-3 overflow-hidden border-t border-background/15 px-1 py-2.5 transition-colors first:border-t-0 hover:bg-background/5 sm:gap-4 sm:py-3 lg:px-0.5"
    >
      <span className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden lg:gap-1.5">
        <span className="flex min-w-0 items-baseline gap-3">
          <span className="shrink-0 font-display text-[10px] font-semibold tracking-widest text-background/40 transition-colors group-hover:text-brand lg:text-xs">
            {indexLabel}
          </span>
          <span className="truncate font-display text-base uppercase leading-snug tracking-wide text-background transition-colors group-hover:text-brand lg:text-xl">
            {item.group}
          </span>
        </span>
        <span className="min-w-0 overflow-hidden pl-6 lg:pl-7">
          <span className="block truncate font-display text-[11px] font-semibold uppercase tracking-wide text-brand lg:text-xs">
            {item.name}
          </span>
          <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-background/65 lg:line-clamp-1 lg:text-sm">
            {item.groupDescription}
          </span>
        </span>
      </span>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-background/30 text-lg text-background transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground lg:h-9 lg:w-9"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}

export function ProductionSection() {
  return (
    <section
      id="production"
      className="site-section-tight bg-gradient-to-br from-steel/70 via-graphite to-graphite text-background"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
          Производство
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold uppercase leading-tight lg:text-4xl">
          От идеи до готового продукта
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/70 lg:text-base">
          ЧПУ по стали, латуни, бронзе и техническим пластмассам, сварка и сборка в Смоленске — а
          также литьё под давлением и литьё в формах.
        </p>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_1.12fr] lg:items-stretch lg:gap-10">
          <div className="order-2 flex min-h-56 lg:order-1">
            <img
              src={productionImg}
              alt="Производственный участок с ЧПУ-оборудованием"
              loading="lazy"
              width={1200}
              height={900}
              className="h-full min-h-56 w-full rounded-2xl object-cover grayscale lg:min-h-0"
            />
          </div>

          <div className="order-3 flex flex-col border-y border-background/15 lg:order-2">
            {EQUIPMENT_MACHINING.map((item, i) => (
              <ProductionRow key={item.slug} item={item} indexLabel={`0${i + 1}`} />
            ))}

            {EQUIPMENT_MATERIALS.length > 0 && (
              <>
                <p className="shrink-0 border-t border-background/15 bg-background/5 px-1 py-2.5 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand lg:px-0.5">
                  Латунь, бронза, пластмассы
                </p>
                {EQUIPMENT_MATERIALS.map((item, i) => (
                  <ProductionRow key={item.slug} item={item} indexLabel={`M${i + 1}`} />
                ))}
              </>
            )}

            {EQUIPMENT_CASTING.length > 0 && (
              <>
                <p className="shrink-0 border-t border-background/15 bg-background/5 px-1 py-2.5 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand lg:px-0.5">
                  Литейное производство
                </p>
                {EQUIPMENT_CASTING.map((item, i) => (
                  <ProductionRow key={item.slug} item={item} indexLabel={`L${i + 1}`} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
