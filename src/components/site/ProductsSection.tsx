import { Link } from "@tanstack/react-router";
import { useState } from "react";

import partsImg from "@/assets/parts.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEFAULT_PRODUCT_MATERIAL_TAB,
  PRODUCT_MATERIAL_TABS,
} from "@/lib/product-materials";

export function ProductsSection() {
  const [tab, setTab] = useState(DEFAULT_PRODUCT_MATERIAL_TAB);

  return (
    <section id="products" className="scroll-mt-20 bg-secondary pt-14 pb-20 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-lime-deep">
          Продукция и материалы
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight lg:text-5xl">
          Обработка стали, латуни, бронзы и пластмасс
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
          Чёрные и цветные металлы, инженерные пластики — подбираем технологию под материал и
          подтверждаем размеры техконтролем на площадке в{" "}
          <span className="font-medium text-foreground">Смоленске</span>. Латунь и бронза:{" "}
          <Link
            to="/production/$slug"
            params={{ slug: "obrabotka-latuni-i-bronzy" }}
            className="font-medium text-lime-deep underline-offset-4 hover:underline"
          >
            обработка на ЧПУ
          </Link>
          ; пластмассы —{" "}
          <Link
            to="/production/$slug"
            params={{ slug: "obrabotka-plastmass" }}
            className="font-medium text-lime-deep underline-offset-4 hover:underline"
          >
            фрезерование и токарка
          </Link>
          .
        </p>

        <Tabs value={tab} onValueChange={setTab} className="mt-10">
          <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-1.5 rounded-2xl bg-background p-1.5">
            {PRODUCT_MATERIAL_TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="rounded-xl px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.08em] data-[state=active]:bg-brand data-[state=active]:text-brand-foreground sm:text-xs"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="#production"
                  className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-lime-deep transition-colors hover:text-ink"
                >
                  Производство в Смоленске →
                </a>
                <Link
                  to="/transport"
                  className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-lime-deep transition-colors hover:text-ink"
                >
                  Транспортные услуги →
                </Link>
              </div>
              <img
                src={partsImg}
                alt="Детали из металла и пластика после обработки на ЧПУ «ТехМехКомплекс», Смоленск"
                loading="lazy"
                width={1152}
                height={864}
                className="mt-6 w-full rounded-2xl object-cover"
              />
            </div>

            <div className="min-w-0">
              {PRODUCT_MATERIAL_TABS.map((t) => (
                <TabsContent key={t.id} value={t.id} className="mt-0">
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{t.lead}</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {t.items.map((p) => (
                      <div key={p.title} className="rounded-2xl bg-background p-6 lg:p-7">
                        <div className="h-1 w-10 rounded-full bg-lime" />
                        <h3 className="mt-5 font-display text-lg font-semibold uppercase leading-snug">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
