import type { Metadata } from "next";

import { HomeStackingCards } from "@/components/home";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("home", "/");
}

export default function Home() {
  return (
    <div className="w-full">
      <HomeStackingCards />
    </div>
  );
}
