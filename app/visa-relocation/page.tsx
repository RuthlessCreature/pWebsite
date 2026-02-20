import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "China Visa and Relocation Consulting Service",
  description:
    "China visa and relocation support process for foreign professionals and employers, including case pre-check, document planning, and scope boundaries.",
  path: "/visa-relocation",
  keywords: [
    "china work visa consulting",
    "china relocation service for foreigners",
    "visa document checklist China",
    "expat relocation support China"
  ]
});

const visaSteps = [
  {
    title: "Eligibility pre-check",
    detail:
      "Applicant profile, job offer status, and destination city requirements are reviewed before document preparation starts.",
    owner: "Case coordinator"
  },
  {
    title: "Document planning and checklist issue",
    detail:
      "A case-specific checklist is prepared for applicant and employer, including translation and legalization requirements where applicable.",
    owner: "Documentation team"
  },
  {
    title: "Submission coordination and follow-up",
    detail:
      "Submission sequencing is tracked with reminders and correction loops to reduce avoidable rejections.",
    owner: "Case coordinator"
  },
  {
    title: "Arrival and relocation support handover",
    detail:
      "After approval, we assist with practical onboarding steps according to local process and agreed scope.",
    owner: "Relocation support"
  }
];

const riskItems = [
  {
    title: "Incomplete applicant file",
    signal: "Missing notarization, expired certificates, or inconsistent background information.",
    control: "Pre-submission document audit and correction cycle."
  },
  {
    title: "Policy interpretation mismatch",
    signal: "Assumptions based on another city or outdated policy version.",
    control: "Case advice tied to current local authority guidance at time of handling."
  },
  {
    title: "Unrealistic timeline expectation",
    signal: "Travel or employment plans finalized before approval milestones are reached.",
    control: "Timeline communicated in range format with explicit dependency notes."
  },
  {
    title: "Scope misunderstanding after arrival",
    signal: "Requests extend beyond agreed relocation tasks.",
    control: "Written service checklist with out-of-scope items identified early."
  }
];

export default function VisaRelocationPage() {
  return (
    <>
      <PageIntro
        title="Visa and Relocation Consulting"
        description="This service supports foreign professionals and hiring companies with structured case preparation, submission coordination, and relocation process guidance in China."
        facts={[
          { label: "Main users", value: "Foreign professionals and employer HR teams" },
          { label: "Service basis", value: "Case-specific checklist and process control" },
          { label: "Coordination style", value: "Written milestones with role ownership" },
          { label: "Boundary", value: "Decision authority remains with government departments" }
        ]}
      />

      <SectionBlock
        title="Service Scope"
        summary="The service focuses on operational preparation and process guidance for compliant case handling."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Initial route review based on applicant profile and city-level handling practice.</li>
          <li>Document checklist preparation for applicant and sponsoring employer.</li>
          <li>Submission sequence planning and status follow-up support.</li>
          <li>Practical relocation guidance for post-arrival administrative tasks as contracted.</li>
        </ul>
      </SectionBlock>

      <SectionBlock
        title="Case Workflow"
        summary="Each case follows staged controls to reduce rejection causes and prevent timeline misunderstandings."
      >
        <ProcessTimeline steps={visaSteps} />
      </SectionBlock>

      <SectionBlock
        title="Risk Disclosure and Controls"
        summary="The following signals are actively managed during case execution."
      >
        <RiskGrid items={riskItems} />
      </SectionBlock>

      <SectionBlock
        title="Service Limits"
        summary="To protect practical expectations, the following boundaries are defined in every case file."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Visa approval outcomes and processing speed are controlled by relevant authorities, not by service providers.</li>
          <li>Policy updates may affect requirements during active cases; checklist adjustments are communicated in writing.</li>
          <li>Legal representation in disputes is outside this operational consulting scope unless separately engaged.</li>
          <li>Travel bookings should be finalized only after key approvals are secured.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
