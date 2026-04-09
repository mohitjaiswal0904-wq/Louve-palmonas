import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Collections — ${seoConfig.siteName}`,
  description: "Explore Louve collections — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/collections` : undefined,
});

export default function CollectionsPage() {
  return <ComingSoon title="Collections" />;
}
