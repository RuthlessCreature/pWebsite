type ProcessStep = {
  title: string;
  detail: string;
  owner?: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
  ownerLabel?: string;
};

export function ProcessTimeline({ steps, ownerLabel = "Owner" }: ProcessTimelineProps) {
  return (
    <ol className="relative grid gap-5 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:bg-[linear-gradient(180deg,_rgba(139,58,43,0.36),_rgba(16,36,61,0.12))] md:before:left-8">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="soft-panel relative rounded-[1.5rem] p-5 pl-16 sm:p-6 sm:pl-20"
        >
          <span className="absolute left-4 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--brand)] text-xs font-semibold text-white shadow-[0_10px_24px_rgba(139,58,43,0.28)] sm:left-6 sm:top-6">
            {index + 1}
          </span>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-display text-[1.6rem] font-semibold leading-none text-slate-950">{step.title}</p>
            {step.owner ? (
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {ownerLabel}: {step.owner}
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-[0.95rem]">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
