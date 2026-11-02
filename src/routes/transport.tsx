import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { ContactPhones } from "@/components/site/ContactPhones";
import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { RequestModal } from "@/components/site/RequestModal";
import { absoluteUrl } from "@/lib/seo";
import { SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  TRANSPORT_ADVANTAGES,
  TRANSPORT_CARGO_TYPES,
  TRANSPORT_EXTRA,
  TRANSPORT_FAQ,
  TRANSPORT_GEOGRAPHY,
  TRANSPORT_HERO_IMAGE,
  TRANSPORT_OG_IMAGE,
  TRANSPORT_PHONE_DISPLAY,
  TRANSPORT_PHONE_HREF,
  TRANSPORT_TELEGRAM_HREF,
  TRANSPORT_VIBER_HREF,
  TRANSPORT_STATS,
  TRANSPORT_STEPS,
  TRANSPORT_WEIGHT_CLASSES,
  buildTransportRequestMessage,
} from "@/lib/transport";

const TITLE = "Транспортные услуги — доставка грузов 0–20 т | ТехМехКомплекс";
const DESC =
  "Грузоперевозки 0–20 т по Смоленску, области и РФ: металлопрокат, конструкции, оборудование. Подбор транспорта, погрузка, документы. Расчёт бесплатно.";
const KEYWORDS =
  "грузоперевозки смоленск, транспортные услуги смоленск, доставка металлопроката, перевозка грузов 20 тонн, доставка металлоконструкций";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: KEYWORDS },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/transport` },
      { property: "og:image", content: absoluteUrl(TRANSPORT_OG_IMAGE) },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: absoluteUrl(TRANSPORT_OG_IMAGE) },
    ],
    links: [{ rel: "canonical", href: "/transport" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${SITE_URL}/transport#service`,
              name: "Транспортные услуги",
              description: DESC,
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "Country", name: "Россия" },
                { "@type": "Country", name: "Россия" },
              ],
              serviceType: "Грузоперевозки",
              image: absoluteUrl(TRANSPORT_OG_IMAGE),
            },
            {
              "@type": "FAQPage",
              mainEntity: TRANSPORT_FAQ.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: TransportPage,
});

