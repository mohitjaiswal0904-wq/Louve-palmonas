import type { Metadata } from "next";

import Link from "next/link";
import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata({
  title: `Products — ${seoConfig.siteName}`,
  description: "Products — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/products` : undefined,
});

export default function ProductsPage() {
  return (
    <ComingSoon title="Products">
      <div className="pt-2">
        <Link href="/products/sample-product" className="inline-flex">
          <Button variant="outline">Preview a sample product page</Button>
        </Link>
      </div>
    </ComingSoon>
  );
}
