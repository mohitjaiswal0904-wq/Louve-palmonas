import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Cart — ${seoConfig.siteName}`,
  description: "Cart — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/cart` : undefined,
});

export default function CartPage() {
  return <ComingSoon title="Cart" />;
}
