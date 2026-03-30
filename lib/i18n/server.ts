import { notFound } from "next/navigation";
import { getPathForRoute, isLocale, normalizeLocale, type Locale } from "@/lib/i18n/config";

export function requireLocale(localeValue: string): Locale {
  const normalized = normalizeLocale(localeValue);

  if (!normalized || !isLocale(normalized)) {
    notFound();
  }

  return normalized;
}

export { getPathForRoute };
