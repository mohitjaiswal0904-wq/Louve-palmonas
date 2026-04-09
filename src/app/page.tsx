import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";
import { HomeHero } from "@/features/home/hero";
import { HomeCollections } from "@/features/home/collections";
import { HomeCTA } from "@/features/home/cta";

export const metadata: Metadata = createMetadata({
  title: `${seoConfig.siteName} — ${seoConfig.brandLine}`,
  description: seoConfig.defaultDescription,
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/` : undefined,
});

export default function Home() {
  return (
    <AppShell sidebar={<SidebarNav />}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <HomeHero />
        <HomeCollections />
        <HomeCTA />
      </div>
    </AppShell>
  );
}
