import { ReactNode } from "react";

type SectionBlockProps = {
  title: string;
  summary?: string;
  children: ReactNode;
  id?: string;
};

export function SectionBlock({ title, summary, children, id }: SectionBlockProps) {
  return (
    <section id={id} className="border-b border-slate-200 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          {summary ? <p className="mt-3 text-base leading-7 text-slate-700">{summary}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
