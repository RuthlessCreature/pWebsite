import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/social-image/"],
        disallow: ["/api/"]
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "Slurp", "DuckDuckBot", "YandexBot", "Baiduspider"],
        allow: ["/", "/api/social-image/"],
        disallow: ["/api/"]
      }
    ],
    host: COMPANY.website,
    sitemap: `${COMPANY.website}/sitemap.xml`
  };
}
