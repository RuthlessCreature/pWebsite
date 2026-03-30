import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  PREFERRED_LOCALE_COOKIE,
  type SitePath,
  getLocaleFromAcceptLanguage,
  getLocaleFromCountry,
  getLocalizedPath,
  normalizeLocale
} from "@/lib/i18n/config";

function detectLocale(request: NextRequest) {
  const preferred = normalizeLocale(request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value);

  if (preferred) {
    return preferred;
  }

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");

  const countryLocale = getLocaleFromCountry(country);

  if (countryLocale) {
    return countryLocale;
  }

  return getLocaleFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const normalizedLocale = normalizeLocale(firstSegment);

  if (normalizedLocale) {
    const normalizedPathname =
      firstSegment === normalizedLocale
        ? pathname
        : `/${normalizedLocale}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;

    if (normalizedPathname !== pathname) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = normalizedPathname;
      return NextResponse.redirect(redirectUrl);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", normalizedLocale);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  const locale = detectLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = getLocalizedPath(locale, (pathname === "/" ? "/" : pathname) as SitePath);
  redirectUrl.search = search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icon.svg|.*\\..*).*)"]
};
