import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("about", "/about");
}

export default async function AboutPage() {
  const m = getMessages(await getLocale());
  return (
    <ComingSoon
      title={m.pages.about.comingSoonTitle}
      body={m.pages.about.comingSoonBody}
    />
  );
}
