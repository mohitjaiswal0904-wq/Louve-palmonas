import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Search results — ${seoConfig.siteName}`,
  description: "Search results — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/search` : undefined,
});

export default async function SearchQueryPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;
  return (
    <ComingSoon title="Search">
      <div className="text-sm text-muted-foreground">
        Query: <span className="text-foreground">{decodeURIComponent(query)}</span>
      </div>
    </ComingSoon>
  );
}
