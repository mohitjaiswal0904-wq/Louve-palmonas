import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `About — ${seoConfig.siteName}`,
  description:
    "Louve comes from the French word for she-wolf — instinct, independence, protection, and quiet leadership.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/about` : undefined,
});

export default function AboutPage() {
  return <ComingSoon title="About" />;
}
