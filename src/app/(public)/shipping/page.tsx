import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Shipping — ${seoConfig.siteName}`,
  description: "Shipping & returns — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/shipping` : undefined,
});

export default function ShippingPage() {
  return <ComingSoon title="Shipping" />;
}
