import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { getLocalizedPath, type Locale, type SitePath } from "@/lib/i18n/config";

type SiteFooterProps = {
  locale: Locale;
  badge: string;
  title: string;
  description: string;
  contactTitle: string;
  pagesTitle: string;
  responseTarget: string;
  legalNote: string;
  navItems: Array<{ label: string; href: SitePath }>;
};

export function SiteFooter({
  locale,
  badge,
  title,
  description,
  contactTitle,
  pagesTitle,
  responseTarget,
  legalNote,
  navItems
}: SiteFooterProps) {
  return (
    <footer className="mt-16 border-t border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,_#0f2034_0%,_#18293d_42%,_#5f2118_100%)] text-slate-200">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <section>
          <span className="section-label bg-white/10 text-white">{badge}</span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{description}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">{contactTitle}</h2>
          <p className="mt-4 text-sm">
            <a className="hover:text-white" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
              {COMPANY.phone}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a className="hover:text-white" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-slate-300">{COMPANY.city}</p>
          <p className="mt-2 text-sm text-slate-400">{responseTarget}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">{pagesTitle}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={getLocalizedPath(locale, item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        <p>{legalNote}</p>
      </div>
    </footer>
  );
}
