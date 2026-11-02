import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { MailIcon, PhoneIcon, TelegramIcon, ViberIcon } from "@/components/site/icons";
import {
  EMAIL_HREF,
  MARKETING_PHONE_HREF,
  TELEGRAM_HREF,
  VIBER_HREF,
} from "@/lib/contacts";

type NavItem =
  | { kind: "hash"; hash: string; label: string }
  | { kind: "route"; to: string; label: string };

const NAV: NavItem[] = [
  { kind: "hash", hash: "#cases", label: "Кейсы" },
  { kind: "hash", hash: "#products", label: "Продукция" },
  { kind: "route", to: "/transport", label: "Транспорт" },
  { kind: "hash", hash: "#production", label: "Производство" },
  { kind: "hash", hash: "#contacts", label: "Контакты" },
];

const navLinkClass = (solid: boolean) =>
  `text-[13px] font-bold uppercase tracking-[0.08em] transition-colors ${
    solid ? "text-ink hover:text-lime-deep" : "text-background/90 hover:text-brand"
  }`;

const mobileNavLinkClass =
  "border-b border-border py-4 font-display text-lg font-medium uppercase tracking-wide";

function buildChannels(phoneHref: string, telegramHref: string, viberHref: string) {
  return [
    { href: phoneHref, label: "Позвонить", Icon: PhoneIcon },
    { href: EMAIL_HREF, label: "Написать на почту", Icon: MailIcon },
    { href: telegramHref, label: "Telegram", Icon: TelegramIcon },
    { href: viberHref, label: "Viber", Icon: ViberIcon },
  ];
}

export function Header({
  onRequest,
  forceSolid = false,
  phoneHref = MARKETING_PHONE_HREF,
  telegramHref = TELEGRAM_HREF,
  viberHref = VIBER_HREF,
}: {
  onRequest: () => void;
  forceSolid?: boolean;
  phoneHref?: string;
  telegramHref?: string;
  viberHref?: string;
}) {
  const channels = buildChannels(phoneHref, telegramHref, viberHref);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const navHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = forceSolid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background shadow-[0_1px_0_0_var(--color-border)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        {isHome ? (
          <a href="#top" aria-label="ТехМехКомплекс — на главную" className="inline-flex items-center">
            <Logo invert={!solid} />
          </a>
        ) : (
          <Link to="/" aria-label="ТехМехКомплекс — на главную" className="inline-flex items-center">
            <Logo invert={!solid} />
          </Link>
        )}

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV.map((n) => {
            if (n.kind === "route") {
              return (
                <Link key={n.to} to={n.to} className={navLinkClass(solid)}>
                  {n.label}
                </Link>
              );
            }
            return (
              <a key={n.hash} href={navHref(n.hash)} className={navLinkClass(solid)}>
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center xl:flex">
          <div className="flex items-center gap-2">
            {channels.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  solid
                    ? "border border-border text-muted-foreground hover:border-lime-deep hover:bg-lime-deep/10 hover:text-lime-deep"
                    : "border border-background/25 bg-background/10 text-background backdrop-blur-sm hover:bg-background/25"
                }`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <a
            href={MARKETING_PHONE_HREF}
            aria-label="Позвонить"
            className={`inline-flex h-11 items-center gap-2 rounded-full px-4 font-display text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              solid
                ? "bg-brand text-brand-foreground hover:bg-lime-deep"
                : "border border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/25"
            }`}
          >
            <PhoneIcon />
            Позвонить
          </a>
          <button
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border transition-colors ${
              solid ? "border-border" : "border-background/30 bg-background/10 backdrop-blur-sm"
            }`}
          >
            <span
              className={`h-0.5 w-5 transition-transform ${solid ? "bg-foreground" : "bg-background"} ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 transition-opacity ${solid ? "bg-foreground" : "bg-background"} ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 transition-transform ${solid ? "bg-foreground" : "bg-background"} ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-8 pt-2 xl:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => {
              if (n.kind === "route") {
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    {n.label}
                  </Link>
                );
              }
              return (
                <a
                  key={n.hash}
                  href={navHref(n.hash)}
                  onClick={() => setOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 flex items-center gap-2">
            {channels.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-lime-deep hover:bg-lime-deep/10 hover:text-lime-deep"
              >
                <Icon />
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setOpen(false);
              onRequest();
            }}
            className="mt-6 w-full rounded-full bg-brand px-5 py-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-foreground"
          >
            Рассчитать стоимость
          </button>
        </div>
      )}
    </header>
  );
}
