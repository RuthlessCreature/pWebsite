## 2026-02-20
- First commit

## 2026-03-30
- Reworked the site visual system with new typography, warmer brand colors, layered backgrounds, and glass-style section framing
- Redesigned the shared header, footer, hero, section blocks, risk timeline, and data table components
- Upgraded the homepage plus key product and contact pages, then verified the refreshed layout locally in a browser
- Added locale-prefixed routing for `zh-cn`, `zh-tw`, `en`, `ja`, `ru`, `es`, and `pt`, with middleware-based language detection from region headers plus cookie override for manual switching
- Localized shared navigation, footer, metadata alternates, sitemap output, and the homepage or primary page surfaces across the supported locales
- Verified local redirects for `Accept-Language`, region-header selection, and manual cookie override, and kept the site running locally on port `3001`
- Restored the Japanese locale pack, expanded static locale route generation, removed legacy non-locale duplicate pages, and revalidated production build plus locale redirects on port `3002`
- Converted locale content into JSON dictionaries under `lib/i18n/locales/*.json` so future translation work can happen in data files instead of TypeScript modules
- Added `scripts/translate_locale_json.py` to auto-fill untranslated strings into locale JSON files and used it to expand deeper Spanish, Portuguese, and Russian page translations before rebuilding and verifying on port `3004`
- Manually polished the most visible Spanish and Portuguese JSON copy so home, about, sourcing, recruitment, contact, and product pages read more naturally
- Rebuilt the production bundle, relaunched local preview on port `3006`, and rechecked localized page output plus root redirect behavior
- Added crawl-facing SEO improvements including structured organization, website, breadcrumb, FAQ, item-list, and service JSON-LD plus visible breadcrumbs on inner pages
- Expanded sitemap output with locale alternates and `x-default`, added a web manifest route, and upgraded robots meta directives for richer snippet and image previews
- Rebuilt again, previewed on port `3007`, and verified `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, canonical links, hreflang tags, and per-page structured data output
- Added dynamic route-aware social share images under `/api/social-image/[locale]/[[...slug]]`, wired them into Open Graph and Twitter metadata, and verified previews locally on port `3010`
- Localized per-route keyword targeting for zh-cn, zh-tw, en, ja, ru, es, and pt so page metadata is no longer title-only outside English
- Tightened `robots.txt` so search engines can keep crawling site pages and social-share images while avoiding low-value non-page API endpoints
- Added `.env.example`, refreshed `README.md`, corrected the SEO SOP in UTF-8 Chinese, and updated the Google launch playbook so webmaster verification and sitemap submission are easier during deployment
- Consolidated the SEO deployment guidance into a single `SEO_SOP.md` so launch checks, webmaster verification, keyword mapping, and backlink steps now live in one operational document
- Added a checkbox-style launch checklist to `SEO_SOP.md` so the SEO rollout can be executed as a step-by-step runbook during deployment and the first 30 days
