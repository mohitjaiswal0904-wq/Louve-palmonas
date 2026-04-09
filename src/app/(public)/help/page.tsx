import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Help — ${seoConfig.siteName}`,
  description: "Help & FAQs — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/help` : undefined,
});

export default function HelpPage() {
  return <ComingSoon title="Help" />;
}
