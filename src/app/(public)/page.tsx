import type { Metadata } from "next";

import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `${seoConfig.siteName} — ${seoConfig.brandLine}`,
  description: seoConfig.defaultDescription,
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/` : undefined,
});

export default function Home() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-light tracking-wide">Coming soon</h1>
      <p className="text-sm text-muted-foreground">
        This website is being crafted — check back soon.
      </p>
    </div>
  );
}
