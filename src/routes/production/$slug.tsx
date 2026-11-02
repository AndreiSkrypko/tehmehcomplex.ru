import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { EquipmentDetail } from "@/components/site/EquipmentDetail";
import { ContactPhones } from "@/components/site/ContactPhones";
import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { RequestModal } from "@/components/site/RequestModal";
import { getEquipmentBySlug } from "@/lib/equipment";
import { buildEquipmentHead } from "@/lib/seo";
import { SITE_LEGAL_NAME } from "@/lib/site";

export const Route = createFileRoute("/production/$slug")({
  loader: ({ params }) => {
    const equipment = getEquipmentBySlug(params.slug);
    if (!equipment) throw notFound();
    return equipment;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return buildEquipmentHead(loaderData);
  },
  component: EquipmentPage,
});

function EquipmentPage() {
  const equipment = Route.useLoaderData();
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header onRequest={() => setModal(true)} forceSolid />
      <EquipmentDetail equipment={equipment} onRequest={() => setModal(true)} />

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
