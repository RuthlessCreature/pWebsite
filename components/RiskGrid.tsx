type RiskItem = {
  title: string;
  signal: string;
  control: string;
};

type RiskGridProps = {
  items: RiskItem[];
  badge?: string;
  signalLabel?: string;
  controlLabel?: string;
};

export function RiskGrid({
  items,
  badge = "Risk Signal",
  signalLabel = "Signal",
  controlLabel = "Control"
}: RiskGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="soft-panel rounded-[1.5rem] p-5 sm:p-6"
        >
          <span className="section-label bg-[rgba(139,58,43,0.08)] text-[color:var(--brand)]">{badge}</span>
          <h3 className="mt-4 font-display text-[1.8rem] font-semibold leading-none text-slate-950">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            <span className="font-semibold text-slate-800">{signalLabel}:</span> {item.signal}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            <span className="font-semibold text-slate-800">{controlLabel}:</span> {item.control}
          </p>
        </article>
      ))}
    </div>
  );
}
