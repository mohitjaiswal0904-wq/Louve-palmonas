import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";
import { brand } from "@/lib/config/brand";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = createMetadata({
  title: `Collections — ${seoConfig.siteName}`,
  description: "Explore Louve collections — refined, contemporary fine jewellery.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/collections` : undefined,
});

export default function CollectionsPage() {
  return (
    <AppShell sidebar={<SidebarNav />}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Built to layer, mix, and return to.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {brand.collections.map((c) => (
            <Card key={c.slug}>
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Coming soon.</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
