import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  getLocaleAlternates,
  getLocalizedPath,
  type Locale,
  type SitePath
} from "@/lib/i18n/config";
import { ROBOTS_POLICY } from "@/lib/seo";

type PageMetadataInput = {
  title: string;
  description: string;
  path: SitePath;
  locale?: Locale;
  keywords?: string[];
};

const BASE_KEYWORDS: Record<Locale, string[]> = {
  "zh-cn": [
    "中国采购服务",
    "中国采购代理",
    "3C电子出口",
    "中国工业计算机供应",
    "中国嵌入式系统供应",
    "中国签证落地咨询",
    "中国招聘服务",
    "珠海国际贸易公司"
  ],
  "zh-tw": [
    "中國採購服務",
    "中國採購代理",
    "3C電子出口",
    "中國工業電腦供應",
    "中國嵌入式系統供應",
    "中國簽證落地諮詢",
    "中國招聘服務",
    "珠海國際貿易公司"
  ],
  en: [
    "China sourcing service",
    "China sourcing agent",
    "3C electronics export",
    "industrial computer supplier China",
    "embedded systems supplier China",
    "China visa and relocation consulting",
    "recruitment service in China",
    "Zhuhai international trading company"
  ],
  ja: [
    "中国調達サービス",
    "中国調達代行",
    "3C電子輸出",
    "中国産業用コンピュータ供給",
    "中国組込みシステム供給",
    "中国ビザ・定着支援",
    "中国採用支援",
    "珠海国際貿易会社"
  ],
  ru: [
    "услуги по закупкам в Китае",
    "агент по закупкам в Китае",
    "экспорт электроники 3C из Китая",
    "поставщик промышленных компьютеров в Китае",
    "поставщик встраиваемых систем в Китае",
    "визовая и релокационная поддержка в Китае",
    "подбор персонала в Китае",
    "международная торговая компания в Чжухае"
  ],
  es: [
    "servicio de compras en China",
    "agente de compras en China",
    "exportación 3C desde China",
    "proveedor de ordenadores industriales en China",
    "proveedor de sistemas embebidos en China",
    "consultoría de visa y reubicación en China",
    "servicio de reclutamiento en China",
    "empresa de comercio internacional en Zhuhai"
  ],
  pt: [
    "serviço de compras na China",
    "agente de compras na China",
    "exportação 3C da China",
    "fornecedor de computadores industriais na China",
    "fornecedor de sistemas embarcados na China",
    "consultoria de visto e relocação na China",
    "serviço de recrutamento na China",
    "empresa de comércio internacional em Zhuhai"
  ]
};

export function buildMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  keywords = []
}: PageMetadataInput): Metadata {
  const localizedPath = getLocalizedPath(locale, path);
  const url = new URL(localizedPath, COMPANY.website).toString();
  const shareImagePath = path === "/" ? `/api/social-image/${locale}` : `/api/social-image/${locale}${path}`;
  const shareImageUrl = new URL(shareImagePath, COMPANY.website).toString();
  const mergedKeywords = Array.from(new Set(BASE_KEYWORDS[locale].concat(keywords)));

  return {
    title: `${title} | ${COMPANY.shortName}`,
    description,
    keywords: mergedKeywords,
    category: "B2B Services",
    applicationName: COMPANY.shortName,
    referrer: "origin-when-cross-origin",
    authors: [
      {
        name: COMPANY.shortName,
        url: COMPANY.website
      }
    ],
    creator: COMPANY.shortName,
    publisher: COMPANY.legalName,
    alternates: {
      canonical: localizedPath,
      languages: getLocaleAlternates(path)
    },
    robots: ROBOTS_POLICY,
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.shortName,
      locale: LOCALE_META[locale].openGraphLocale,
      alternateLocale: LOCALES.filter((item) => item !== locale).map((item) => LOCALE_META[item].openGraphLocale),
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${COMPANY.shortName}`
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl]
    }
  };
}
