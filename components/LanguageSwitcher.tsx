"use client";

import { startTransition, useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LOCALES,
  LOCALE_META,
  PREFERRED_LOCALE_COOKIE,
  type Locale,
  swapPathLocale
} from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const selectId = useId();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(nextLocale: Locale) {
    if (nextLocale === currentLocale) {
      return;
    }

    const search = searchParams.toString();
    const nextPath = `${swapPathLocale(pathname, nextLocale)}${search ? `?${search}` : ""}`;

    document.cookie = `${PREFERRED_LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.push(nextPath);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={selectId} className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <select
        id={selectId}
        className="rounded-full border border-[rgba(16,36,61,0.12)] bg-white/90 px-4 py-2 text-sm font-medium text-slate-800 outline-none transition focus:border-[rgba(139,58,43,0.36)] focus:ring-2 focus:ring-[rgba(139,58,43,0.12)]"
        value={currentLocale}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        {LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {LOCALE_META[locale].nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
