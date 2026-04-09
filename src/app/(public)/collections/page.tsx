import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("collections", "/collections");
}

export default async function CollectionsPage() {
  const m = getMessages(await getLocale());
  return (
    <ComingSoon
      title={m.pages.collections.comingSoonTitle}
      body={m.pages.collections.comingSoonBody}
    />
  );
}
