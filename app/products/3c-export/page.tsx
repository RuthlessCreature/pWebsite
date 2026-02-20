import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "3C Electronics Export Service from China",
  description:
    "Category scope, execution workflow, and risk controls for China-based 3C electronics export projects for overseas importers and distributors.",
  path: "/products/3c-export",
  keywords: [
    "3C export service China",
    "consumer electronics sourcing China",
    "electronics export documentation China",
    "China accessories wholesale export"
  ]
});

const processSteps = [
  {
    title: "Category and compliance requirement intake",
    detail:
      "Buyer confirms target markets, packaging language requirements, and required labeling or certification references before supplier matching.",
    owner: "Account manager"
  },
  {
    title: "Supplier quote and sample verification",
    detail:
      "Quoted models are screened for production consistency. Samples are checked against baseline function and appearance requirements.",
    owner: "Procurement + QC"
  },
  {
    title: "Production planning and QC checkpoints",
    detail:
      "Key dates are fixed for material readiness, pilot lot validation, and pre-shipment review to reduce late-stage quality risk.",
    owner: "Operations"
  },
  {
    title: "Shipment release and document handover",
    detail:
      "Commercial files, packing data, and shipment instruction alignment are finalized before cargo release.",
    owner: "Logistics coordinator"
  }
];

const riskItems = [
  {
    title: "Model substitution during production",
    signal: "Supplier proposes component replacement after PO confirmation.",
    control: "No substitution without written impact statement and customer approval."
  },
  {
    title: "Labeling non-conformance",
    signal: "Packaging text, barcode format, or safety labels do not match market requirements.",
    control: "Packaging artwork and carton marks are signed off before mass production."
  },
  {
    title: "Unstable batch quality",
    signal: "Defect rates increase between sample batch and shipment batch.",
    control: "Batch sampling protocol and shipment hold option until corrective action is completed."
  },
  {
    title: "Unexpected port-side delay",
    signal: "Late document correction request close to booking cutoff.",
    control: "Document freeze deadline before vessel booking and final pre-booking audit."
  }
];

export default function ThreeCExportPage() {
  return (
    <>
      <PageIntro
        title="3C Electronics Export"
        description="This service supports overseas buyers sourcing 3C electronics from China with controlled supplier selection, quality checkpoints, and export document management."
        facts={[
          { label: "Typical items", value: "Accessories, peripheral devices, selected consumer electronics" },
          { label: "Order style", value: "Wholesale and project orders" },
          { label: "Control focus", value: "Model consistency and document accuracy" },
          { label: "Output", value: "Shipment-ready product and document file set" }
        ]}
      />

      <SectionBlock
        title="Category Scope and Typical MOQ"
        summary="MOQ and lead time vary by item and manufacturing route. The table below reflects common working ranges."
      >
        <DataTable
          columns={["Category", "Common examples", "Typical MOQ", "Lead-time reference"]}
          rows={[
            ["Mobile accessories", "Chargers, cables, adapters, power banks", "1,000 to 3,000 units", "20 to 35 days"],
            ["Computer peripherals", "Keyboards, mice, hubs, docking accessories", "500 to 2,000 units", "25 to 40 days"],
            ["Audio accessories", "Headsets, TWS charging cases, speakers", "1,000 to 3,000 units", "25 to 45 days"],
            ["Smart home entry models", "Basic sensors and control modules", "500 to 1,500 units", "30 to 50 days"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Execution Process"
        summary="Each project moves through fixed checkpoints to align technical baseline, production quality, and shipment readiness."
      >
        <ProcessTimeline steps={processSteps} />
      </SectionBlock>

      <SectionBlock
        title="Documentation and Compliance Handling"
        summary="Export file quality is treated as part of delivery quality, not an administrative afterthought."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Commercial invoice and packing list are verified against PO line items and approved model identifiers.</li>
          <li>Shipping marks, carton labels, and pallet references are cross-checked before loading release.</li>
          <li>Customer-specific declaration formats are incorporated when provided before quotation freeze.</li>
          <li>Inspection records and shipment photos can be included in the closure package on request.</li>
        </ul>
      </SectionBlock>

      <SectionBlock
        title="Risk Signals and Service Limits"
        summary="The following controls reduce disputes and late-stage failures in cross-border 3C orders."
      >
        <RiskGrid items={riskItems} />
        <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Retail-scale single-piece orders are out of scope.</li>
          <li>Certification issuance remains with authorized bodies and cannot be guaranteed by an intermediary.</li>
          <li>Transit insurance terms are defined in contract and are not implied by default.</li>
          <li>Post-arrival local compliance obligations remain under importer responsibility.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
