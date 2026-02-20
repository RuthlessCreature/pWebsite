# Pomerol International Corporate Website

Production-grade Next.js corporate website for:

**Pomerol International Trading (Zhuhai) Co., Ltd**

The site is built for operational credibility with restrained design, process clarity, and risk-aware content.

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Component-based page composition
- Route-level SEO metadata
- XML sitemap + robots route handlers

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
  about/page.tsx
  contact/page.tsx
  products/
    3c-export/page.tsx
    industrial-computers/page.tsx
    page.tsx
  recruitment-service/page.tsx
  sourcing-service/page.tsx
  visa-relocation/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  DataTable.tsx
  PageIntro.tsx
  ProcessTimeline.tsx
  RiskGrid.tsx
  SectionBlock.tsx
  SiteFooter.tsx
  SiteHeader.tsx
lib/
  company.ts
  metadata.ts
```

## SEO Metadata Example

- Global defaults in `app/layout.tsx`
- Route metadata in each page with `buildMetadata(...)`, for example:
  - `app/page.tsx`
  - `app/products/page.tsx`
  - `app/visa-relocation/page.tsx`

## Deployment and Operations

- Deployment runbook: `DEPLOYMENT.md`
- Ongoing content/process maintenance: `MAINTENANCE.md`
- Google SEO launch plan (keywords + backlinks): `SEO_GOOGLE_PLAYBOOK.md`

## Google Verification Env

To expose Search Console verification meta tag through Next metadata:

```bash
GOOGLE_SITE_VERIFICATION=your_token_here
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token_here
```
