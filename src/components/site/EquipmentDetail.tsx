import { Link } from "@tanstack/react-router";

import type { EquipmentItem } from "@/lib/equipment";
import { getEquipmentSeoOrFallback } from "@/lib/equipment-seo";
import { getOtherEquipment } from "@/lib/equipment";

type EquipmentDetailProps = {
  equipment: EquipmentItem;
  onRequest: () => void;
};

export function EquipmentDetail({ equipment, onRequest }: EquipmentDetailProps) {
  const others = getOtherEquipment(equipment.slug);
  const seo = getEquipmentSeoOrFallback(equipment);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-steel/70 via-graphite to-graphite pt-24 pb-14 text-background lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,233,44,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-background/50">
            <Link to="/" className="transition-colors hover:text-brand">
              Главная
            </Link>
            <span aria-hidden="true">/</span>
            <a href="/#production" className="transition-colors hover:text-brand">Производство</a>
            <span aria-hidden="true">/</span>
            <span className="text-background/80">{seo.h1}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                {equipment.group}
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] lg:text-6xl">
                {seo.h1}
              </h1>
              <p className="mt-3 font-display text-base font-medium uppercase tracking-wide text-background/85 lg:text-lg">
                {equipment.name} — {equipment.subtitle}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/75 lg:text-base">
                {seo.heroLead}
              </p>
              <p className="mt-3 text-sm text-background/60">
                Смоленск · точность до 0,02 мм · консультация бесплатно
              </p>
              <button
                onClick={onRequest}
                className="mt-8 rounded-full bg-brand px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                Рассчитать стоимость
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/5 shadow-2xl shadow-black/20">
              <img
                src={equipment.image}
                alt={equipment.alt}
                width={1200}
                height={750}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                Услуги
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                {seo.servicesTitle}
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {seo.services.map((service) => (
                  <li key={service} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Материалы: {seo.materials.join(", ")}.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-secondary p-7 lg:sticky lg:top-28">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-graphite">
                {equipment.asideTitle ?? "Станок на площадке"}
              </p>
              <p className="mt-3 font-display text-xl font-semibold uppercase">{equipment.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{equipment.subtitle}</p>
              <dl className="mt-6 space-y-5">
                {equipment.specs.map((spec) => (
                  <div key={spec.label} className="border-b border-border pb-5 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-lg font-semibold">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                {equipment.aboutTitle ?? "О станке"}
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                {equipment.name}
              </h2>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {equipment.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {seo.faq.length > 0 ? (
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                  Вопросы и ответы
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold uppercase lg:text-3xl">
                  Частые вопросы
                </h2>
                <dl className="mt-6 space-y-5">
                  {seo.faq.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-border bg-background p-5">
                      <dt className="font-display text-sm font-semibold uppercase leading-snug">
                        {item.question}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
            Другое оборудование
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold uppercase lg:text-3xl">
            Другие виды металлообработки
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <Link
                key={item.slug}
                to="/production/$slug"
                params={{ slug: item.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-ink"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-deep">
                    {item.group}
                  </p>
                  <p className="mt-2 font-display text-sm font-semibold uppercase leading-snug">
                    {getEquipmentSeoOrFallback(item).h1}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <a
            href="/#production"
            className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-lime-deep transition-colors hover:text-ink"
          >
            ← Все технологические группы
          </a>
        </div>
      </section>
    </main>
  );
}
