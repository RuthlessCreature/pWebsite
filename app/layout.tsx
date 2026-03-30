import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { COMPANY } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/site";
import { DEFAULT_LOCALE, LOCALE_META, normalizeLocale } from "@/lib/i18n/config";
import { ROBOTS_POLICY, buildOrganizationSchema, buildVerificationMetadata, buildWebsiteSchema } from "@/lib/seo";

const bodyFont = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  robots: ROBOTS_POLICY,
  verification: buildVerificationMetadata()
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = normalizeLocale(headers().get("x-locale")) ?? DEFAULT_LOCALE;
  const dictionary = getDictionary(locale);
  const siteSchemas = [buildOrganizationSchema(locale, dictionary.footer.description), buildWebsiteSchema(locale, dictionary.footer.description)];

  return (
    <html lang={LOCALE_META[locale].htmlLang} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <div className="relative isolate overflow-x-hidden">
          <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(117,40,25,0.2),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(190,142,76,0.18),_transparent_24%)]" />
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[28rem] bg-[radial-gradient(circle_at_bottom_right,_rgba(14,35,57,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(127,61,37,0.1),_transparent_28%)]" />
          <div className="relative z-10">
            <JsonLd data={siteSchemas} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
