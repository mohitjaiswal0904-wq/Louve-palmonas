import type { Metadata } from "next";

import OrderDetailClient from "./order-detail-client";

export const metadata: Metadata = { title: "Order Details — Louve" };

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <OrderDetailClient paramsPromise={params} />;
}
