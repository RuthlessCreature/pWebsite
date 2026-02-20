import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { COMPANY } from "@/lib/company";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Pomerol International Trading Zhuhai",
  description:
    "Company profile, operating model, and execution controls of Pomerol International Trading (Zhuhai) Co., Ltd for international B2B clients.",
  path: "/about",
  keywords: [
    "zhuhai international trading company",
    "china b2b service company",
    "china sourcing and export partner profile"
  ]
});

const operatingSteps = [
  {
    title: "Scope confirmation",
    detail: "Before engagement, each assignment is mapped to concrete deliverables, owners, and measurable checkpoints.",
    owner: "Account lead"
  },
  {
    title: "Cross-function execution",
    detail: "Procurement, QC, logistics, and case coordinators operate against a shared milestone plan and exception log.",
    owner: "Operations manager"
  },
  {
    title: "Documented closure",
    detail:
      "Completion is recorded through delivery files and written closure notes to ensure traceability for both operational and audit use.",
    owner: "Project coordinator"
  }
];

const controlItems = [
  {
    title: "Scope governance",
    signal: "Open-ended requests increase delivery uncertainty and timeline risk.",
    control: "Written scope and controlled change request process."
  },
  {
    title: "Communication discipline",
    signal: "Multiple informal channels cause conflicting instructions.",
    control: "Designated project contacts and milestone-based updates."
  },
  {
    title: "Documentation integrity",
    signal: "Different versions of the same file circulate across teams.",
    control: "Single reference version with timestamped revisions."
  },
  {
    title: "Commercial transparency",
    signal: "Assumptions are not reflected in quote notes.",
    control: "Pricing and execution assumptions stated in every proposal."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About Pomerol International"
        description={`${COMPANY.legalName} is a Zhuhai-based service company supporting overseas clients in product supply, sourcing execution, relocation process guidance, and recruitment coordination in China.`}
        facts={[
          { label: "Entity name", value: COMPANY.legalName },
          { label: "Operating location", value: COMPANY.city },
          { label: "Service model", value: "B2B project and recurring service delivery" },
          { label: "Working style", value: "Structured process and risk-aware execution" }
        ]}
      />

      <SectionBlock
        title="Business Coverage"
        summary="The company works across five operating lines with practical delivery responsibilities."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>3C electronics export execution for international buyers.</li>
          <li>Industrial computer and embedded hardware sourcing support.</li>
          <li>Supplier verification and procurement process coordination in China.</li>
          <li>Visa and relocation process support for foreign professionals.</li>
          <li>Recruitment and job agent support for hiring in China.</li>
        </ul>
      </SectionBlock>

      <SectionBlock
        title="How We Execute Projects"
        summary="Delivery follows a practical control framework to keep commercial expectations aligned with operational reality."
      >
        <ProcessTimeline steps={operatingSteps} />
      </SectionBlock>

      <SectionBlock
        title="Control Framework"
        summary="The control framework is designed to reduce ambiguity, prevent rework, and support transparent client communication."
      >
        <RiskGrid items={controlItems} />
      </SectionBlock>

      <SectionBlock
        title="Operational Boundaries"
        summary="The company provides process execution support, not open-ended guarantees outside agreed contractual scope."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Regulatory approvals and decisions by public authorities are outside service-provider control.</li>
          <li>Outcome expectations are based on declared requirements and client-provided data.</li>
          <li>Third-party performance (supplier, carrier, issuer) is managed through controls but not guaranteed.</li>
          <li>Commercial commitments are valid only when documented in the signed project scope.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
