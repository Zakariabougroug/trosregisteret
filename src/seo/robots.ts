import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://trosregisteret.no/sitemap.xml",
    host: "https://trosregisteret.no",
  };
}
