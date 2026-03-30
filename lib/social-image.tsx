import type { CSSProperties } from "react";
import { COMPANY } from "@/lib/company";
import { getLocalizedPath, getPathForRoute, type Locale, type RouteKey } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/site";

const ROUTE_FALLBACK_TITLES: Record<RouteKey, string> = {
  home: "China Operations Partner",
  about: "About Pomerol International",
  products: "Products & Programs",
  contact: "Start Your China Request",
  "sourcing-service": "Sourcing Control",
  "visa-relocation": "Visa & Relocation",
  "recruitment-service": "Recruitment Support",
  "products-3c-export": "3C Export Program",
  "products-industrial-computers": "Industrial Computing"
};

const ROUTE_ACCENTS: Record<RouteKey, string> = {
  home: "Cross-border execution",
  about: "Company profile",
  products: "Programs overview",
  contact: "Direct response path",
  "sourcing-service": "Supplier screening",
  "visa-relocation": "Landing support",
  "recruitment-service": "Hiring delivery",
  "products-3c-export": "Electronics export",
  "products-industrial-computers": "Embedded supply"
};

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function containsNonLatinScript(text: string) {
  return /[\u0400-\u04ff\u3040-\u30ff\u3400-\u9fff\ua000-\ua4ff]/.test(text);
}

function getReadableTitle(locale: Locale, routeKey: RouteKey) {
  const title = getDictionary(locale).pages[routeKey].metadata.title.trim();
  return containsNonLatinScript(title) ? ROUTE_FALLBACK_TITLES[routeKey] : title;
}

function getReadableDescription(locale: Locale, routeKey: RouteKey) {
  const description = getDictionary(locale).pages[routeKey].metadata.description.trim();

  if (containsNonLatinScript(description)) {
    return truncateText(
      `${ROUTE_FALLBACK_TITLES[routeKey]} for teams that need a cleaner path into China sourcing, export delivery, relocation, or hiring.`,
      128
    );
  }

  return truncateText(description, 160);
}

function buildFactPills(locale: Locale, routeKey: RouteKey) {
  const facts = getDictionary(locale).pages[routeKey].hero.facts ?? [];
  return facts.slice(0, 3).map((item) => truncateText(item.value, 28));
}

export function renderSocialImage(locale: Locale, routeKey: RouteKey, width: number, height: number) {
  const title = getReadableTitle(locale, routeKey);
  const description = getReadableDescription(locale, routeKey);
  const accent = ROUTE_ACCENTS[routeKey];
  const localizedPath = getLocalizedPath(locale, getPathForRoute(routeKey));
  const factPills = buildFactPills(locale, routeKey);
  const canvasStyle: CSSProperties = {
    width,
    height,
    display: "flex",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #f7f0e7 0%, #fffaf4 45%, #eef3f8 100%)",
    color: "#0f172a",
    fontFamily: "Social Sans"
  };

  return (
    <div style={canvasStyle}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 12% 16%, rgba(139,58,43,0.18), transparent 24%), radial-gradient(circle at 88% 14%, rgba(16,36,61,0.14), transparent 26%), radial-gradient(circle at 82% 82%, rgba(191,138,74,0.16), transparent 24%)"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: 9999,
          background: "rgba(15, 23, 42, 0.08)"
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -90,
          bottom: -180,
          width: 360,
          height: 360,
          borderRadius: 9999,
          background: "rgba(139, 58, 43, 0.12)"
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "54px 58px",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  width: 74,
                  height: 74,
                  borderRadius: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#17324b",
                  color: "#ffffff",
                  fontSize: 38,
                  fontWeight: 700
                }}
              >
                P
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 17, letterSpacing: 4, textTransform: "uppercase", color: "#8b3a2b", fontWeight: 700 }}>
                  {accent}
                </div>
                <div style={{ fontSize: 28, color: "#10243d", fontWeight: 700 }}>{COMPANY.shortName}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 66, lineHeight: 1.02, fontWeight: 700 }}>{title}</div>
              <div style={{ maxWidth: 720, fontSize: 28, lineHeight: 1.42, color: "#475569" }}>{description}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {factPills.map((fact) => (
              <div
                key={fact}
                style={{
                  display: "flex",
                  borderRadius: 9999,
                  padding: "12px 18px",
                  background: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(16,36,61,0.08)",
                  color: "#334155",
                  fontSize: 21,
                  fontWeight: 600
                }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 265,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              padding: "12px 20px",
              background: "#ffffff",
              border: "1px solid rgba(16,36,61,0.08)",
              color: "#10243d",
              fontSize: 21,
              fontWeight: 700
            }}
          >
            {locale.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: 14,
              borderRadius: 28,
              padding: 24,
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(16,36,61,0.08)",
              backdropFilter: "blur(8px)"
            }}
          >
            <div style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#8b3a2b", fontWeight: 700 }}>StayChina.org</div>
            <div style={{ fontSize: 26, lineHeight: 1.25, color: "#0f172a", fontWeight: 700 }}>{COMPANY.city}</div>
            <div style={{ fontSize: 18, lineHeight: 1.5, color: "#475569" }}>{localizedPath}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
