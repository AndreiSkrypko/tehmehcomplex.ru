import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { ContactPhones } from "@/components/site/ContactPhones";
import { Header } from "@/components/site/Header";
import { ProductsSection } from "@/components/site/ProductsSection";
import { ProductionSection } from "@/components/site/ProductionSection";
import { Logo } from "@/components/site/Logo";
import { RequestModal } from "@/components/site/RequestModal";
import { MailIcon, PhoneIcon, TelegramIcon, ViberIcon } from "@/components/site/icons";
import {
  ACCESS_NOTE,
  ADDRESS_LEGAL,
  ADDRESS_POSTAL,
  ADDRESS_PRODUCTION,
  PRODUCTION_COORDINATES,
  PRODUCTION_LAT,
  PRODUCTION_LON,
  PRODUCTION_MAP_EMBED_SRC,
  PRODUCTION_MAP_HREF,
  EMAIL,
  EMAIL_HREF,
  PHONE_HREF,
  TELEGRAM_HREF,
  VIBER_HREF,
} from "@/lib/contacts";
import caseFlangesImg from "@/assets/case-flanges.jpg";
import caseFrameImg from "@/assets/case-frame.jpg";
import caseTurnedImg from "@/assets/case-turned.jpg";
import heroShopImg from "@/assets/hero-shop.jpg";
import { OG_HOME_IMAGE } from "@/lib/og-images";
import { absoluteUrl } from "@/lib/seo";
import { BANK_LINES, ORG_INN } from "@/lib/legal";
import { GEO_LANDINGS } from "@/lib/geo-landings";
import { SITE_LEGAL_NAME, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "ТехМехКомплекс — металлообработка и ЧПУ в Смоленске";
const DESC =
  "Контрактное производство: фрезеровка, лазерный раскрой, гибка, токарка, сварка, латунь, бронза, пластмассы. Площадка в Смоленске, допуск ±0,02 мм. Смета по чертежу без оплаты.";
const KEYWORDS =
  "металлообработка смоленск, чпу смоленск, фрезерные работы, лазерная резка, токарные работы, обработка латуни, обработка пластмасс, техмехкомплекс";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: KEYWORDS },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: absoluteUrl(OG_HOME_IMAGE) },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "ТехМехКомплекс — металлообработка на ЧПУ в Смоленске" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: absoluteUrl(OG_HOME_IMAGE) },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              inLanguage: SITE_LOCALE,
            },
            {
              "@type": ["Organization", "LocalBusiness"],
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              legalName: SITE_LEGAL_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
              image: absoluteUrl(OG_HOME_IMAGE),
              description: DESC,
              telephone: "+79203381229",
              email: EMAIL,
              taxID: ORG_INN,
              priceRange: "$$",
              areaServed: [
                { "@type": "City", name: "Смоленск" },
                { "@type": "AdministrativeArea", name: "Смоленская область" },
                { "@type": "Country", name: "Россия" },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Рыленкова, д. 50, оф. 7",
                postalCode: "214036",
                addressLocality: "Смоленск",
                addressCountry: "RU",
              },
              location: {
                "@type": "Place",
                name: "Производство",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "ул. Нормандия-Неман, д. 23",
                  addressLocality: "Смоленск",
                  addressCountry: "RU",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: PRODUCTION_LAT,
                  longitude: PRODUCTION_LON,
                },
              },
              knowsAbout: [
                "фрезерование на ЧПУ",
                "лазерная резка металла",
                "гибка листового металла",
                "токарные работы",
                "сварочные работы",
                "обработка цветных металлов",
                "обработка пластика на чпу",
                "литьё под давлением",
                "литьё в формах",
                "транспортные услуги",
                "грузоперевозки по центральной России",
                "механическая обработка металла",
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const FACTS = [
  { v: "±0,02 мм", l: "допуск на мехобработке по ТЗ" },
  { v: "Смоленск", l: "цех на ул. Нормандия-Неман" },
  { v: "24–48 ч", l: "типовой расчёт по чертежу" },
  { v: "ОТК", l: "протокол контроля по запросу" },
];

const ADVANTAGES = [
  {
    t: "Инженерная проработка",
    d: "Проверяем чертёж и 3D-модель до запуска: подскажем, как упростить деталь без потери функции.",
  },
  {
    t: "Сроки в договоре",
    d: "Фиксируем этапы — заготовка, ЧПУ, сварка, отгрузка. Срочные позиции согласуем отдельно.",
  },
  {
    t: "Парк ЧПУ на площадке",
    d: "Фреза, лазер, гибка и токарка в одном контуре: меньше передач между подрядчиками.",
  },
  {
    t: "Материалы под задачу",
    d: "Сталь, нержавейка, латунь, бронза и инженерные пластики — режимы под каждый сплав.",
  },
];

const CASES = [
  {
    eyebrow: "Машиностроение",
    title: "Крепёжная серия для агрегата",
    img: caseFlangesImg,
    alt: "Стальные фланцы после фрезерования на обрабатывающем центре",
    place: "Смоленск",
    kind: "Серия 80 шт.",
    task: "Планшайбы с шлицем, допуск ±0,02 мм",
    solution: "ЧПУ-фреза, калибровка, упаковка под отгрузку",
    result: "Сдано за 7 рабочих дней, брак 0 %",
  },
  {
    eyebrow: "Оборудование",
    title: "Силовая рама станка",
    img: caseFrameImg,
    alt: "Сварная рама из листового металла после лазерной резки и гибки",
    place: "Область",
    kind: "Единичный проект",
    task: "Рама по DXF, контроль диагоналей",
    solution: "Лазер + гибка + сварка MIG",
    result: "Монтаж у заказчика без подгонки",
  },
  {
    eyebrow: "Цветной металл",
    title: "Втулки из латуни Л63",
    img: caseTurnedImg,
    alt: "Латунные втулки после токарной обработки",
    place: "Москва",
    kind: "Приборостроение",
    task: "60 втулок, внутренняя резьба M8",
    solution: "Токарка ЧПУ, пассивация по согласованию",
    result: "Повторный заказ через 3 недели",
  },
];

const CHANNELS = [
  { href: PHONE_HREF, label: "Позвонить", Icon: PhoneIcon },
  { href: EMAIL_HREF, label: "Написать на почту", Icon: MailIcon },
  { href: TELEGRAM_HREF, label: "Telegram", Icon: TelegramIcon },
  { href: VIBER_HREF, label: "Viber", Icon: ViberIcon },
];

const BANK = BANK_LINES;

function Index() {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      <Header onRequest={open} />

      {/* HERO */}
      <section className="relative isolate flex min-h-[88vh] flex-col justify-end overflow-hidden lg:min-h-screen">
        <img
          src={heroShopImg}
          alt="Фрезерная обработка стальной детали на обрабатывающем центре с ЧПУ"
          width={1280}
          height={720}
          className="hero-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/92 via-graphite/60 to-graphite/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-transparent to-graphite/45" />
        {/* On narrow screens the photo crops in, so add a flat scrim for legibility */}
        <div className="absolute inset-0 bg-graphite/45 lg:hidden" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-36 lg:px-8 lg:pb-16 lg:pt-44">
          <div className="flex items-center gap-4">
            <span className="h-8 w-1 shrink-0 bg-brand" />
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-background/90 lg:text-xs">
              Металлообработка на ЧПУ · Смоленск
            </p>
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-4xl font-semibold uppercase leading-[1.06] text-background sm:text-5xl lg:text-6xl">
            Контрактное производство на ЧПУ:{" "}
            <span className="text-brand">от модели до отгрузки партии</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-background/85 lg:text-lg">
            Резка, гибка, фрезеровка, токарка и сварка — сталь,{" "}
            <span className="font-semibold text-lime">латунь, бронза</span>, инженерные пластмассы.
            Допуск <span className="font-semibold text-lime">±0,02 мм</span> по согласованному ТЗ.
            Производство в Смоленске. Первичная смета — бесплатно.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={open}
              className="rounded-full bg-brand px-9 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground shadow-lg shadow-carbon/25 transition-transform hover:-translate-y-0.5"
            >
              Рассчитать стоимость
            </button>
            <a
              href="#production"
              className="rounded-full border border-background/30 bg-background/10 px-9 py-4 text-center font-display text-sm font-semibold uppercase tracking-[0.14em] text-background backdrop-blur-sm transition-colors hover:bg-background/20"
            >
              Наше производство
            </a>
          </div>
        </div>

        <div className="relative border-t border-background/15 bg-background/10 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-7 px-5 py-8 lg:grid-cols-4 lg:px-8">
            {FACTS.map((f) => (
              <div key={f.l}>
                <p className="font-display text-2xl font-semibold text-background lg:text-3xl">
                  {f.v}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-background/70 lg:text-sm">
                  {f.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="scroll-mt-20 bg-secondary pt-14 pb-20 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
            Почему выбирают ТехМехКомплекс
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight lg:text-5xl">
            Ваши задачи — наша зона ответственности
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {ADVANTAGES.map((a, i) => (
              <div key={a.t} className="rounded-2xl bg-background p-7 lg:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-brand-foreground">
                    {`0${i + 1}`}
                  </span>
                  <h3 className="font-display text-lg font-semibold uppercase leading-snug lg:text-xl">
                    {a.t}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                  {a.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand px-7 py-8 text-brand-foreground lg:flex-row lg:px-10">
            <p className="font-display text-xl font-semibold uppercase leading-tight lg:text-2xl">
              Пришлите чертёж — подберём решение
            </p>
            <button
              onClick={open}
              className="w-full shrink-0 rounded-full bg-carbon px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-graphite lg:w-auto"
            >
              Отправить заявку
            </button>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="scroll-mt-20 pt-14 pb-20 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
              Кейсы
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-5xl">
              Решаем задачи наших клиентов — точно в срок и по ТЗ
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
              Реальные примеры производства: от единичных заказов до серий. С гарантией результата и
              экономией бюджета.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-ink"
              >
                <div className="overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    width={900}
                    height={540}
                    className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-deep">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold uppercase leading-snug lg:text-lg">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {c.place} · {c.kind}
                  </p>

                  <p className="mt-4 text-sm font-medium leading-snug text-foreground">{c.result}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {c.task}
                    <span className="mx-1.5 text-border">·</span>
                    {c.solution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductsSection />

      <ProductionSection />

      {/* CONTACTS */}
      <section id="contacts" className="scroll-mt-20 pt-14 pb-20 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
            Контакты
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight lg:text-5xl">
            Свяжитесь с нами
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            Свяжитесь с нами для получения дополнительной информации или оформления заказа.
            Консультация бесплатно.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-border p-7 lg:p-8">
              <ContactPhones variant="section" />

              <div className="mt-6 flex items-center gap-2">
                {CHANNELS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-lime-deep hover:bg-lime-deep/10 hover:text-lime-deep"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>

              <dl className="mt-8 space-y-5 border-t border-border pt-7 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Адрес производства
                  </dt>
                  <dd className="mt-1.5 font-medium">{ADDRESS_PRODUCTION}</dd>
                  {ACCESS_NOTE ? (
                    <dd className="mt-1 text-muted-foreground">{ACCESS_NOTE}</dd>
                  ) : null}
                  <dd className="mt-1">
                    <a
                      href={PRODUCTION_MAP_HREF}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground tabular-nums transition-colors hover:text-lime-deep"
                    >
                      {PRODUCTION_COORDINATES}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Юридический адрес
                  </dt>
                  <dd className="mt-1.5 leading-relaxed">{ADDRESS_LEGAL}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Почтовый адрес
                  </dt>
                  <dd className="mt-1.5 leading-relaxed">{ADDRESS_POSTAL}</dd>
                </div>
              </dl>

              <button
                onClick={open}
                className="mt-8 w-full rounded-full bg-brand px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                Рассчитать стоимость
              </button>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary">
              <iframe
                title="Карта: производство «ТехМехКомплекс», Смоленск, ул. Нормандия-Неман, 23"
                loading="lazy"
                className="min-h-80 w-full flex-1"
                src={PRODUCTION_MAP_EMBED_SRC}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-5 py-4">
                <p className="text-sm font-medium">{ADDRESS_PRODUCTION}</p>
                <a
                  href={PRODUCTION_MAP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-lime-deep underline-offset-4 hover:underline"
                >
                  Построить маршрут
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary p-7 lg:p-8">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-graphite">
              Банковские реквизиты
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              {BANK.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-graphite py-14 text-background/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="max-w-xs">
              <Logo invert />
              <p className="mt-5 text-sm leading-relaxed">
                Высокоточная металлообработка под ключ: фрезерование, лазерная резка, гибка, токарные
                работы, сварка и сборка РФ.
              </p>
            </div>

            <nav className="flex flex-col gap-3 text-sm uppercase tracking-wider">
              <a href="#cases" className="transition-colors hover:text-brand">
                Кейсы
              </a>
              <a href="#products" className="transition-colors hover:text-brand">
                Продукция
              </a>
              <a href="#production" className="transition-colors hover:text-brand">
                Производство
              </a>
              <a href="#contacts" className="transition-colors hover:text-brand">
                Контакты
              </a>
            </nav>

            <nav className="max-w-[12rem] text-sm" aria-label="География поставок">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
                Регионы
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {GEO_LANDINGS.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to="/geo/$slug"
                      params={{ slug: g.slug }}
                      className="transition-colors hover:text-brand"
                    >
                      {g.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="text-sm">
              <ContactPhones variant="footer" />
              <p className="mt-4 leading-relaxed">{ADDRESS_PRODUCTION}</p>
              <p className="mt-1 leading-relaxed">ИНН {ORG_INN}</p>
            </div>
          </div>

          <div className="mt-12 border-t border-background/15 pt-6 text-xs">
            © {new Date().getFullYear()} {SITE_LEGAL_NAME}. Все права защищены.
          </div>
        </div>
      </footer>

      <RequestModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

