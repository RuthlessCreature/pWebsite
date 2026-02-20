import Link from "next/link";
import { COMPANY, NAV_ITEMS } from "@/lib/company";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-slate-600 sm:px-6 lg:px-8">
          <p>{COMPANY.legalName}</p>
          <p>
            <a className="hover:text-brand-700" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
              {COMPANY.phone}
            </a>
            {"  |  "}
            <a className="hover:text-brand-700" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-site flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link className="text-base font-semibold text-slate-900" href="/">
          Pomerol International
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-brand-700" href={item.href}>
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
