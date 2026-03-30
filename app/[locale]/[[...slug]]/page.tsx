import Link from "next/link";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { RiskGrid } from "@/components/RiskGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { buildMetadata } from "@/lib/metadata";
import {
  LOCALES,
  ROUTES,
  getLocalizedPath,
  getRouteKeyFromSlug,
  type Locale,
  type RouteKey,
  type SitePath
} from "@/lib/i18n/config";
import { getPageKeywords, getDictionary } from "@/lib/i18n/site";
import { getPathForRoute, requireLocale } from "@/lib/i18n/server";
import { buildBreadcrumbSchema, buildItemListSchema, buildServiceSchema, buildWebPageSchema, toAbsoluteUrl } from "@/lib/seo";
import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  ProductsPageContent,
  ServicePageContent,
  SiteDictionary
} from "@/lib/i18n/types";

type LocalePageProps = {
  params: {
    locale: string;
    slug?: string[];
  };
};

type BreadcrumbItem = {
  label: string;
  href: string;
};

function localizePath(locale: Locale, href: SitePath) {
  return getLocalizedPath(locale, href);
}

function localizeAction(locale: Locale, action?: { label: string; href: SitePath }) {
  return action ? { label: action.label, href: localizePath(locale, action.href) } : undefined;
}

function getRouteLabel(dictionary: SiteDictionary, path: SitePath, fallback: string) {
  return dictionary.navItems.find((item) => item.href === path)?.label ?? fallback;
}

function getBreadcrumbItems(locale: Locale, routeKey: RouteKey, dictionary: SiteDictionary): BreadcrumbItem[] {
  const home = {
    label: getRouteLabel(dictionary, "/", dictionary.pages.home.metadata.title),
    href: localizePath(locale, "/")
  };

  if (routeKey === "home") {
    return [home];
  }

  if (routeKey === "products-3c-export" || routeKey === "products-industrial-computers") {
    return [
      home,
      {
        label: getRouteLabel(dictionary, "/products", dictionary.pages.products.metadata.title),
        href: localizePath(locale, "/products")
      },
      {
        label: dictionary.pages[routeKey].metadata.title,
        href: localizePath(locale, getPathForRoute(routeKey))
      }
    ];
  }

  return [
    home,
    {
      label: dictionary.pages[routeKey].metadata.title,
      href: localizePath(locale, getPathForRoute(routeKey))
    }
  ];
}

