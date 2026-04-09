import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // When you have the public frontend domain, fill it into seoConfig.siteUrl.
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!base) return [];

  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/collections`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
  ];
}
