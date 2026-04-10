import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import OrdersClient from "./orders-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("orders", "/account/orders");
}

export default function OrdersPage() {
  return <OrdersClient />;
}
