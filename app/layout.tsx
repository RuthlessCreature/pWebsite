import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: `${COMPANY.shortName} | China Sourcing, Export, Relocation and Recruitment Services`,
    template: `%s | ${COMPANY.shortName}`
  },
  description:
    "Pomerol International Trading (Zhuhai) Co., Ltd provides China sourcing services, 3C electronics export, industrial computers and embedded systems supply, visa-relocation consulting, and recruitment support.",
  keywords: [
    "China sourcing services",
    "China sourcing agent",
    "China export services",
    "industrial computer supplier China",
    "embedded systems supplier China",
    "China sourcing process",
    "visa consulting China",
    "recruitment service China"
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/"
    }
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: `${COMPANY.shortName} | China Sourcing, Export, Relocation and Recruitment Services`,
    description:
      "Process-driven China sourcing and cross-border operations support for overseas SMEs, distributors, and technical buyers.",
    url: COMPANY.website,
    siteName: COMPANY.shortName,
    locale: COMPANY.locale,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: `${COMPANY.shortName} | China Sourcing and Export Services`,
    description: "China supplier sourcing, product export, relocation consulting, and recruitment process support."
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

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
          availableLanguage: ["English", "Chinese"]
        }
      ],
      knowsAbout: [
        "3C electronics export",
        "industrial computers and embedded systems",
        "supplier sourcing in China",
        "visa and relocation process support",
        "recruitment and job placement support"
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
      inLanguage: COMPANY.language
    },
    {
      "@type": "ItemList",
      "@id": `${COMPANY.website}/#service-list`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "3C Electronics Export",
          url: `${COMPANY.website}/products/3c-export`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industrial Computers and Embedded Systems",
          url: `${COMPANY.website}/products/industrial-computers`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "China Supplier Sourcing Service",
          url: `${COMPANY.website}/sourcing-service`
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Visa and Relocation Consulting",
          url: `${COMPANY.website}/visa-relocation`
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Recruitment and Job Agent Service",
          url: `${COMPANY.website}/recruitment-service`
        }
      ]
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
