import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("home", "/");
}

export default async function Home() {
  const m = getMessages(await getLocale());
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-light tracking-wide">{m.pages.home.heading}</h1>
      <p className="text-sm text-muted-foreground">{m.pages.home.subheading}</p>
    </div>
  );
}
