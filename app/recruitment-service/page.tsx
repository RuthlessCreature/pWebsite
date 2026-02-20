import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Recruitment and Job Agent Service in China",
  description:
    "Recruitment support process for hiring in China, including role intake, candidate screening coordination, interview flow, and onboarding control.",
  path: "/recruitment-service",
  keywords: [
    "china recruitment agency service",
    "foreign talent hiring China",
    "bilingual candidate sourcing China",
    "job agent service in China"
  ]
});

const recruitmentSteps = [
  {
    title: "Role intake and hiring criteria lock",
    detail:
      "Position requirements, compensation range, reporting line, and language or technical thresholds are documented before search starts.",
    owner: "Recruitment coordinator"
  },
  {
    title: "Candidate sourcing and screening",
    detail:
      "Candidate pipeline is built through targeted sourcing channels and screened against agreed criteria before shortlist submission.",
    owner: "Talent team"
  },
  {
    title: "Interview coordination and feedback loop",
    detail:
      "Interview scheduling, structured feedback capture, and comparison notes are managed to keep decision cycles clear and timely.",
    owner: "Recruitment coordinator"
  },
  {
    title: "Offer process and onboarding handover",
    detail:
      "Offer terms are coordinated between employer and candidate with written record of acceptance conditions and onboarding timeline.",
    owner: "Delivery lead"
  }
];

const riskItems = [
  {
    title: "Role definition drift",
    signal: "Hiring criteria changes repeatedly after candidate search has started.",
    control: "Formal role freeze point with change note protocol."
  },
  {
    title: "Candidate expectation mismatch",
    signal: "Compensation, location, or visa conditions differ between briefing and offer stage.",
    control: "Expectation alignment checks at screening and pre-offer stages."
  },
  {
    title: "Confidentiality leakage",
    signal: "Sensitive hiring information shared beyond authorized participants.",
    control: "Need-to-know communication and designated channel controls."
  },
  {
    title: "Slow decision cycles",
    signal: "Interview feedback delays leading to candidate loss.",
    control: "Decision timeline agreement with escalation points."
  }
];

export default function RecruitmentServicePage() {
  return (
    <>
      <PageIntro
        title="Recruitment and Job Agent Service"
        description="This service supports employers and foreign professionals through structured hiring workflows in China, with emphasis on role clarity, screening discipline, and controlled communication."
        facts={[
          { label: "Client side", value: "Employers and hiring managers" },
          { label: "Candidate side", value: "Foreign and bilingual professional profiles" },
          { label: "Focus", value: "Process discipline and expectation alignment" },
          { label: "Output", value: "Shortlist, interview cycle, onboarding coordination" }
        ]}
      />

      <SectionBlock
        title="Coverage Scope"
        summary="Scope is defined by role complexity, hiring urgency, and required market reach."
      >
        <DataTable
          columns={["Hiring scenario", "Service scope", "Typical output"]}
          rows={[
            ["Technical role hiring", "Requirement intake and targeted candidate pipeline", "Shortlist with evaluation notes"],
            ["Bilingual commercial role hiring", "Channel sourcing and communication-focused screening", "Interview-ready candidate set"],
            ["Relocation-linked hiring", "Coordination between recruitment and visa support tasks", "Integrated hiring and onboarding plan"],
            ["Urgent replacement hiring", "Compressed search cycle with weekly progress updates", "Priority shortlist and decision log"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Recruitment Workflow"
        summary="The workflow keeps hiring teams and candidates aligned on timeline, criteria, and decision ownership."
      >
        <ProcessTimeline steps={recruitmentSteps} />
      </SectionBlock>

      <SectionBlock
        title="Quality and Confidentiality Controls"
        summary="Controls focus on reducing rework, candidate drop-off, and communication confusion."
      >
        <RiskGrid items={riskItems} />
      </SectionBlock>

      <SectionBlock
        title="Operational Boundaries"
        summary="This service supports process execution and does not replace employer legal or managerial responsibilities."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Final hiring decisions, labor contract terms, and compliance obligations remain with the employer.</li>
          <li>Candidate acceptance cannot be guaranteed due to market and timeline variables.</li>
          <li>Background checks and legal screening are performed by authorized third parties when required.</li>
          <li>Retention outcomes depend on post-hire management and are outside recruitment process control.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
