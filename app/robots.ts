import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteIsIndexable = process.env.SITE_INDEXABLE === "true";

  if (!siteIsIndexable) {
    return {
      rules: {
        userAgent: "*",
        allow: "/sitemap.xml",
        disallow: "/",
      },
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: siteConfig.url,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
