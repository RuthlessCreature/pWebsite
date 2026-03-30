import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPANY } from "@/lib/company";
import { getLocalizedPath, getStaticLocaleParams } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/site";
import { getPathForRoute, requireLocale } from "@/lib/i18n/server";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return getStaticLocaleParams();
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = requireLocale(params.locale);
  const dictionary = getDictionary(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${COMPANY.website}/#organization`,
        name: COMPANY.shortName,
        legalName: COMPANY.legalName,
        url: COMPANY.website,
        logo: `${COMPANY.website}/logo.svg`,
        areaServed: ["Europe", "North America", "Asia Pacific"],
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
          "@type": "PostalAddress",
          ...COMPANY.address
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: COMPANY.phone,
            email: COMPANY.email,
            areaServed: ["Europe", "North America", "Asia Pacific"],
            availableLanguage: ["English", "Chinese", "Japanese", "Russian", "Spanish", "Portuguese"]
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${COMPANY.website}/#website`,
        url: COMPANY.website,
        name: COMPANY.shortName,
        publisher: {
          "@id": `${COMPANY.website}/#organization`
        },
        inLanguage: locale
      },
      {
        "@type": "ItemList",
        "@id": `${COMPANY.website}/#service-list`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dictionary.pages["products-3c-export"].hero.title,
            url: `${COMPANY.website}${getLocalizedPath(locale, getPathForRoute("products-3c-export"))}`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dictionary.pages["products-industrial-computers"].hero.title,
            url: `${COMPANY.website}${getLocalizedPath(locale, getPathForRoute("products-industrial-computers"))}`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: dictionary.pages["sourcing-service"].hero.title,
            url: `${COMPANY.website}${getLocalizedPath(locale, getPathForRoute("sourcing-service"))}`
          },
          {
            "@type": "ListItem",
            position: 4,
            name: dictionary.pages["visa-relocation"].hero.title,
            url: `${COMPANY.website}${getLocalizedPath(locale, getPathForRoute("visa-relocation"))}`
          },
          {
            "@type": "ListItem",
            position: 5,
            name: dictionary.pages["recruitment-service"].hero.title,
            url: `${COMPANY.website}${getLocalizedPath(locale, getPathForRoute("recruitment-service"))}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SiteHeader
        locale={locale}
        languageLabel={dictionary.header.languageLabel}
        strapline={dictionary.header.strapline}
        secondaryActionLabel={dictionary.header.secondaryActionLabel}
        primaryActionLabel={dictionary.header.primaryActionLabel}
        navItems={dictionary.navItems}
      />
      <main>{children}</main>
      <SiteFooter
        locale={locale}
        badge={dictionary.footer.badge}
        title={dictionary.footer.title}
        description={dictionary.footer.description}
        contactTitle={dictionary.footer.contactTitle}
        pagesTitle={dictionary.footer.pagesTitle}
        responseTarget={dictionary.footer.responseTarget}
        legalNote={dictionary.footer.legalNote}
        navItems={dictionary.navItems}
      />
      <JsonLd data={organizationSchema} />
    </>
  );
}
