import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Search — ${seoConfig.siteName}`,
  description: "Search Louve — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/search` : undefined,
});

export default function SearchPage() {
  return <ComingSoon title="Search" />;
}
