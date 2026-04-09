import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Contact — ${seoConfig.siteName}`,
  description: "Contact — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/contact` : undefined,
});

export default function ContactPage() {
  return <ComingSoon title="Contact" />;
}
