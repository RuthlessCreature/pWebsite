import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Industrial Computers and Embedded Systems Sourcing",
  description:
    "Technical supply workflow and delivery controls for sourcing industrial computers and embedded hardware from China.",
  path: "/products/industrial-computers",
  keywords: [
    "industrial pc supplier China",
    "fanless ipc sourcing",
    "embedded systems supplier China",
    "panel pc procurement China"
  ]
});

const technicalSteps = [
  {
    title: "Application profile and baseline definition",
    detail:
      "Client provides target deployment scenario, performance requirements, interface constraints, and environmental conditions.",
    owner: "Sales engineering"
  },
  {
    title: "Candidate model matching and lifecycle review",
    detail:
      "Shortlisted hardware options are reviewed for I/O fit, expansion needs, and lifecycle stability before quotation release.",
    owner: "Product manager"
  },
  {
    title: "Sample validation and revision lock",
    detail:
      "Pilot units are tested against agreed checklist. Revision code and firmware reference are frozen before mass order confirmation.",
    owner: "Client engineering + QC"
  },
  {
    title: "Order execution and delivery handover",
    detail:
      "Production progress, packaging specification, and shipping files are tracked to closure with documented exception records.",
    owner: "Operations"
  }
];

const riskItems = [
  {
    title: "Lifecycle mismatch",
    signal: "Selected platform enters discontinuation risk window within client deployment horizon.",
    control: "Lifecycle statement review and optional alternate BOM plan."
  },
  {
    title: "Interface incompatibility",
    signal: "On-site peripherals require connectors or protocols outside baseline specification.",
    control: "Interface mapping review before sample release."
  },
  {
    title: "Thermal or environmental failure",
    signal: "Operating profile exceeds tested temperature or humidity range.",
    control: "Early environment declaration and model selection against rated range."
  },
  {
    title: "Inadequate field support expectation",
    signal: "Project assumes local overseas onsite support not contractually defined.",
    control: "Written support matrix listing remote and onsite responsibilities."
  }
];

export default function IndustrialComputersPage() {
  return (
    <>
      <PageIntro
        title="Industrial Computers & Embedded Systems"
        description="This service line supports technical buyers requiring stable industrial hardware supply from China. Execution emphasizes baseline control, revision traceability, and deployment-fit documentation."
        facts={[
          { label: "Typical clients", value: "System integrators, OEM teams, technical distributors" },
          { label: "Common products", value: "Fanless IPC, panel PC, embedded boards, edge gateways" },
          { label: "Control priority", value: "Revision traceability and lifecycle clarity" },
          { label: "Delivery mode", value: "Sample phase + batch procurement" }
        ]}
      />

      <SectionBlock
        title="Supply Scope"
        summary="The following categories are commonly supported. Final availability is confirmed against project requirements."
      >
        <DataTable
          columns={["Category", "Typical specification range", "Use case", "Lead-time reference"]}
          rows={[
            ["Fanless box IPC", "Intel/ARM platforms, multi-I/O options", "Industrial control and gateway applications", "4 to 8 weeks"],
            ["Panel PC", "7-inch to 21-inch industrial touch displays", "HMI and production line interface", "5 to 9 weeks"],
            ["Embedded motherboard", "Mini-ITX and custom carrier options", "Device integration and compact systems", "4 to 10 weeks"],
            ["Accessory modules", "Power supplies, brackets, expansion modules", "System completion and deployment support", "2 to 6 weeks"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Engineering Delivery Workflow"
        summary="Technical projects run through a defined path to avoid post-order specification conflict."
      >
        <ProcessTimeline steps={technicalSteps} />
      </SectionBlock>

      <SectionBlock
        title="Technical File Control"
        summary="Project closure includes documented references that support batch consistency and field deployment."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Baseline specification sheet with interface, voltage, and expansion notes.</li>
          <li>Revision reference for hardware and firmware when provided by manufacturer.</li>
          <li>Packing and labeling file aligned with installation site logistics requirements.</li>
          <li>Issue log for approved deviations from original baseline.</li>
        </ul>
      </SectionBlock>

      <SectionBlock
        title="Reliability Controls and Project Limits"
        summary="Controls focus on lifecycle, compatibility, and documented support boundaries."
      >
        <RiskGrid items={riskItems} />
        <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Custom industrial design and certification engineering are not included unless separately scoped.</li>
          <li>Long-term spare stock strategy requires explicit forecasting by the buyer.</li>
          <li>Site commissioning outside China is coordinated only if contract terms include this service.</li>
          <li>Performance under non-declared extreme operating conditions is outside warranty commitment.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
