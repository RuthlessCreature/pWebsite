import Link from "next/link";
import { Breadcrumbs, type BreadcrumbLink } from "@/components/Breadcrumbs";

type IntroFact = {
  label: string;
  value: string;
};

type IntroAction = {
  label: string;
  href: string;
};

type PageIntroProps = {
  title: string;
  description: string;
  facts?: IntroFact[];
  eyebrow?: string;
  breadcrumbs?: BreadcrumbLink[];
  primaryAction?: IntroAction;
  secondaryAction?: IntroAction;
};

export function PageIntro({
  title,
  description,
  facts = [],
  eyebrow = "China Operations Partner",
  breadcrumbs,
  primaryAction,
  secondaryAction
}: PageIntroProps) {
  return (
    <section className="section-shell pt-10 sm:pt-14">
      <div className="site-shell">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[36%] bg-[radial-gradient(circle_at_top_right,_rgba(191,138,74,0.22),_transparent_36%),radial-gradient(circle_at_center,_rgba(16,36,61,0.12),_transparent_46%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] lg:items-start">
            <div>
              {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
              <span className={breadcrumbs && breadcrumbs.length > 0 ? "section-label mt-4" : "section-label"}>{eyebrow}</span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-slate-950 sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{description}</p>
              {primaryAction || secondaryAction ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryAction ? (
                    <Link className="brand-button" href={primaryAction.href}>
                      {primaryAction.label}
                    </Link>
                  ) : null}
                  {secondaryAction ? (
                    <Link className="secondary-button" href={secondaryAction.href}>
                      {secondaryAction.label}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
            {facts.length > 0 ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[1.4rem] border border-white/60 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(248,240,232,0.9))] p-5 shadow-[0_18px_40px_rgba(16,36,61,0.08)]"
                  >
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-3 text-sm font-medium leading-6 text-slate-900">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
        {facts.length > 0 ? (
          <dl className="sr-only">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
