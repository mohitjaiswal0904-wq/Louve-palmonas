import type { Metadata } from "next";

import { HomeCollections, HomeCTA, HomeHero } from "@/components/home";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("home", "/");
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <HomeHero />
      <HomeCollections />
      <HomeCTA />
    </div>
  );
}
