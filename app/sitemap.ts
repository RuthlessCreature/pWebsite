import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, getLocalizedPath } from "@/lib/i18n/config";
import { SEO_LAST_MODIFIED, getAbsoluteLocaleAlternates, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: toAbsoluteUrl(getLocalizedPath(locale, route.path)),
      lastModified: SEO_LAST_MODIFIED,
      changeFrequency: route.path === "/" || route.path === "/products" ? "weekly" : "monthly",
      priority: route.path === "/" ? 1 : route.path === "/products" || route.path === "/sourcing-service" ? 0.9 : 0.8,
      alternates: {
        languages: getAbsoluteLocaleAlternates(route.path)
      }
    }))
  );
}
