import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { ContactPhones } from "@/components/site/ContactPhones";
import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { RequestModal } from "@/components/site/RequestModal";
import {
  CASES_HERO_IMAGE,
  CASES_PAGE_DESC,
  CASES_PAGE_TITLE,
  CASE_STUDIES,
} from "@/lib/cases";
import { absoluteUrl } from "@/lib/seo";
import { SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: CASES_PAGE_TITLE },
      { name: "description", content: CASES_PAGE_DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: CASES_PAGE_TITLE },
      { property: "og:description", content: CASES_PAGE_DESC },
      { property: "og:url", content: `${SITE_URL}/cases` },
      { property: "og:image", content: absoluteUrl(CASES_HERO_IMAGE) },
      { name: "twitter:title", content: CASES_PAGE_TITLE },
      { name: "twitter:description", content: CASES_PAGE_DESC },
      { name: "twitter:image", content: absoluteUrl(CASES_HERO_IMAGE) },
    ],
    links: [{ rel: "canonical", href: "/cases" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Кейсы ${SITE_NAME}`,
          description: CASES_PAGE_DESC,
          url: `${SITE_URL}/cases`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          provider: { "@id": `${SITE_URL}/#organization` },
        }),
      },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header onRequest={() => setModal(true)} forceSolid />

      <main>
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-steel/70 via-graphite to-graphite pt-24 text-background lg:pt-28">
          <img
            src={CASES_HERO_IMAGE}
            alt=""
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite/95 via-graphite/80 to-graphite/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,233,44,0.14),transparent_50%)]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-20">
            <nav
              aria-label="Хлебные крошки"
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-background/50"
            >
              <Link to="/" className="transition-colors hover:text-brand">
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-background/85">Кейсы</span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Производство в Смоленске
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] lg:text-5xl">
                Кейсы
              </h1>
              <p className="mt-5 text-base leading-relaxed text-background/80 lg:text-lg">
                Решаем задачи клиентов — точно в срок и по ТЗ. Реальные заказы: задача и технология
                по каждой позиции.
              </p>
              <button
                type="button"
                onClick={() => setModal(true)}
                className="mt-8 rounded-full bg-brand px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                Обсудить похожий заказ
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
              Проекты
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
              От серии до единичного изделия
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
              Каждый кейс — реальный заказ: задача, технология и сроки.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <CaseStudyCard key={study.id} study={study} variant="detailed" />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand px-7 py-8 text-brand-foreground lg:flex-row lg:px-10">
              <p className="max-w-xl font-display text-xl font-semibold uppercase leading-tight lg:text-2xl">
                Есть чертёж или ТЗ? Подберём технологию и срок
              </p>
              <button
                type="button"
                onClick={() => setModal(true)}
                className="w-full shrink-0 rounded-full bg-carbon px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-graphite lg:w-auto"
              >
                Отправить заявку
              </button>
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
                {SITE_NAME} — металлообработка на ЧПУ в Смоленске. Поставки по России.
              </p>
            </div>

            <nav className="flex flex-col gap-3 text-sm uppercase tracking-wider">
              <Link to="/cases" className="text-brand">
                Кейсы
              </Link>
              <a href="/#products" className="transition-colors hover:text-brand">
                Продукция
              </a>
              <a href="/#production" className="transition-colors hover:text-brand">
                Производство
              </a>
              <a href="/#contacts" className="transition-colors hover:text-brand">
                Контакты
              </a>
            </nav>

            <div className="text-sm">
              <ContactPhones variant="footer" />
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
