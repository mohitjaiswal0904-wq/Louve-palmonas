import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Stores — ${seoConfig.siteName}`,
  description: "Stores — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/stores` : undefined,
});

export default function StoresPage() {
  return <ComingSoon title="Stores" />;
}
