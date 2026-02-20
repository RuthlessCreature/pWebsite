import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "China Supplier Sourcing and Verification Service",
  description:
    "Supplier sourcing workflow in China, including supplier verification, quotation normalization, pilot order monitoring, and risk controls.",
  path: "/sourcing-service",
  keywords: [
    "china supplier verification service",
    "china sourcing agent for importers",
    "supplier due diligence China",
    "china procurement support service"
  ]
});

const sourcingSteps = [
  {
    title: "Requirement briefing and feasibility screen",
    detail:
      "Client defines product target, annual quantity estimate, quality standard, and commercial constraints. We confirm whether the brief is executable.",
    owner: "Project lead"
  },
  {
    title: "Supplier longlist and profile validation",
    detail:
      "Candidate suppliers are screened for legal registration, manufacturing relevance, delivery history, and communication quality.",
    owner: "Sourcing team"
  },
  {
    title: "Quotation normalization and sample coordination",
    detail:
      "Commercial terms are normalized for direct comparison, and sample tasks are coordinated to validate technical and quality expectations.",
    owner: "Procurement + QC"
  },
  {
    title: "Pilot order monitoring and handover",
    detail:
      "Pilot production progress, exception handling, and output quality are tracked with a written handover report.",
    owner: "Operations"
  }
];

const riskItems = [
  {
    title: "Supplier profile inconsistency",
    signal: "Mismatch between claimed capability and observed production setup.",
    control: "Verification checklist and evidence-based supplier scoring before shortlist recommendation."
  },
  {
    title: "Quotation ambiguity",
    signal: "Hidden assumptions in tooling, packaging, or after-sales terms.",
    control: "Line-by-line quote normalization with assumption disclosure."
  },
  {
    title: "Sample-to-mass gap",
    signal: "Mass production output diverges from approved sample benchmark.",
    control: "Pilot-run checkpoint and non-conformance escalation path."
  },
  {
    title: "Unclear ownership in multi-party communication",
    signal: "Supplier, buyer, and intermediary actions are not time-bound or traceable.",
    control: "Written RACI ownership matrix and milestone log."
  }
];

export default function SourcingServicePage() {
  return (
    <>
      <PageIntro
        title="China Supplier Sourcing Service"
        description="This service helps overseas clients identify and qualify suppliers in China with practical due diligence, structured quotation comparison, and controlled pilot execution."
        facts={[
          { label: "Users", value: "SME importers and procurement teams" },
          { label: "Focus", value: "Verification, comparison, and execution control" },
          { label: "Outputs", value: "Supplier shortlist, normalized quotes, pilot report" },
          { label: "Approach", value: "Evidence-based decision support" }
        ]}
      />

      <SectionBlock
        title="Service Modules"
        summary="Modules can be used as a full cycle or selected based on the client's procurement maturity."
      >
        <DataTable
          columns={["Module", "What is included", "Typical deliverable"]}
          rows={[
            ["Supplier discovery", "Market scan and longlist aligned to product brief", "Initial supplier map with profile notes"],
            ["Verification", "Legal identity and capability pre-check", "Verification summary and risk flags"],
            ["Quotation alignment", "Commercial comparison across shortlisted suppliers", "Normalized quote matrix"],
            ["Pilot monitoring", "Pilot order tracking and issue escalation support", "Pilot execution report with recommendations"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Supplier Verification Workflow"
        summary="Verification is handled as a staged process with objective evidence at each gate."
      >
        <ProcessTimeline steps={sourcingSteps} />
      </SectionBlock>

      <SectionBlock
        title="Risk Controls"
        summary="The following controls are applied to reduce false positives in supplier selection and pilot execution."
      >
        <RiskGrid items={riskItems} />
      </SectionBlock>

      <SectionBlock
        title="Operational Boundaries"
        summary="To keep scope realistic, the following limits are defined before engagement."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>We provide process support and analysis, not legal guarantee of supplier future performance.</li>
          <li>Laboratory certification testing is arranged through qualified third parties when required.</li>
          <li>Final purchase contracts are signed directly between buyer and supplier unless otherwise agreed.</li>
          <li>Cost savings are not promised without fixed demand volume and stable specification.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
