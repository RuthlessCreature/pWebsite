type RiskItem = {
  title: string;
  signal: string;
  control: string;
};

type RiskGridProps = {
  items: RiskItem[];
};

export function RiskGrid({ items }: RiskGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="border border-slate-200 p-5">
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Risk signal:</span> {item.signal}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            <span className="font-semibold text-slate-700">Control measure:</span> {item.control}
          </p>
        </article>
      ))}
    </div>
  );
}
