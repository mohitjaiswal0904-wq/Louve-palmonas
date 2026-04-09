import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Product — ${seoConfig.siteName}`,
  description: "Product page — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/products` : undefined,
});

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ComingSoon title="Product">
      <div className="text-sm text-muted-foreground">
        Product id: <span className="text-foreground">{decodeURIComponent(slug)}</span>
      </div>
    </ComingSoon>
  );
}
