type IntroFact = {
  label: string;
  value: string;
};

type PageIntroProps = {
  title: string;
  description: string;
  facts?: IntroFact[];
};

export function PageIntro({ title, description, facts = [] }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700">{description}</p>
        {facts.length > 0 ? (
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border border-slate-200 bg-white p-4">
                <dt className="text-xs uppercase tracking-wide text-slate-500">{fact.label}</dt>
                <dd className="mt-2 text-sm font-medium text-slate-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
