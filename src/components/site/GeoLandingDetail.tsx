import { Link } from "@tanstack/react-router";

import type { GeoLanding } from "@/lib/geo-landings";

type Props = {
  geo: GeoLanding;
  onRequest: () => void;
};

export function GeoLandingDetail({ geo, onRequest }: Props) {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-steel/70 via-graphite to-graphite pt-24 pb-14 text-background lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,233,44,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav
            aria-label="Хлебные крошки"
            className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-background/50"
          >
            <Link to="/" className="transition-colors hover:text-brand">
              Главная
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-background/80">{geo.cityName}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              География поставок
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] lg:text-5xl">
              {geo.h1}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-background/80 lg:text-base">{geo.lead}</p>
            <p className="mt-4 text-sm text-background/65">{geo.deliveryLead}</p>
            <button
              type="button"
              onClick={onRequest}
              className="mt-8 rounded-full bg-brand px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Запросить расчёт
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
                Что получают заказчики из {geo.cityNameIn}
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {geo.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              {geo.region ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  Регион обслуживания: <span className="text-foreground">{geo.region}</span>
                </p>
              ) : null}
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
                Услуги на площадке
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {geo.serviceLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      to="/production/$slug"
                      params={{ slug: link.slug }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
                    >
                      {link.label}
                      <span aria-hidden className="text-brand">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Производство расположено в Смоленске — мы не выдаём себя за локальный цех в{" "}
                {geo.cityNameIn}. Зато даём предсказуемое качество ЧПУ и прозрачные сроки с логистикой.
              </p>
            </div>
          </div>
        </div>
      </section>

      {geo.faq.length > 0 ? (
        <section className="border-t border-border bg-secondary/40 py-16">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              Вопросы по заказам из {geo.cityNameIn}
            </h2>
            <dl className="mt-8 space-y-8">
              {geo.faq.map((item) => (
                <div key={item.question}>
                  <dt className="font-medium text-foreground">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}
    </main>
  );
}
