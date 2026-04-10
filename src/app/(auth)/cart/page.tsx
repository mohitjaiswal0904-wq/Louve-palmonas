import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import CartClient from "./cart-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("cart", "/cart");
}

export default function CartPage() {
  return <CartClient />;
}
