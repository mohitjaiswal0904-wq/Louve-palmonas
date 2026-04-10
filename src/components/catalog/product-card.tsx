"use client";

import Link from "next/link";
import Image from "next/image";

import { useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDTO } from "@/types";

type ProductCardProps = {
  product: ProductDTO;
  /** When true, card sits in a grid with shared outer borders (see ProductGrid). */
  inGrid?: boolean;
};

export function ProductCard({ product, inGrid = true }: ProductCardProps) {
  const m = useMessages();

  const hasDiscount =
    product.compare_at_price &&
    parseFloat(product.compare_at_price.amount) > parseFloat(product.price.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn(
        "group flex min-w-0 flex-col bg-white outline-none transition-[box-shadow,background-color] duration-300",
        "hover:bg-zinc-50/80 dark:bg-zinc-950 dark:hover:bg-zinc-900/40",
        inGrid ? "h-full" : "overflow-hidden rounded-md border border-zinc-200/80 dark:border-zinc-800",
      )}
    >
      {/* Image well — soft grey, generous padding, product “floats” like the reference */}
      <div
        className={cn(
          "relative aspect-square bg-[#f9f9f9] dark:bg-zinc-900/35",
          "p-6 sm:p-8 md:p-10",
        )}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {m.catalog.noImage}
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-3 top-3 bg-[var(--louve-primal-rouge)] px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] text-white">
            {m.catalog.sale}
          </span>
        )}
      </div>

      {/* Hairline separator + white copy block */}
      <div className="flex flex-1 flex-col border-t border-zinc-200/90 bg-white px-4 py-3 sm:px-5 sm:py-3.5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
          {product.vendor}
        </p>
        <h3 className="line-clamp-1 text-[13px] font-normal leading-snug tracking-tight text-zinc-800 dark:text-zinc-100">
          {product.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatMoney(product.price.amount, product.price.currency)}
          </span>
          {hasDiscount && (
            <span className="text-xs font-normal tabular-nums text-zinc-500 line-through dark:text-zinc-500">
              {formatMoney(product.compare_at_price!.amount, product.compare_at_price!.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function formatMoney(amount: string, currency: string): string {
  const num = parseFloat(amount);
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency} ${num.toFixed(0)}`;
  }
}
