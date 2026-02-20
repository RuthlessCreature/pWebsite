import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

const routes = [
  "/",
  "/products",
  "/products/3c-export",
  "/products/industrial-computers",
  "/sourcing-service",
  "/visa-relocation",
  "/recruitment-service",
  "/about",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-02-20T00:00:00.000Z");
  return routes.map((route) => ({
    url: `${COMPANY.website}${route}`,
    lastModified,
    changeFrequency: route === "/" || route === "/products" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/products" || route === "/sourcing-service" ? 0.9 : 0.8
  }));
}
