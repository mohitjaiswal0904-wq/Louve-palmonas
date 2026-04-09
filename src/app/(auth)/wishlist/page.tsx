import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Wishlist — ${seoConfig.siteName}`,
  description: "Wishlist — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/wishlist` : undefined,
});

export default function WishlistPage() {
  return <ComingSoon title="Wishlist" />;
}
