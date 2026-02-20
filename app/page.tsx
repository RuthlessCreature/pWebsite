import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "China Sourcing Agent and Export Service Partner",
  description:
    "Pomerol International supports overseas buyers with China sourcing services, 3C electronics export, industrial computer supply, visa-relocation consulting, and recruitment execution.",
  path: "/",
  keywords: [
    "China sourcing company",
    "China sourcing agent for SMEs",
    "China export management service",
    "industrial computer sourcing China",
    "China relocation and recruitment support"
  ]
});

const portfolioItems = [
  {
    title: "3C Electronics Export",
    scope: "Accessory and consumer device procurement, quality control, and export document handling for SME importers.",
    clients: "Importers, distributors, retail chain buyers",
    href: "/products/3c-export"
  },
  {
    title: "Industrial Computers & Embedded Systems",
    scope: "Supply of fanless IPC, panel PC, and embedded hardware with documentation and lifecycle notes.",
    clients: "OEM teams, system integrators, technical distributors",
    href: "/products/industrial-computers"
  },
  {
    title: "China Supplier Sourcing Service",
    scope: "Supplier discovery, background verification, quotation alignment, and production oversight support.",
    clients: "Overseas SMEs and procurement managers",
    href: "/sourcing-service"
  },
  {
    title: "Visa & Relocation Consulting",
    scope: "Case pre-check, documentation preparation support, and process coordination for incoming professionals.",
    clients: "Foreign employees, employers, HR teams",
    href: "/visa-relocation"
  },
  {
    title: "Recruitment / Job Agent Service",
    scope: "Role brief alignment, candidate screening support, and onboarding process coordination in China.",
    clients: "Companies hiring in China and relocating professionals",
    href: "/recruitment-service"
  }
];

const processSteps = [
  {
    title: "Requirement intake and scope lock",
    detail:
      "Commercial targets, technical specifications, lead-time expectations, and mandatory compliance requirements are captured before quotation.",
    owner: "Account lead"
  },
  {
    title: "Feasibility and risk pre-check",
    detail:
      "We run a practical pre-check covering supplier capability, documentation complexity, and execution constraints to avoid scope mismatch.",
    owner: "Operations"
  },
  {
    title: "Execution plan and milestone confirmation",
    detail:
      "A written delivery plan is issued with milestone dates, responsible parties, exception handling method, and reporting cadence.",
    owner: "Project coordinator"
  },
  {
    title: "Controlled execution and updates",
    detail:
      "Status updates are provided per milestone. Scope changes, quality exceptions, and document changes are tracked and acknowledged in writing.",
    owner: "Delivery team"
  },
  {
    title: "Delivery file and closure",
    detail:
      "At completion, we deliver the agreed document pack and closure summary, including open items and recommended follow-up actions.",
    owner: "Project coordinator"
  }
];

const riskItems = [
  {
    title: "Supplier authenticity and capacity",
    signal: "Factory profile inconsistency, unclear legal entity, or unstable delivery records.",
    control: "Business license verification, production capacity checks, and cross-validation of shipping history before engagement."
  },
  {
    title: "Export document completeness",
    signal: "Missing HS references, unclear invoice description, or inconsistent packing information.",
    control: "Document checklist before shipment booking and final cross-check against purchase order and packing data."
  },
  {
    title: "Technical specification drift",
    signal: "Sample performance differs from agreed baseline or undocumented BOM changes appear during production.",
    control: "Version-controlled specification sheet and explicit written approval before any substitution."
  },
  {
    title: "Immigration or hiring expectation mismatch",
    signal: "Unclear policy interpretation, missing applicant documentation, or unrealistic timeline assumptions.",
    control: "Early eligibility pre-check and written clarification of what is in scope versus authority-controlled decisions."
  }
];

const boundaryPoints = [
  "We work on contract-defined scope only and do not represent undocumented capabilities.",
  "Government approvals, customs release outcomes, and third-party certifications remain under authority or issuer control.",
  "Pricing is valid only for the stated quantity, technical baseline, and incoterm assumptions.",
  "Confidential documents are shared through controlled channels and only with designated contacts."
];

const homeFaq = [
  {
    question: "Do you provide end-to-end China sourcing service for overseas SME buyers?",
    answer:
      "Yes. We cover requirement intake, supplier verification, quotation normalization, pilot execution support, and final delivery file handover under a written scope."
  },
  {
    question: "Can you handle both 3C electronics export and industrial computer sourcing?",
    answer:
      "Yes. We support both consumer-facing 3C categories and industrial/embedded hardware programs with category-specific quality and documentation controls."
  },
  {
    question: "How do you control sourcing risk when selecting China suppliers?",
    answer:
      "We use legal entity checks, capacity assessment, quotation assumption review, and milestone-based exception logging before recommending final suppliers."
  },
  {
    question: "Do you guarantee visa approval or customs clearance outcomes?",
    answer:
      "No. Approvals and release decisions remain with government authorities and customs systems. We provide process support and document-preparation control."
  },
  {
    question: "What is the fastest way to start a project inquiry?",
    answer:
      "Send service line, target market, volume/timeline, specification baseline, and constraints by email. A qualification response is typically issued within one business day."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageIntro
        title="Cross-Border Supply and China Operations Support"
        description="Pomerol International Trading (Zhuhai) Co., Ltd supports overseas clients with product supply, sourcing execution, relocation consulting, and recruitment coordination in China. Delivery is managed through written scope, milestone control, and documented handover."
        facts={[
          { label: "Entity", value: "China-registered operating company" },
          { label: "Primary clients", value: "Overseas SMEs and technical buyers" },
          { label: "Execution style", value: "Process-led and documentation-driven" },
          { label: "Response target", value: "Initial qualification reply within 1 business day" }
        ]}
      />

      <SectionBlock
        title="Service Portfolio"
        summary="Each service line is delivered with clearly stated scope, process stages, and risk controls."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <article key={item.title} className="border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.scope}</p>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Typical users:</span> {item.clients}
              </p>
              <p className="mt-4">
                <Link className="text-sm font-semibold text-brand-700 hover:text-brand-800" href={item.href}>
                  View detailed process
                </Link>
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Execution Method"
        summary="Projects are run through a fixed control sequence to keep expectations and outcomes aligned."
      >
        <ProcessTimeline steps={processSteps} />
      </SectionBlock>

      <SectionBlock
        title="Risk Control Signals"
        summary="The following controls are used to reduce common delivery risks for international clients."
      >
        <RiskGrid items={riskItems} />
      </SectionBlock>

      <SectionBlock
        title="Service Boundaries"
        summary="Clear boundaries are stated early to avoid over-commitment and late-stage execution conflict."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
          {boundaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        title="Frequently Asked Questions"
        summary="These are the most common pre-engagement questions from Google search and direct inbound inquiries."
      >
        <div className="space-y-5">
          {homeFaq.map((item) => (
            <article key={item.question} className="border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </SectionBlock>
    </>
  );
}
