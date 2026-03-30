export const LOCALES = ["zh-cn", "zh-tw", "en", "ja", "ru", "es", "pt"] as const;

export type Locale = (typeof LOCALES)[number];

export type SitePath =
  | "/"
  | "/products"
  | "/products/3c-export"
  | "/products/industrial-computers"
  | "/sourcing-service"
  | "/visa-relocation"
  | "/recruitment-service"
  | "/about"
  | "/contact";

export type RouteKey =
  | "home"
  | "products"
  | "products-3c-export"
  | "products-industrial-computers"
  | "sourcing-service"
  | "visa-relocation"
  | "recruitment-service"
  | "about"
  | "contact";

export const DEFAULT_LOCALE: Locale = "en";
export const PREFERRED_LOCALE_COOKIE = "preferred_locale";

export const LOCALE_META: Record<
  Locale,
  {
    htmlLang: string;
    alternateKey: string;
    openGraphLocale: string;
    shortLabel: string;
    nativeLabel: string;
  }
> = {
  "zh-cn": {
    htmlLang: "zh-CN",
    alternateKey: "zh-CN",
    openGraphLocale: "zh_CN",
    shortLabel: "简中",
    nativeLabel: "简体中文"
  },
  "zh-tw": {
    htmlLang: "zh-TW",
    alternateKey: "zh-TW",
    openGraphLocale: "zh_TW",
    shortLabel: "繁中",
    nativeLabel: "繁體中文"
  },
  en: {
    htmlLang: "en",
    alternateKey: "en",
    openGraphLocale: "en_US",
    shortLabel: "EN",
    nativeLabel: "English"
  },
  ja: {
    htmlLang: "ja",
    alternateKey: "ja",
    openGraphLocale: "ja_JP",
    shortLabel: "日",
    nativeLabel: "日本語"
  },
  ru: {
    htmlLang: "ru",
    alternateKey: "ru",
    openGraphLocale: "ru_RU",
    shortLabel: "Рус",
    nativeLabel: "Русский"
  },
  es: {
    htmlLang: "es",
    alternateKey: "es",
    openGraphLocale: "es_ES",
    shortLabel: "ES",
    nativeLabel: "Español"
  },
  pt: {
    htmlLang: "pt",
    alternateKey: "pt",
    openGraphLocale: "pt_PT",
    shortLabel: "PT",
    nativeLabel: "Português"
  }
};

export const ROUTES: Array<{ key: RouteKey; path: SitePath }> = [
  { key: "home", path: "/" },
  { key: "products", path: "/products" },
  { key: "products-3c-export", path: "/products/3c-export" },
  { key: "products-industrial-computers", path: "/products/industrial-computers" },
  { key: "sourcing-service", path: "/sourcing-service" },
  { key: "visa-relocation", path: "/visa-relocation" },
  { key: "recruitment-service", path: "/recruitment-service" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" }
];

const ROUTE_BY_KEY = Object.fromEntries(ROUTES.map((route) => [route.key, route.path])) as Record<RouteKey, SitePath>;
const ROUTE_BY_PATH = Object.fromEntries(ROUTES.map((route) => [route.path, route.key])) as Record<SitePath, RouteKey>;

const COUNTRY_LOCALE_MAP: Partial<Record<string, Locale>> = {
  CN: "zh-cn",
  SG: "zh-cn",
  TW: "zh-tw",
  HK: "zh-tw",
  MO: "zh-tw",
  JP: "ja",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  KG: "ru",
  ES: "es",
  MX: "es",
  AR: "es",
  BO: "es",
  CL: "es",
  CO: "es",
  CR: "es",
  CU: "es",
  DO: "es",
  EC: "es",
  GQ: "es",
  GT: "es",
  HN: "es",
  NI: "es",
  PA: "es",
  PE: "es",
  PY: "es",
  SV: "es",
  UY: "es",
  VE: "es",
  PT: "pt",
  BR: "pt",
  AO: "pt",
  CV: "pt",
  GW: "pt",
  MZ: "pt",
  ST: "pt",
  TL: "pt"
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase().replace(/_/g, "-");

  if (isLocale(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("zh")) {
    if (normalized.includes("tw") || normalized.includes("hk") || normalized.includes("mo") || normalized.includes("hant")) {
      return "zh-tw";
    }

    return "zh-cn";
  }

  if (normalized.startsWith("ja")) {
    return "ja";
  }

  if (normalized.startsWith("ru")) {
    return "ru";
  }

  if (normalized.startsWith("es")) {
    return "es";
  }

  if (normalized.startsWith("pt")) {
    return "pt";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return null;
}

export function getLocaleFromCountry(country?: string | null): Locale | null {
  if (!country) {
    return null;
  }

  return COUNTRY_LOCALE_MAP[country.toUpperCase()] ?? null;
}

export function getLocaleFromAcceptLanguage(header?: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const candidates = header
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .map((part) => normalizeLocale(part))
    .filter((part): part is Locale => Boolean(part));

  return candidates[0] ?? DEFAULT_LOCALE;
}

export function getPathForRoute(routeKey: RouteKey): SitePath {
  return ROUTE_BY_KEY[routeKey];
}

export function getRouteKeyFromPath(path: SitePath): RouteKey {
  return ROUTE_BY_PATH[path];
}

export function getRouteKeyFromSlug(slug?: string[]): RouteKey | null {
  const path = slug && slug.length > 0 ? (`/${slug.join("/")}` as SitePath) : "/";
  return ROUTE_BY_PATH[path] ?? null;
}

export function getLocalizedPath(locale: Locale, path: SitePath): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  const normalizedLocale = normalizeLocale(segments[0]);

  if (!normalizedLocale) {
    return pathname === "" ? "/" : pathname;
  }

  const nextPath = `/${segments.slice(1).join("/")}`;
  return nextPath === "/" || nextPath === "" ? "/" : nextPath;
}

export function swapPathLocale(pathname: string, locale: Locale): string {
  const normalizedPath = stripLocaleFromPathname(pathname);

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}

export function getLocaleAlternates(path: SitePath): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_META[locale].alternateKey, getLocalizedPath(locale, path)])),
    "x-default": getLocalizedPath(DEFAULT_LOCALE, path)
  };
}

export function getStaticLocaleParams() {
  return LOCALES.map((locale) => ({ locale }));
}
