import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { ContactPhones } from "@/components/site/ContactPhones";
import { GeoLandingDetail } from "@/components/site/GeoLandingDetail";
import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { RequestModal } from "@/components/site/RequestModal";
import { getGeoBySlug } from "@/lib/geo-landings";
import { buildGeoHead } from "@/lib/seo";
import { SITE_LEGAL_NAME } from "@/lib/site";

export const Route = createFileRoute("/geo/$slug")({
  loader: ({ params }) => {
    const geo = getGeoBySlug(params.slug);
    if (!geo) throw notFound();
    return geo;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return buildGeoHead(loaderData);
  },
  component: GeoPage,
});

function GeoPage() {
  const geo = Route.useLoaderData();
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header onRequest={() => setModal(true)} forceSolid />
      <GeoLandingDetail geo={geo} onRequest={() => setModal(true)} />

      <footer className="bg-graphite py-14 text-background/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="max-w-xs">
              <Logo invert />
              <p className="mt-5 text-sm leading-relaxed">
                Производство в Смоленске — поставки в регионы РФ, в том числе {geo.cityName}.
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
