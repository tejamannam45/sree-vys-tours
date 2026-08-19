import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS.websiteUrl;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
