"use client";

import { useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDTO } from "@/types";
import { ProductCard, type CardSize } from "./product-card";

type Props = {
  products: ProductDTO[];
  size?: CardSize;
  /** Override grid columns class (default depends on size). */
  columns?: string;
};

const defaultCols: Record<CardSize, string> = {
  sm: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  md: "grid-cols-2 sm:grid-cols-3",
  lg: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  /** Phone: 1 col; tablet + desktop: max 3 — compact cards on tablet, large on desktop */
  showcase: "grid-cols-1 md:grid-cols-3",
};

export function ProductGrid({ products, size = "lg", columns }: Props) {
  const m = useMessages();

  if (products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{m.catalog.noProducts}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid border-l border-t border-[#F6F1E9] dark:border-zinc-800", columns ?? defaultCols[size])}>
      {products.map((p) => (
        <div
          key={p.id}
          className="border-r border-b border-[#F6F1E9] dark:border-zinc-800"
        >
          <ProductCard product={p} size={size} inGrid />
        </div>
      ))}
    </div>
  );
}
