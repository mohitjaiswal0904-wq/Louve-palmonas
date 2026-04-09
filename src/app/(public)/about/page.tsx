import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `About — ${seoConfig.siteName}`,
  description:
    "Louve comes from the French word for she-wolf — instinct, independence, protection, and quiet leadership.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/about` : undefined,
});

export default function AboutPage() {
  return (
    <AppShell sidebar={<SidebarNav />}>
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">About Louve</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Louve comes from the French word for she-wolf — a symbol of instinct, independence,
          protection, and quiet leadership.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          The world of Louve is rooted in aesthetic restraint and primal symbolism — refined,
          contemporary design for everyday luxury.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">From the house of Palmonas.</p>
      </div>
    </AppShell>
  );
}
