import { DataTable } from "@/components/DataTable";
import { PageIntro } from "@/components/PageIntro";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { COMPANY } from "@/lib/company";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact China Sourcing and Export Team",
  description:
    "Contact and structured inquiry intake for China sourcing, export, industrial hardware supply, relocation consulting, and recruitment services.",
  path: "/contact",
  keywords: [
    "contact china sourcing agent",
    "china export service inquiry",
    "zhuhai sourcing company contact"
  ]
});

const communicationControls = [
  {
    title: "Incomplete project brief",
    signal: "Inquiry omits critical details such as target quantity, destination market, or timeline.",
    control: "Use the intake checklist below to provide baseline information for accurate response."
  },
  {
    title: "Scope ambiguity at kickoff",
    signal: "Requested output is broad or undefined across multiple service lines.",
    control: "Break inquiry into modules and confirm priority with a written scope summary."
  },
  {
    title: "Delayed decision loops",
    signal: "Extended response gaps create production, recruitment, or submission timing risk.",
    control: "Nominate a primary contact and agree on response cadence at project start."
  },
  {
    title: "Version conflict in documents",
    signal: "Multiple files with overlapping names are sent without clear status.",
    control: "Issue a dated master document list and mark replaced versions explicitly."
  }
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Contact and Inquiry Intake"
        description="For accurate response and lead-time estimation, please provide a structured inquiry. This helps us assess feasibility, key risks, and required process steps before commitment."
        facts={[
          { label: "Contact person", value: "Nicole Fan" },
          { label: "Phone", value: COMPANY.phone },
          { label: "Email", value: COMPANY.email },
          { label: "Location", value: COMPANY.city }
        ]}
      />

      <SectionBlock title="Direct Contact" summary="Initial communication is handled through phone or email.">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">Phone</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              <a className="font-semibold text-brand-700 hover:text-brand-800" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
                {COMPANY.phone}
              </a>
            </p>
            <p className="mt-2 text-sm text-slate-600">Best for urgent clarification on active projects.</p>
          </article>
          <article className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">Email</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              <a className="font-semibold text-brand-700 hover:text-brand-800" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-slate-600">Best for document-based inquiries and formal requirement submission.</p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Recommended Inquiry Format"
        summary="Providing these fields in the first message shortens qualification time and improves quote accuracy."
      >
        <DataTable
          columns={["Field", "What to provide", "Why it matters"]}
          rows={[
            ["Service line", "Products, sourcing, visa-relocation, or recruitment", "Routes inquiry to correct execution team"],
            ["Target market or city", "Destination country or Chinese city for handling", "Defines compliance and process dependencies"],
            ["Quantity / timeline", "Expected volume and required completion date", "Supports feasibility and lead-time check"],
            ["Technical or profile requirements", "Product specs or candidate profile details", "Prevents early-stage mismatch"],
            ["Risk constraints", "Mandatory compliance, confidentiality, or budget limits", "Allows realistic scope planning"]
          ]}
        />
      </SectionBlock>

      <SectionBlock
        title="Communication Controls and Boundaries"
        summary="The following controls are used to keep communication precise and execution aligned."
      >
        <RiskGrid items={communicationControls} />
        <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          <li>Formal commitment starts only after written scope and commercial terms are confirmed.</li>
          <li>Response windows vary by inquiry complexity and document completeness.</li>
          <li>Confidential files should be shared only through agreed channels with named recipients.</li>
          <li>Out-of-scope requests can be assessed separately as additional modules.</li>
        </ul>
      </SectionBlock>
    </>
  );
}
