# Pomerol International Corporate Website

Production-grade Next.js corporate website for:

**Pomerol International Trading (Zhuhai) Co., Ltd**

The site is built for operational credibility with restrained design, process clarity, and risk-aware content.

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Component-based page composition
- Locale-prefixed multilingual routing
- Route-level SEO metadata
- XML sitemap + robots route handlers
- Structured data + dynamic social share images

## Local Development

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build and Production Run

```bash
npm run build
npm run start
```

## Environment Variables

Use `.env.example` as the reference template.

Supported webmaster verification variables:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`
- `BAIDU_SITE_VERIFICATION`
- `YANDEX_SITE_VERIFICATION`
- `NAVER_SITE_VERIFICATION`
- `YAHOO_SITE_VERIFICATION`

## Windows Path-Case Note

If you open the same folder with different casing (for example `E:\PWEBSITE` and `E:\pWebsite`), Next.js can load duplicate modules and throw hydration errors such as `Missing ActionQueueContext`.

- Scripts in `package.json` now run through `scripts/next-runner.mjs` to normalize to the canonical path first.
- If this happened before, clear cache once and restart:

```bash
rmdir /s /q .next
npm run dev
```

## Project Structure

```text
app/
  [locale]/[[...slug]]/page.tsx
  api/social-image/[locale]/[[...slug]]/route.tsx
  globals.css
  layout.tsx
  manifest.ts
  robots.ts
  sitemap.ts
  icon.svg
components/
  Breadcrumbs.tsx
  DataTable.tsx
  LanguageSwitcher.tsx
  PageIntro.tsx
  ProcessTimeline.tsx
  RiskGrid.tsx
  SectionBlock.tsx
  SiteFooter.tsx
  SiteHeader.tsx
lib/
  company.ts
  i18n/
  metadata.ts
  seo.ts
  social-image.tsx
middleware.ts
```

## SEO Highlights

- Global metadata defaults in `app/layout.tsx`
- Per-route metadata in `app/[locale]/[[...slug]]/page.tsx`
- `hreflang` alternates in `app/sitemap.ts`
- `robots.txt` in `app/robots.ts`
- Dynamic share images in `app/api/social-image/[locale]/[[...slug]]/route.tsx`
- Localized keywords in `lib/i18n/site.ts`

## Deployment and Operations

- Deployment runbook: `DEPLOYMENT.md`
- Ongoing content/process maintenance: `MAINTENANCE.md`
- SEO launch, checklist, and webmaster setup: `SEO_SOP.md`
