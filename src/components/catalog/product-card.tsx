"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth, useCart, useLoginGate, useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDTO, VariantDTO } from "@/types";

export type CardSize = "sm" | "md" | "lg" | "showcase";

type ProductCardProps = {
  product: ProductDTO;
  size?: CardSize;
  inGrid?: boolean;
};

/** Single-column phone (large), 3-col tablet (compact), 3-col desktop (large) — matches collection grids. */
export const SHOWCASE_IMAGE_PADDING =
  "p-8 sm:p-9 md:p-7 lg:p-12 xl:p-14";
export const SHOWCASE_IMAGE_SIZES =
  "(max-width: 767px) 50vw, (max-width: 1023px) 34vw, 33vw";
export const SHOWCASE_COPY_PADDING =
  "px-4 py-3.5 sm:px-5 sm:py-4 md:px-4 md:py-3 lg:px-7 lg:py-5 xl:px-8 xl:py-5";
const showcaseVendor =
  "text-[9px] md:text-[10px] lg:text-[10px] xl:text-[11px]";
const showcasePrice =
  "text-sm md:text-sm lg:text-[17px]";

// Aliases for ProductCard internal use
const showcaseImagePadding = SHOWCASE_IMAGE_PADDING;
const showcaseImageSizes = SHOWCASE_IMAGE_SIZES;
const showcaseCopyPadding = SHOWCASE_COPY_PADDING;

const imagePadding: Record<Exclude<CardSize, "showcase">, string> = {
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-8 md:p-10",
  lg: "p-8 sm:p-10 md:p-12 lg:p-14",
};

const imageSizes: Record<Exclude<CardSize, "showcase">, string> = {
  sm: "(max-width: 640px) 50vw, 25vw",
  md: "(max-width: 640px) 50vw, 33vw",
  lg: "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw",
};

const copyPadding: Record<Exclude<CardSize, "showcase">, string> = {
  sm: "px-3 py-2.5 sm:px-3.5 sm:py-3",
  md: "px-4 py-3 sm:px-5 sm:py-3.5",
  lg: "px-5 py-4 sm:px-6 sm:py-4 md:px-8 md:py-5",
};

const vendorSize: Record<Exclude<CardSize, "showcase">, string> = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[10px] sm:text-[11px]",
};

const priceSize: Record<Exclude<CardSize, "showcase">, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base sm:text-[17px]",
};

export function ProductCard({ product, size = "lg", inGrid = true }: ProductCardProps) {
  const m = useMessages();
  const { openLogin } = useLoginGate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const cartVariant = useMemo(() => pickVariantForCart(product), [product]);

  const handleAddClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!cartVariant || adding) return;
      if (!user) {
        openLogin();
        return;
      }
      setAdding(true);
      try {
        await addToCart({
          product_id: product.id,
          variant_id: cartVariant.id,
          quantity: 1,
        });
      } catch {
        /* API client throws; cart count unchanged */
      } finally {
        setAdding(false);
      }
    },
    [addToCart, adding, cartVariant, openLogin, product.id, user],
  );

  const hasDiscount =
    product.compare_at_price &&
    parseFloat(product.compare_at_price.amount) > parseFloat(product.price.amount);

  const imgPad = size === "showcase" ? showcaseImagePadding : imagePadding[size];
  const imgSz = size === "showcase" ? showcaseImageSizes : imageSizes[size];
  const cpPad = size === "showcase" ? showcaseCopyPadding : copyPadding[size];
  const vSz = size === "showcase" ? showcaseVendor : vendorSize[size];
  const pSz = size === "showcase" ? showcasePrice : priceSize[size];

  const productHref = `/products/${product.handle}`;

  return (
    <article
      className={cn(
        "group flex min-w-0 flex-col bg-white transition-[box-shadow,background-color] duration-300",
        "hover:bg-zinc-50/80 dark:bg-zinc-950 dark:hover:bg-zinc-900/40",
        inGrid ? "h-full" : "overflow-hidden rounded-md border border-[#F6F1E9] dark:border-zinc-800",
      )}
    >
      <div
        className={cn(
          "relative aspect-square bg-[#f9f9f9] dark:bg-zinc-900/35",
          imgPad,
        )}
      >
        <Link
          href={productHref}
          className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt || product.title}
              fill
              sizes={imgSz}
              className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
              {m.catalog.noImage}
            </span>
          )}
        </Link>
        {cartVariant ? (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={cn(
              "absolute bottom-2 right-2 z-10 h-9 w-9 rounded-full border border-zinc-200/90 bg-white/95 shadow-md backdrop-blur-sm",
              "hover:bg-white dark:border-zinc-600 dark:bg-zinc-900/95 dark:hover:bg-zinc-800",
              size === "showcase" && "bottom-3 right-3 h-10 w-10 sm:bottom-4 sm:right-4",
            )}
            disabled={adding}
            aria-label={m.catalog.addToCart}
            title={user ? m.catalog.addToCart : m.catalog.signInToAddToCart}
            onClick={handleAddClick}
          >
            <ShoppingBag className="size-4" aria-hidden />
          </Button>
        ) : null}
      </div>

      <Link
        href={productHref}
        className={cn(
          "flex min-h-0 flex-1 flex-col border-t border-[#F6F1E9] bg-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950",
          cpPad,
        )}
      >
        {/* <p className={cn("mb-1 font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500", vSz)}>
          {product.vendor}
        </p> */}
        <h3 className="line-clamp-1 text-[10px] font-normal leading-snug tracking-tight text-[#1F1F1F] md:text-[22px] dark:text-zinc-100">
          {product.title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-[500] text-[12px] tabular-nums tracking-tight text-[#1F1F1F] md:text-[22px]">
            {formatMoney(product.price.amount, product.price.currency)}
          </span>
          {hasDiscount && (
            <span className="text-[10px] font-normal tabular-nums text-zinc-500 line-through dark:text-zinc-500">
              {formatMoney(product.compare_at_price!.amount, product.compare_at_price!.currency)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}

/** First in-stock variant for quick add from listing cards (requires `variants` on product). */
function pickVariantForCart(product: ProductDTO): VariantDTO | null {
  const variants = product.variants ?? [];
  return variants.find((v) => v.available) ?? null;
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
