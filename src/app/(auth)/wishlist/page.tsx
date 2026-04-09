import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("wishlist", "/wishlist");
}

export default async function WishlistPage() {
  const m = getMessages(await getLocale());
  return (
    <ComingSoon
      title={m.pages.wishlist.comingSoonTitle}
      body={m.pages.wishlist.comingSoonBody}
    />
  );
}
