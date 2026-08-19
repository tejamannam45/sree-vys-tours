import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BUSINESS.websiteUrl;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
