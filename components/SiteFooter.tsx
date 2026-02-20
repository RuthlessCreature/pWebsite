import Link from "next/link";
import { COMPANY, NAV_ITEMS } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{COMPANY.legalName}</p>
          <p className="mt-2 text-sm text-slate-300">{COMPANY.city}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h2>
          <p className="mt-3 text-sm">
            <a className="hover:text-white" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
              {COMPANY.phone}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a className="hover:text-white" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Pages</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-300">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        <p>All service commitments are executed against written scope and final contract terms.</p>
      </div>
    </footer>
  );
}
