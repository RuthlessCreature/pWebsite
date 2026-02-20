# Deployment Instructions

This project can be deployed on Vercel or any Node.js hosting platform that supports Next.js.

## Option A: Vercel (Recommended)

1. Push repository to Git provider.
2. Import repository in Vercel dashboard.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`
5. Output: default Next.js output.
6. Deploy.

### Domain and Metadata

- Update `website` value in `lib/company.ts` to your production domain.
- Redeploy so canonical URLs, sitemap, and robots links use the live domain.

## Option B: Self-Hosted Node.js

```bash
npm install
npm run build
npm run start
```

Default runtime port: `3000`.

Run behind a reverse proxy (Nginx/Caddy) for TLS termination and domain routing.

## Pre-Launch Checklist

- Verify all contact details in `lib/company.ts`.
- Confirm page copy matches current service scope and legal boundaries.
- Validate metadata titles/descriptions on key routes.
- Check mobile and desktop layouts.
- Submit `/sitemap.xml` to search console.
