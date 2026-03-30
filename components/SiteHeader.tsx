import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getLocalizedPath, type Locale, type SitePath } from "@/lib/i18n/config";

type SiteHeaderProps = {
  locale: Locale;
  languageLabel: string;
  strapline: string;
  secondaryActionLabel: string;
  primaryActionLabel: string;
  navItems: Array<{ label: string; href: SitePath }>;
};

export function SiteHeader({
  locale,
  languageLabel,
  strapline,
  secondaryActionLabel,
  primaryActionLabel,
  navItems
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-[rgba(250,245,239,0.82)] backdrop-blur-xl">
      <div className="border-b border-[rgba(16,36,61,0.08)] bg-[rgba(255,252,249,0.7)]">
        <div className="site-shell flex flex-wrap items-center justify-between gap-3 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
          <p>{COMPANY.legalName}</p>
          <p>
            <a className="brand-link" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
              {COMPANY.phone}
            </a>
            {"  |  "}
            <a className="brand-link" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </p>
        </div>
      </div>
      <div className="site-shell py-4">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <Link
              className="font-display text-[1.8rem] font-semibold leading-none text-slate-950"
              href={getLocalizedPath(locale, "/")}
            >
              Pomerol International
            </Link>
            <p className="mt-2 text-sm text-slate-600">{strapline}</p>
          </div>
          <div className="flex flex-col gap-4 xl:items-end">
            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <LanguageSwitcher currentLocale={locale} label={languageLabel} />
              <a className="secondary-button" href={`mailto:${COMPANY.email}`}>
                {secondaryActionLabel}
              </a>
              <Link className="brand-button" href={getLocalizedPath(locale, "/contact")}>
                {primaryActionLabel}
              </Link>
            </div>
          </div>
        </div>
        <nav aria-label="Primary navigation" className="mt-5 overflow-x-auto pb-1">
          <ul className="flex min-w-max items-center gap-2 text-sm text-slate-700 md:min-w-0 md:flex-wrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex rounded-full border border-[rgba(16,36,61,0.1)] bg-white/72 px-4 py-2 transition hover:border-[rgba(139,58,43,0.22)] hover:text-[color:var(--brand)]"
                  href={getLocalizedPath(locale, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
