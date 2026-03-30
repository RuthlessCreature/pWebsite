import Link from "next/link";

export type BreadcrumbLink = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbLink[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {isCurrent ? (
                <span aria-current="page" className="text-slate-700">
                  {item.label}
                </span>
              ) : (
                <Link className="transition hover:text-[color:var(--brand)]" href={item.href}>
                  {item.label}
                </Link>
              )}
              {!isCurrent ? <span className="text-slate-300">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
