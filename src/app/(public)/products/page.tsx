import type { Metadata } from "next";
import { Suspense } from "react";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

import ProductsClient from "./products-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("products", "/products");
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center"><p className="text-sm text-muted-foreground">Loading…</p></div>}>
      <ProductsClient />
    </Suspense>
  );
}
