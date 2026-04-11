"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuth, useMessages, useWishlist } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDTO } from "@/types";

export type CardSize = "sm" | "md" | "lg";

type ProductCardProps = {
  product: ProductDTO;
  size?: CardSize;
  inGrid?: boolean;
};

const imagePadding: Record<CardSize, string> = {
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-8 md:p-10",
  lg: "p-8 sm:p-10 md:p-12 lg:p-14",
};

const imageSizes: Record<CardSize, string> = {
  sm: "(max-width: 640px) 50vw, 25vw",
  md: "(max-width: 640px) 50vw, 33vw",
  lg: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

const copyPadding: Record<CardSize, string> = {
  sm: "px-3 py-2.5 sm:px-3.5 sm:py-3",
  md: "px-4 py-3 sm:px-5 sm:py-3.5",
  lg: "px-5 py-4 sm:px-6 sm:py-4 md:px-8 md:py-5",
};

const vendorSize: Record<CardSize, string> = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[10px] sm:text-[11px]",
};

const titleSize: Record<CardSize, string> = {
  sm: "text-xs",
  md: "text-[13px]",
  lg: "text-sm sm:text-[15px]",
};

const priceSize: Record<CardSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base sm:text-[17px]",
};

export function ProductCard({ product, size = "lg", inGrid = true }: ProductCardProps) {
  const m = useMessages();
  const router = useRouter();
  const { user } = useAuth();
  const { wishlistedProductIds, toggleWishlist } = useWishlist();

  const isWishlisted = wishlistedProductIds.has(product.id);

  function handleWishlistClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    void toggleWishlist(product.id);
  }

  const hasDiscount =
    product.compare_at_price &&
    parseFloat(product.compare_at_price.amount) > parseFloat(product.price.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn(
        "group flex min-w-0 flex-col bg-white outline-none transition-[box-shadow,background-color] duration-300",
        "hover:bg-zinc-50/80 dark:bg-zinc-950 dark:hover:bg-zinc-900/40",
        inGrid ? "h-full" : "overflow-hidden rounded-md border border-[#F6F1E9] dark:border-zinc-800",
      )}
    >
      <div
        className={cn(
          "relative aspect-square bg-[#f9f9f9] dark:bg-zinc-900/35",
          imagePadding[size],
        )}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt || product.title}
            fill
            sizes={imageSizes[size]}
            className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {m.catalog.noImage}
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-2 top-2 bg-[var(--louve-primal-rouge)] px-1.5 py-0.5 text-[9px] font-medium tracking-[0.12em] text-white">
            {m.catalog.sale}
          </span>
        )}
        <button
          type="button"
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistClick}
          className={cn(
            "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full",
            "bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out",
            "hover:scale-110 hover:bg-white hover:shadow-md active:scale-95",
            "dark:bg-zinc-900/85 dark:hover:bg-zinc-900",
            "outline-none ring-zinc-400/40 focus-visible:ring-2",
          )}
        >
          {isWishlisted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] text-red-500 transition-colors duration-200"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M11.645 20.177l-7.774-7.773a5.25 5.25 0 010-7.424 5.25 5.25 0 017.424 0L12 6.915l.705-.705a5.25 5.25 0 017.424 0 5.25 5.25 0 010 7.424l-7.774 7.773a.75.75 0 01-1.06 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-[18px] w-[18px] text-zinc-600 transition-colors duration-200 dark:text-zinc-300"
              aria-hidden
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className={cn("flex flex-1 flex-col border-t border-[#F6F1E9] bg-white dark:border-zinc-800 dark:bg-zinc-950", copyPadding[size])}>
        <p className={cn("mb-1 font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500", vendorSize[size])}>
          {product.vendor}
        </p>
        <h3 className={cn("line-clamp-1 font-normal leading-snug tracking-tight text-zinc-800 dark:text-zinc-100", titleSize[size])}>
          {product.title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className={cn("font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50", priceSize[size])}>
            {formatMoney(product.price.amount, product.price.currency)}
          </span>
          {hasDiscount && (
            <span className="text-[10px] font-normal tabular-nums text-zinc-500 line-through dark:text-zinc-500">
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
