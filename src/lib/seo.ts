import { EMAIL, PHONE_DISPLAY } from "./contacts";
import type { EquipmentItem } from "./equipment";
import { getEquipmentSeoOrFallback } from "./equipment-seo";
import type { GeoLanding } from "./geo-landings";
import { getEquipmentOgImage, OG_HOME_IMAGE } from "./og-images";
import { SITE_LEGAL_NAME, SITE_LOCALE, SITE_NAME, SITE_URL } from "./site";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildEquipmentHead(equipment: EquipmentItem) {
  const seo = getEquipmentSeoOrFallback(equipment);
  const canonical = `/production/${equipment.slug}`;
  const url = absoluteUrl(canonical);
  const image = absoluteUrl(getEquipmentOgImage(equipment.slug));

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords.join(", ") },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${seo.h1} — ТехМехКомплекс` },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildEquipmentJsonLd(equipment, seo, url, image)),
      },
    ],
  };
}

function buildEquipmentJsonLd(
  equipment: EquipmentItem,
  seo: ReturnType<typeof getEquipmentSeoOrFallback>,
  pageUrl: string,
  imageUrl: string,
) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    email: EMAIL,
    telephone: PHONE_DISPLAY.replace(/\s/g, ""),
  };

  const service = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: seo.h1,
    description: seo.description,
    serviceType: seo.h1,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Смоленск" },
      { "@type": "AdministrativeArea", name: "Смоленская область" },
      { "@type": "Country", name: "Россия" },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "RUB",
      url: pageUrl,
    },
    image: imageUrl,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Производство",
        item: `${SITE_URL}/#production`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.h1,
        item: pageUrl,
      },
    ],
  };

  const webpage = {
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${pageUrl}#service` },
    primaryImageOfPage: imageUrl,
    inLanguage: SITE_LOCALE,
  };

  const graph: Record<string, unknown>[] = [organization, service, breadcrumb, webpage];

  if (seo.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: seo.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildGeoHead(geo: GeoLanding) {
  const canonical = `/geo/${geo.slug}`;
  const url = absoluteUrl(canonical);
  const image = absoluteUrl(OG_HOME_IMAGE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: geo.title,
        description: geo.description,
        inLanguage: SITE_LOCALE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Service",
        name: geo.h1,
        description: geo.lead,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: geo.cityName,
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          servicePhone: PHONE_DISPLAY,
        },
      },
      ...(geo.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: geo.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return {
    meta: [
      { title: geo.title },
      { name: "description", content: geo.description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: geo.title },
      { property: "og:description", content: geo.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:title", content: geo.title },
      { name: "twitter:description", content: geo.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}
