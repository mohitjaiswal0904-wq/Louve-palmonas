"use client";

import { useMessages } from "@/hooks";
import type { ProductDTO } from "@/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: ProductDTO[] }) {
  const m = useMessages();

  if (products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{m.catalog.noProducts}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 border-l border-t border-zinc-200/90 sm:grid-cols-3 lg:grid-cols-4 dark:border-zinc-800">
      {products.map((p) => (
        <div
          key={p.id}
          className="border-r border-b border-zinc-200/90 dark:border-zinc-800"
        >
          <ProductCard product={p} inGrid />
        </div>
      ))}
    </div>
  );
}
