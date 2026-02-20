import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

const BASE_KEYWORDS = [
  "China sourcing service",
  "China sourcing agent",
  "3C electronics export",
  "industrial computer supplier China",
  "embedded systems supplier China",
  "China visa and relocation consulting",
  "recruitment service in China",
  "Zhuhai international trading company"
];

export function buildMetadata({ title, description, path, keywords = [] }: PageMetadataInput): Metadata {
  const url = new URL(path, COMPANY.website).toString();
  const mergedKeywords = Array.from(new Set(BASE_KEYWORDS.concat(keywords)));

  return {
    title,
    description,
    keywords: mergedKeywords,
    category: "B2B Services",
    applicationName: COMPANY.shortName,
    creator: COMPANY.shortName,
    publisher: COMPANY.legalName,
    alternates: {
      canonical: path,
      languages: {
        en: path,
        "x-default": path
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.shortName,
      locale: COMPANY.locale,
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}
