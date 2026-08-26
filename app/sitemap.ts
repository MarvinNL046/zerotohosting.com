import type { MetadataRoute } from "next";
import { buildPublicSitemap } from "@/lib/public-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildPublicSitemap();
}