function buildFaqSchema(content: HomePageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function buildPageSchemas(locale: Locale, routeKey: RouteKey, dictionary: SiteDictionary) {
  const path = getPathForRoute(routeKey);
  const content = dictionary.pages[routeKey];
  const url = toAbsoluteUrl(localizePath(locale, path));
  const breadcrumbs = routeKey === "home" ? [] : getBreadcrumbItems(locale, routeKey, dictionary);
  const breadcrumbId = breadcrumbs.length > 0 ? `${url}#breadcrumb` : undefined;
  const pageType = routeKey === "about" ? "AboutPage" : routeKey === "contact" ? "ContactPage" : routeKey === "products" ? "CollectionPage" : "WebPage";
  const schemas: Array<Record<string, unknown>> = [
    buildWebPageSchema({
      url,
      title: content.metadata.title,
      description: content.metadata.description,
      locale,
      type: pageType,
      breadcrumbId
    })
  ];

  if (breadcrumbId) {
    schemas.push(
      buildBreadcrumbSchema(
        breadcrumbId,
        breadcrumbs.map((item) => ({
          name: item.label,
          url: toAbsoluteUrl(item.href)
        }))
      )
    );
  }

  if (routeKey === "home") {
    schemas.push(
      buildItemListSchema({
        id: `${url}#services`,
        url,
        title: dictionary.pages.home.serviceSection.title,
        description: dictionary.pages.home.serviceSection.summary,
        items: dictionary.pages.home.serviceGroups.flatMap((group) =>
          group.links.map((link) => ({
            name: link.label,
            url: toAbsoluteUrl(localizePath(locale, link.href)),
            description: group.summary
          }))
        )
      })
    );
    schemas.push(buildFaqSchema(dictionary.pages.home));
  }

  if (routeKey === "products") {
    schemas.push(
      buildItemListSchema({
        id: `${url}#catalog`,
        url,
        title: dictionary.pages.products.tracksSection.title,
        description: dictionary.pages.products.tracksSection.summary,
        items: dictionary.pages.products.tracks.map((track) => ({
          name: track.title,
          url: toAbsoluteUrl(localizePath(locale, track.link.href)),
          description: track.description
        }))
      })
    );
  }

  if (
    routeKey === "sourcing-service" ||
    routeKey === "visa-relocation" ||
    routeKey === "recruitment-service" ||
    routeKey === "products-3c-export" ||
    routeKey === "products-industrial-computers"
  ) {
    schemas.push(
      buildServiceSchema({
        url,
        title: content.metadata.title,
        description: content.metadata.description,
        locale
      })
    );
  }

  return schemas;
}

function renderList(items: string[]) {
  return (
    <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-slate-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function renderServicePage(
  content: ServicePageContent,
  ownerLabel: string,
  riskLabels: { badge: string; signalLabel: string; controlLabel: string },
  breadcrumbs?: BreadcrumbItem[]
) {
  return (
    <>
      <PageIntro
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={breadcrumbs}
        facts={content.hero.facts}
      />

      <SectionBlock badge={content.firstSection.badge} title={content.firstSection.title} summary={content.firstSection.summary}>
        {content.firstTable ? <DataTable columns={content.firstTable.columns} rows={content.firstTable.rows} /> : null}
        {content.firstList ? renderList(content.firstList) : null}
      </SectionBlock>

      <SectionBlock badge={content.processSection.badge} title={content.processSection.title} summary={content.processSection.summary}>
        <ProcessTimeline steps={content.processSteps} ownerLabel={ownerLabel} />
      </SectionBlock>

      <SectionBlock badge={content.thirdSection.badge} title={content.thirdSection.title} summary={content.thirdSection.summary}>
        {content.thirdRiskItems ? (
          <RiskGrid
            items={content.thirdRiskItems}
            badge={riskLabels.badge}
            signalLabel={riskLabels.signalLabel}
            controlLabel={riskLabels.controlLabel}
          />
        ) : null}
        {content.thirdList ? renderList(content.thirdList) : null}
      </SectionBlock>

      <SectionBlock badge={content.fourthSection.badge} title={content.fourthSection.title} summary={content.fourthSection.summary}>
        {content.fourthRiskItems ? (
          <RiskGrid
            items={content.fourthRiskItems}
            badge={riskLabels.badge}
            signalLabel={riskLabels.signalLabel}
            controlLabel={riskLabels.controlLabel}
          />
        ) : null}
        {content.fourthList ? <div className={content.fourthRiskItems ? "mt-8" : ""}>{renderList(content.fourthList)}</div> : null}
      </SectionBlock>
    </>
  );
}

function renderHome(locale: Locale, content: HomePageContent, ownerLabel: string, riskLabels: { badge: string; signalLabel: string; controlLabel: string }) {
  return (
    <>
      <PageIntro
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        primaryAction={localizeAction(locale, content.hero.primaryAction)}
        secondaryAction={localizeAction(locale, content.hero.secondaryAction)}
        facts={content.hero.facts}
      />

      <SectionBlock badge={content.serviceSection.badge} title={content.serviceSection.title} summary={content.serviceSection.summary}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="grid gap-5 md:grid-cols-3">
            {content.serviceGroups.map((group) => (
              <article key={group.title} className="soft-panel flex h-full flex-col rounded-[1.6rem] p-6">
                <span className="section-label bg-[rgba(139,58,43,0.08)] text-[color:var(--brand)]">{group.accent}</span>
                <h3 className="mt-4 font-display text-[2rem] font-semibold leading-none text-slate-950">{group.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{group.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      className="rounded-full border border-[rgba(16,36,61,0.12)] bg-white/75 px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-[rgba(139,58,43,0.24)] hover:text-[color:var(--brand)]"
                      href={localizePath(locale, link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
            <span className="section-label bg-[rgba(16,36,61,0.08)] text-[color:var(--navy)]">{content.bestFit.badge}</span>
            <h3 className="mt-5 font-display text-[2.3rem] font-semibold leading-none text-slate-950">{content.bestFit.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">{content.bestFit.description}</p>
            {content.bestFit.bullets ? renderList(content.bestFit.bullets) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {content.bestFit.primaryAction ? (
                <Link className="brand-button" href={localizePath(locale, content.bestFit.primaryAction.href)}>
                  {content.bestFit.primaryAction.label}
                </Link>
              ) : null}
              {content.bestFit.secondaryAction ? (
                <Link className="secondary-button" href={localizePath(locale, content.bestFit.secondaryAction.href)}>
                  {content.bestFit.secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </SectionBlock>

      <SectionBlock badge={content.processSection.badge} title={content.processSection.title} summary={content.processSection.summary}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ProcessTimeline steps={content.processSteps} ownerLabel={ownerLabel} />
          <div className="grid gap-5">
            {content.operatingPrinciples.map((item) => (
              <article key={item.title} className="soft-panel rounded-[1.5rem] p-6">
                <h3 className="font-display text-[1.9rem] font-semibold leading-none text-slate-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock badge={content.riskSection.badge} title={content.riskSection.title} summary={content.riskSection.summary}>
        <RiskGrid items={content.riskItems} badge={riskLabels.badge} signalLabel={riskLabels.signalLabel} controlLabel={riskLabels.controlLabel} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="soft-panel rounded-[1.6rem] p-6">
            <span className="section-label bg-[rgba(16,36,61,0.08)] text-[color:var(--navy)]">{content.boundariesBadge}</span>
            <div className="mt-5">{renderList(content.boundaryPoints)}</div>
          </div>
          <div className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
            <span className="section-label bg-[rgba(191,138,74,0.14)] text-[color:var(--brand)]">{content.faqBadge}</span>
            <div className="mt-5 grid gap-4">
              {content.faq.map((item) => (
                <article key={item.question} className="rounded-[1.3rem] border border-white/55 bg-white/70 p-5">
                  <h3 className="font-display text-[1.5rem] font-semibold leading-none text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionBlock>
    </>
  );
}

function renderAbout(
  content: AboutPageContent,
  ownerLabel: string,
  riskLabels: { badge: string; signalLabel: string; controlLabel: string },
  breadcrumbs?: BreadcrumbItem[]
) {
  return (
    <>
      <PageIntro
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={breadcrumbs}
        facts={content.hero.facts}
      />
      <SectionBlock badge={content.coverageSection.badge} title={content.coverageSection.title} summary={content.coverageSection.summary}>
        {renderList(content.coverageItems)}
      </SectionBlock>
      <SectionBlock badge={content.processSection.badge} title={content.processSection.title} summary={content.processSection.summary}>
        <ProcessTimeline steps={content.processSteps} ownerLabel={ownerLabel} />
      </SectionBlock>
      <SectionBlock badge={content.controlSection.badge} title={content.controlSection.title} summary={content.controlSection.summary}>
        <RiskGrid items={content.controlItems} badge={riskLabels.badge} signalLabel={riskLabels.signalLabel} controlLabel={riskLabels.controlLabel} />
      </SectionBlock>
      <SectionBlock badge={content.boundarySection.badge} title={content.boundarySection.title} summary={content.boundarySection.summary}>
        {renderList(content.boundaryPoints)}
      </SectionBlock>
    </>
  );
}

function renderProducts(
  locale: Locale,
  content: ProductsPageContent,
  ownerLabel: string,
  riskLabels: { badge: string; signalLabel: string; controlLabel: string },
  breadcrumbs?: BreadcrumbItem[]
) {
  return (
    <>
      <PageIntro
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={breadcrumbs}
        facts={content.hero.facts}
      />
      <SectionBlock badge={content.tracksSection.badge} title={content.tracksSection.title} summary={content.tracksSection.summary}>
        <div className="grid gap-5 md:grid-cols-2">
          {content.tracks.map((track) => (
            <article key={track.title} className="soft-panel rounded-[1.6rem] p-6">
              <span className="section-label bg-[rgba(139,58,43,0.08)] text-[color:var(--brand)]">{track.badge}</span>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-none text-slate-950">{track.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">{track.description}</p>
              <p className="mt-4">
                <Link className="brand-link text-sm font-semibold" href={localizePath(locale, track.link.href)}>
                  {track.link.label}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock badge={content.workflowSection.badge} title={content.workflowSection.title} summary={content.workflowSection.summary}>
        <ProcessTimeline steps={content.workflowSteps} ownerLabel={ownerLabel} />
      </SectionBlock>
      <SectionBlock badge={content.documentSection.badge} title={content.documentSection.title} summary={content.documentSection.summary}>
        <DataTable columns={content.documentTable.columns} rows={content.documentTable.rows} />
      </SectionBlock>
      <SectionBlock badge={content.riskSection.badge} title={content.riskSection.title} summary={content.riskSection.summary}>
        <RiskGrid items={content.riskItems} badge={riskLabels.badge} signalLabel={riskLabels.signalLabel} controlLabel={riskLabels.controlLabel} />
        <div className="mt-8">{renderList(content.boundaryPoints)}</div>
      </SectionBlock>
    </>
  );
}

function renderContact(
  content: ContactPageContent,
  riskLabels: { badge: string; signalLabel: string; controlLabel: string },
  breadcrumbs?: BreadcrumbItem[]
) {
  return (
    <>
      <PageIntro
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={breadcrumbs}
        facts={content.hero.facts}
      />
      <SectionBlock badge={content.directSection.badge} title={content.directSection.title} summary={content.directSection.summary}>
        <div className="grid gap-5 md:grid-cols-2">
          {content.directCards.map((card) => (
            <article key={card.title} className="soft-panel rounded-[1.6rem] p-6">
              <span className="section-label bg-[rgba(16,36,61,0.08)] text-[color:var(--navy)]">{card.badge}</span>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-none text-slate-950">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                <a className="brand-link font-semibold" href={card.href}>
                  {card.value}
                </a>
              </p>
              <p className="mt-3 text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock badge={content.inquirySection.badge} title={content.inquirySection.title} summary={content.inquirySection.summary}>
        <DataTable columns={content.inquiryTable.columns} rows={content.inquiryTable.rows} />
      </SectionBlock>
      <SectionBlock badge={content.controlSection.badge} title={content.controlSection.title} summary={content.controlSection.summary}>
        <RiskGrid items={content.controlItems} badge={riskLabels.badge} signalLabel={riskLabels.signalLabel} controlLabel={riskLabels.controlLabel} />
        <div className="mt-8">{renderList(content.boundaryPoints)}</div>
      </SectionBlock>
    </>
  );
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      locale,
      ...(route.path === "/" ? {} : { slug: route.path.slice(1).split("/") })
    }))
  );
}

export function generateMetadata({ params }: LocalePageProps) {
  const locale = requireLocale(params.locale);
  const routeKey = getRouteKeyFromSlug(params.slug);

  if (!routeKey) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const content = dictionary.pages[routeKey];

  return buildMetadata({
    locale,
    path: getPathForRoute(routeKey),
    title: content.metadata.title,
    description: content.metadata.description,
    keywords: getPageKeywords(locale, routeKey)
  });
}

export default function LocalizedPage({ params }: LocalePageProps) {
  const locale = requireLocale(params.locale);
  const routeKey = getRouteKeyFromSlug(params.slug);

  if (!routeKey) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const riskLabels = {
    badge: dictionary.common.riskBadge,
    signalLabel: dictionary.common.signalLabel,
    controlLabel: dictionary.common.controlLabel
  };
  const pageSchemas = buildPageSchemas(locale, routeKey, dictionary);
  const breadcrumbs = routeKey === "home" ? undefined : getBreadcrumbItems(locale, routeKey, dictionary);
  const withSeo = (content: JSX.Element) => (
    <>
      <JsonLd data={pageSchemas} />
      {content}
    </>
  );

  switch (routeKey as RouteKey) {
    case "home":
      return withSeo(renderHome(locale, dictionary.pages.home, dictionary.common.ownerLabel, riskLabels));
    case "about":
      return withSeo(renderAbout(dictionary.pages.about, dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "products":
      return withSeo(renderProducts(locale, dictionary.pages.products, dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "contact":
      return withSeo(renderContact(dictionary.pages.contact, riskLabels, breadcrumbs));
    case "sourcing-service":
      return withSeo(renderServicePage(dictionary.pages["sourcing-service"], dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "visa-relocation":
      return withSeo(renderServicePage(dictionary.pages["visa-relocation"], dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "recruitment-service":
      return withSeo(renderServicePage(dictionary.pages["recruitment-service"], dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "products-3c-export":
      return withSeo(renderServicePage(dictionary.pages["products-3c-export"], dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    case "products-industrial-computers":
      return withSeo(renderServicePage(dictionary.pages["products-industrial-computers"], dictionary.common.ownerLabel, riskLabels, breadcrumbs));
    default:
      notFound();
  }
}
