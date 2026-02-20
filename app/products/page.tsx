import Link from "next/link";
import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "3C Export and Industrial Computer Supply from China",
  description:
    "Product supply capabilities for 3C electronics export and industrial computer systems from China, including quality checkpoints and export documentation control.",
  path: "/products",
  keywords: [
    "3C electronics exporter China",
    "industrial computer supplier China",
    "embedded hardware sourcing China",
    "China product procurement service"
  ]
});

const productTracks = [
  {
    title: "3C Electronics Export",
    description:
      "Consumer electronics accessories and selected device categories for overseas wholesale programs. Includes supplier alignment, inspection coordination, and export document pack.",
    link: "/products/3c-export"
  },
  {
    title: "Industrial Computers & Embedded Systems",
    description:
      "Fanless IPC, embedded boards, and related integration accessories for engineering and distribution channels. Includes technical baseline confirmation and lifecycle notes.",
    link: "/products/industrial-computers"
  }
];

const workflowSteps = [
  {
    title: "Specification and commercial alignment",
    detail:
      "Required product baseline, acceptance criteria, target market, and packaging requirements are checked before supplier quotation.",
    owner: "Sales engineering"
  },
  {
    title: "Supplier quotation and capacity screening",
    detail:
      "We screen for manufacturing stability, lead-time reliability, and ability to issue required documentation for export clearance.",
    owner: "Procurement"
  },
  {
    title: "Pre-shipment control and final confirmation",
    detail:
      "Sampling, labeling check, and shipping mark confirmation are completed prior to final dispatch and file handover.",
    owner: "Quality control"
  }
];

const riskItems = [
  {
    title: "Incorrect product declaration",
    signal: "Product description in shipping documents does not match PO or specification sheet.",
    control: "Final document reconciliation before shipment booking."
  },
  {
    title: "Lead-time slippage",
    signal: "Factory planning conflicts or missing critical components near production start.",
    control: "Milestone updates with early warning and alternate supplier path when needed."
  },
  {
    title: "Quality inconsistency between batches",
    signal: "Variation in packaging, firmware version, or hardware revision across lots.",
    control: "Batch-level checklists and reference sample signoff before mass release."
  },
  {
    title: "Unclear post-delivery expectation",
    signal: "No agreed process for defect reporting or replacement handling.",
    control: "Written after-sales scope and response timeline in contract annex."
  }
];

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Product Supply Programs"
        description="The product division covers two delivery tracks: 3C electronics export and industrial computers. Both tracks use written specification baselines, supplier verification, and export documentation controls."
        facts={[
          { label: "Supply model", value: "Project-based and recurring order programs" },
          { label: "Quality control", value: "Pre-shipment verification checkpoints" },
          { label: "Documents", value: "Commercial + logistics file package" },
          { label: "Coverage", value: "SME import and technical distribution channels" }
        ]}
      />

      <SectionBlock title="Product Tracks" summary="Choose the relevant product track based on category and technical complexity.">
        <div className="grid gap-5 md:grid-cols-2">
          {productTracks.map((track) => (
            <article key={track.title} className="border border-slate-200 p-5">
              <h2 className="text-xl font-semibold text-slate-900">{track.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{track.description}</p>
              <p className="mt-4">
                <Link className="text-sm font-semibold text-brand-700 hover:text-brand-800" href={track.link}>
                  Open service details
                </Link>
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Common Product Workflow"
        summary="The same control structure is used for both product tracks to reduce delivery variance."
      >
        <ProcessTimeline steps={workflowSteps} />
      </SectionBlock>

      <SectionBlock
        title="Standard Document Package"
        summary="Document items may vary by country or customer contract, but the following set is the baseline."
      >
        <DataTable
          columns={["Document", "Purpose", "Prepared by"]}
          rows={[
            ["Commercial Invoice", "Declares transaction value and cargo description", "Supplier + reviewed by operations"],
            ["Packing List", "Confirms quantity, weight, and package structure", "Supplier + verified before release"],
            ["Specification Sheet", "Records technical baseline and revision reference", "Engineering or product manager"],
            ["Inspection Record", "Captures sampling checks and acceptance status", "QC coordinator"],
            ["Shipping Instruction File", "Aligns consignee data, marks, and route details", "Operations coordinator"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Risk Control and Boundaries"
        summary="Execution quality depends on complete technical input and timely customer confirmation at milestone gates."
      >
        <RiskGrid items={riskItems} />
        <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Minimum order quantity and lead-time commitments are supplier and category dependent.</li>
          <li>Special certification requirements must be declared before quotation, not after production starts.</li>
          <li>Freight, insurance, and customs terms are finalized in contract according to selected incoterm.</li>
          <li>Product warranty handling follows the agreed service appendix and is not open-ended.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
