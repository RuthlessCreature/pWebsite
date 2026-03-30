import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.legalName,
    short_name: COMPANY.shortName,
    description: "China sourcing, export execution, relocation, and recruitment support for international teams.",
    start_url: "/en",
    display: "standalone",
    background_color: "#f6efe6",
    theme_color: "#10243d",
    categories: ["business", "trade", "logistics"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
