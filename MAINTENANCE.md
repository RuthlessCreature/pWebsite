# Maintenance README

## Content Governance

Update content when any of the following changes:

- Service scope or operational boundaries
- Compliance or documentation requirements
- Contact person, phone, or email
- Process ownership or workflow stages

All updates should preserve:

- Factual, non-promotional tone
- Explicit risk disclosures
- Clear in-scope / out-of-scope boundaries
- Consistent terminology across pages

## Monthly Review Checklist

1. Verify contact details and response SLA statements.
2. Re-check product lead-time and MOQ references.
3. Revalidate sourcing and visa process notes against current practice.
4. Confirm no page contains startup-style promotional language.
5. Check canonical URLs and sitemap generation.

## Technical Maintenance

- Run `npm run lint` before release.
- Run `npm run typecheck` before release.
- Build with `npm run build` to validate production output.

## Content Locations

- Shared company identity: `lib/company.ts`
- Global SEO defaults: `app/layout.tsx`
- Route metadata helper: `lib/metadata.ts`
- Service page content: `app/**/page.tsx`

## Change Control

For any major change, record:

- What changed
- Why it changed
- Effective date
- Responsible owner

Store change notes in your project management system to keep auditability for client-facing commitments.
