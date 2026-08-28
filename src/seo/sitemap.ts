import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://trosregisteret.no",
      lastModified: new Date("2026-08-28"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://trosregisteret.no/personvern",
      lastModified: new Date("2026-08-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://trosregisteret.no/informasjonskapsler",
      lastModified: new Date("2026-08-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
