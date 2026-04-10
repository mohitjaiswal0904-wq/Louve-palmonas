import type { Metadata } from "next";

import { buildProductPageMetadata } from "@/lib/l10n/build-page-metadata";

import ProductDetailClient from "./product-detail-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildProductPageMetadata(slug, `/products/${encodeURIComponent(slug)}`);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient handle={slug} />;
}
