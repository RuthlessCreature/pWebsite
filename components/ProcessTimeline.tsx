type ProcessStep = {
  title: string;
  detail: string;
  owner?: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-sm font-semibold text-brand-700">
              Step {index + 1}: {step.title}
            </p>
            {step.owner ? <p className="text-xs uppercase tracking-wide text-slate-500">Owner: {step.owner}</p> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
