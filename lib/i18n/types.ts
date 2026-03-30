import type { Locale, RouteKey, SitePath } from "@/lib/i18n/config";

export type LocalizedLink = {
  label: string;
  href: SitePath;
};

export type HeroFact = {
  label: string;
  value: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  facts?: HeroFact[];
  primaryAction?: LocalizedLink;
  secondaryAction?: LocalizedLink;
};

export type SectionHeading = {
  badge: string;
  title: string;
  summary?: string;
};

export type TimelineStep = {
  title: string;
  detail: string;
  owner?: string;
};

export type RiskItem = {
  title: string;
  signal: string;
  control: string;
};

export type DataTableContent = {
  columns: string[];
  rows: string[][];
};

export type MetadataContent = {
  title: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  summary: string;
  accent: string;
  links: LocalizedLink[];
};

export type SupportingCard = {
  badge: string;
  title: string;
  description: string;
  bullets?: string[];
  primaryAction?: LocalizedLink;
  secondaryAction?: LocalizedLink;
};

export type PrincipleItem = {
  title: string;
  summary: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TrackCard = {
  badge: string;
  title: string;
  description: string;
  link: LocalizedLink;
};

export type ContactCard = {
  badge: string;
  title: string;
  value: string;
  href: string;
  description: string;
};

export type HomePageContent = {
  metadata: MetadataContent;
  hero: HeroContent;
  serviceSection: SectionHeading;
  serviceGroups: ServiceGroup[];
  bestFit: SupportingCard;
  processSection: SectionHeading;
  processSteps: TimelineStep[];
  operatingPrinciples: PrincipleItem[];
  riskSection: SectionHeading;
  riskItems: RiskItem[];
  boundariesBadge: string;
  boundaryPoints: string[];
  faqBadge: string;
  faq: FaqItem[];
};

export type AboutPageContent = {
  metadata: MetadataContent;
  hero: HeroContent;
  coverageSection: SectionHeading;
  coverageItems: string[];
  processSection: SectionHeading;
  processSteps: TimelineStep[];
  controlSection: SectionHeading;
  controlItems: RiskItem[];
  boundarySection: SectionHeading;
  boundaryPoints: string[];
};

export type ProductsPageContent = {
  metadata: MetadataContent;
  hero: HeroContent;
  tracksSection: SectionHeading;
  tracks: TrackCard[];
  workflowSection: SectionHeading;
  workflowSteps: TimelineStep[];
  documentSection: SectionHeading;
  documentTable: DataTableContent;
  riskSection: SectionHeading;
  riskItems: RiskItem[];
  boundaryPoints: string[];
};

export type ContactPageContent = {
  metadata: MetadataContent;
  hero: HeroContent;
  directSection: SectionHeading;
  directCards: ContactCard[];
  inquirySection: SectionHeading;
  inquiryTable: DataTableContent;
  controlSection: SectionHeading;
  controlItems: RiskItem[];
  boundaryPoints: string[];
};

export type ServicePageContent = {
  metadata: MetadataContent;
  hero: HeroContent;
  firstSection: SectionHeading;
  firstTable?: DataTableContent;
  firstList?: string[];
  processSection: SectionHeading;
  processSteps: TimelineStep[];
  thirdSection: SectionHeading;
  thirdList?: string[];
  thirdRiskItems?: RiskItem[];
  fourthSection: SectionHeading;
  fourthRiskItems?: RiskItem[];
  fourthList?: string[];
};

export type SiteDictionary = {
  locale: Locale;
  navItems: LocalizedLink[];
  header: {
    strapline: string;
    languageLabel: string;
    secondaryActionLabel: string;
    primaryActionLabel: string;
  };
  footer: {
    badge: string;
    title: string;
    description: string;
    contactTitle: string;
    pagesTitle: string;
    responseTarget: string;
    legalNote: string;
  };
  common: {
    ownerLabel: string;
    riskBadge: string;
    signalLabel: string;
    controlLabel: string;
    openDetailsLabel: string;
  };
  pages: {
    home: HomePageContent;
    about: AboutPageContent;
    products: ProductsPageContent;
    contact: ContactPageContent;
    "sourcing-service": ServicePageContent;
    "visa-relocation": ServicePageContent;
    "recruitment-service": ServicePageContent;
    "products-3c-export": ServicePageContent;
    "products-industrial-computers": ServicePageContent;
  };
};

export type DictionaryPageMap = SiteDictionary["pages"];
export type DictionaryPageContent<Key extends RouteKey> = DictionaryPageMap[Key];
