import type { Metadata } from "next";

import { HomeStackingCards } from "@/components/home";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("home", "/");
}

export default function Home() {
  return (
    <div className="-mt-16 min-h-0 w-full min-w-0 max-w-full overflow-x-hidden">
      <HomeStackingCards />
    </div>
  );
}