function TransportPage() {
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header
        onRequest={() => setModal(true)}
        forceSolid
        phoneHref={TRANSPORT_PHONE_HREF}
        telegramHref={TRANSPORT_TELEGRAM_HREF}
        viberHref={TRANSPORT_VIBER_HREF}
      />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-steel/70 via-graphite to-graphite pt-24 text-background lg:pt-28">
          <img
            src={TRANSPORT_HERO_IMAGE}
            alt="Грузовой автомобиль с металлическим грузом на трассе"
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite/95 via-graphite/80 to-graphite/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,233,44,0.14),transparent_50%)]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-20">
            <nav
              aria-label="Хлебные крошки"
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-background/50"
            >
              <Link to="/" className="transition-colors hover:text-brand">Главная</Link>
              <span aria-hidden="true">/</span>
              <span className="text-background/85">Транспортные услуги</span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Логистика для бизнеса
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] lg:text-6xl">
                Транспортные услуги
              </h1>
              <p className="mt-5 text-base leading-relaxed text-background/80 lg:text-lg">
                Перевозим грузы по России и России — от мелких партий до 20 тонн. Металлопрокат,
                конструкции, оборудование и готовые изделия. Подбираем транспорт, организуем
                погрузку и оформляем документы.
              </p>
              <button
                onClick={() => setModal(true)}
                className="mt-8 rounded-full bg-brand px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                Рассчитать доставку
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {TRANSPORT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-background/15 bg-background/10 p-5 backdrop-blur-sm"
                >
                  <p className="font-display text-2xl font-semibold text-brand lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-background/70 lg:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CARGO */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                Что перевозим
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                Грузы, с которыми работаем каждый день
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                «ТехМехКомплекс» — это не только металлообработка. Мы понимаем специфику металла и
                промышленных грузов: знаем, как упаковать, закрепить и доставить без потерь.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TRANSPORT_CARGO_TYPES.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="font-display text-lg font-semibold uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WEIGHT CLASSES */}
        <section className="border-t border-border bg-secondary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                Грузоподъёмность
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                От 0 до 20 тонн — подберём нужный транспорт
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                Не переплачивайте за лишнюю тоннажность и не рискуйте перегрузом. Мы подбираем
                машину под фактический вес и габариты вашего груза.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {TRANSPORT_WEIGHT_CLASSES.map((item) => (
                <div
                  key={item.range}
                  className="rounded-2xl border border-border bg-background p-6 lg:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold uppercase">{item.title}</h3>
                    <span className="rounded-full bg-brand px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-brand-foreground">
                      {item.range}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                    Примеры грузов
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEOGRAPHY */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                География
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                Россия и Россия
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-7 lg:p-8">
                <h3 className="font-display text-xl font-semibold uppercase">
                  {TRANSPORT_GEOGRAPHY.local.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {TRANSPORT_GEOGRAPHY.local.lead}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {TRANSPORT_GEOGRAPHY.local.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" aria-hidden />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-background p-7 lg:p-8">
                <h3 className="font-display text-xl font-semibold uppercase">
                  {TRANSPORT_GEOGRAPHY.russia.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {TRANSPORT_GEOGRAPHY.russia.lead}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {TRANSPORT_GEOGRAPHY.russia.regions.map((region) => (
                    <li key={region} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" aria-hidden />
                      {region}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="border-t border-border bg-secondary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                Преимущества
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                Почему клиенты доверяют нам логистику
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TRANSPORT_ADVANTAGES.map((item, i) => (
                <div key={item.title} className="rounded-2xl bg-background p-6 lg:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-brand-foreground">
                    {`0${i + 1}`}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEPS + EXTRA */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                  Как заказать
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                  Четыре шага до доставки
                </h2>

                <ol className="mt-8 space-y-6">
                  {TRANSPORT_STEPS.map((item) => (
                    <li key={item.step} className="flex gap-5">
                      <span className="font-display text-2xl font-semibold text-lime-deep/70">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold uppercase">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="rounded-2xl border border-border bg-secondary p-7 lg:sticky lg:top-28">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-graphite">
                  Дополнительно
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold uppercase">
                  Сопутствующие услуги
                </h3>
                <ul className="mt-6 space-y-3">
                  {TRANSPORT_EXTRA.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setModal(true)}
                  className="mt-8 w-full rounded-full bg-brand px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  Оставить заявку
                </button>
              </aside>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-secondary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
                Вопросы и ответы
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                Частые вопросы о перевозках
              </h2>
            </div>

            <dl className="mt-10 grid gap-4 lg:grid-cols-2">
              {TRANSPORT_FAQ.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border bg-background p-6">
                  <dt className="font-display text-sm font-semibold uppercase leading-snug">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-steel/80 via-graphite to-graphite p-8 text-background lg:p-12">
              <div className="max-w-2xl">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                  Нужна доставка?
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
                  Рассчитаем перевозку за один звонок
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-background/75 lg:text-base">
                  Укажите маршрут, вес и описание груза — подберём транспорт и назовём стоимость.
                  Работаем с физлицами и юрлицами по всей России и в Россию.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => setModal(true)}
                  className="rounded-full bg-brand px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  Рассчитать доставку
                </button>
                <a
                  href={TRANSPORT_PHONE_HREF}
                  className="font-display text-lg font-semibold text-background transition-colors hover:text-brand"
                >
                  {TRANSPORT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-graphite py-14 text-background/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="max-w-xs">
              <Logo invert />
              <p className="mt-5 text-sm leading-relaxed">
                {SITE_NAME} — металлообработка, металлопрокат и транспортные услуги. Россия.
              </p>
            </div>

            <div className="text-sm">
              <ContactPhones variant="footer" />
            </div>
          </div>

          <div className="mt-12 border-t border-background/15 pt-6 text-xs">
            © {new Date().getFullYear()} {SITE_LEGAL_NAME}. Все права защищены.
          </div>
        </div>
      </footer>

      <RequestModal
        open={modal}
        onClose={() => setModal(false)}
        title="Рассчитать доставку"
        subtitle="Укажите маршрут, вес и описание груза — подготовим расчёт и свяжемся с вами."
        presetMessage={buildTransportRequestMessage()}
        contactPhone={TRANSPORT_PHONE_DISPLAY}
      />
    </div>
  );
}
