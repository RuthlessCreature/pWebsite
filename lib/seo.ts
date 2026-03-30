import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, getLocalizedPath, type Locale, type SitePath } from "@/lib/i18n/config";

export const SEO_LAST_MODIFIED = new Date("2026-03-30T00:00:00.000Z");

export const ROBOTS_POLICY: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  "max-snippet": -1,
  "max-image-preview": "large",
  "max-video-preview": -1,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1
  }
};

type BreadcrumbSchemaItem = {
  name: string;
  url: string;
};

type WebPageSchemaInput = {
  url: string;
  title: string;
  description: string;
  locale: Locale;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
  breadcrumbId?: string;
};

type ItemListSchemaInput = {
  id: string;
  url: string;
  title: string;
  description?: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
};

type ServiceSchemaInput = {
  url: string;
  title: string;
  description: string;
  locale: Locale;
};

function getEnvValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];

    if (value) {
      return value;
    }
  }

  return undefined;
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, COMPANY.website).toString();
}

export function getAbsoluteLocaleAlternates(path: SitePath) {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_META[locale].alternateKey, toAbsoluteUrl(getLocalizedPath(locale, path))])),
    "x-default": toAbsoluteUrl(getLocalizedPath(DEFAULT_LOCALE, path))
  };
}

export function buildVerificationMetadata(): Metadata["verification"] | undefined {
  const google = getEnvValue("GOOGLE_SITE_VERIFICATION", "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
  const yahoo = getEnvValue("YAHOO_SITE_VERIFICATION", "NEXT_PUBLIC_YAHOO_SITE_VERIFICATION");
  const yandex = getEnvValue("YANDEX_SITE_VERIFICATION", "NEXT_PUBLIC_YANDEX_SITE_VERIFICATION");
  const bing = getEnvValue("BING_SITE_VERIFICATION", "NEXT_PUBLIC_BING_SITE_VERIFICATION");
  const baidu = getEnvValue("BAIDU_SITE_VERIFICATION", "NEXT_PUBLIC_BAIDU_SITE_VERIFICATION");
  const naver = getEnvValue("NAVER_SITE_VERIFICATION", "NEXT_PUBLIC_NAVER_SITE_VERIFICATION");

  const verification: NonNullable<Metadata["verification"]> = {};
  const other: NonNullable<NonNullable<Metadata["verification"]>["other"]> = {};

  if (google) {
    verification.google = google;
  }

  if (yahoo) {
    verification.yahoo = yahoo;
  }

  if (yandex) {
    verification.yandex = yandex;
  }

  if (bing) {
    other["msvalidate.01"] = bing;
  }

  if (baidu) {
    other["baidu-site-verification"] = baidu;
  }

  if (naver) {
    other["naver-site-verification"] = naver;
  }

  if (Object.keys(other).length > 0) {
    verification.other = other;
  }

  return Object.keys(verification).length > 0 ? verification : undefined;
}

export function buildOrganizationSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${COMPANY.website}#organization`,
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: COMPANY.website,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/icon.svg")
    },
    description,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      ...COMPANY.address
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        availableLanguage: LOCALES.map((item) => LOCALE_META[item].htmlLang),
        areaServed: "Worldwide"
      }
    ],
    inLanguage: LOCALE_META[locale].htmlLang
  };
}

export function buildWebsiteSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY.website}#website`,
    url: COMPANY.website,
    name: COMPANY.shortName,
    description,
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: {
      "@id": `${COMPANY.website}#organization`
    }
  };
}

export function buildBreadcrumbSchema(id: string, items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildWebPageSchema({ url, title, description, locale, type = "WebPage", breadcrumbId }: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: LOCALE_META[locale].htmlLang,
    isPartOf: {
      "@id": `${COMPANY.website}#website`
    },
    about: {
      "@id": `${COMPANY.website}#organization`
    },
    ...(breadcrumbId
      ? {
          breadcrumb: {
            "@id": breadcrumbId
          }
        }
      : {})
  };
}

export function buildItemListSchema({ id, url, title, description, items }: ItemListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id,
    url,
    name: title,
    ...(description ? { description } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.description ? { description: item.description } : {})
    }))
  };
}

export function buildServiceSchema({ url, title, description, locale }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name: title,
    description,
    serviceType: title,
    areaServed: {
      "@type": "Country",
      name: "China"
    },
    provider: {
      "@id": `${COMPANY.website}#organization`
    },
    availableLanguage: LOCALES.map((item) => LOCALE_META[item].htmlLang),
    inLanguage: LOCALE_META[locale].htmlLang
  };
}
