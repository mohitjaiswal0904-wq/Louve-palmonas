import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import WishlistClient from "./wishlist-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("wishlist", "/wishlist");
}

export default function WishlistPage() {
  return <WishlistClient />;
}
