import { ReactNode } from "react";

type SectionBlockProps = {
  badge?: string;
  title: string;
  summary?: string;
  children: ReactNode;
  id?: string;
};

export function SectionBlock({ badge = "Structured Delivery", title, summary, children, id }: SectionBlockProps) {
  return (
    <section id={id} className="section-shell">
      <div className="site-shell">
        <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-4xl">
            <span className="section-label">{badge}</span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 sm:text-5xl">{title}</h2>
            {summary ? <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">{summary}</p> : null}
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
