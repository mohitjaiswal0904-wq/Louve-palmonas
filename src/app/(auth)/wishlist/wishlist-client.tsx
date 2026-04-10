"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth, useCart, useMessages, useWishlist } from "@/hooks";
import { cn } from "@/lib/utils";
import type { WishlistItemDTO, WishlistProductInfo } from "@/types";

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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.876 0 3.426 1.145 4.312 2.748a.75.75 0 001.238 0C13.574 4.145 15.124 3 17 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.75.75 0 01-.673 0l-.003-.001z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
  );
}

type WishlistRowProps = {
  item: WishlistItemDTO;
  product: WishlistProductInfo | undefined;
  selected: boolean;
  disabled: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onMoveToCart: () => void;
};

function WishlistRow({
  item,
  product,
  selected,
  disabled,
  onToggleSelect,
  onRemove,
  onMoveToCart,
}: WishlistRowProps) {
  const title = product?.title ?? `Product #${item.product_id}`;
  const vendor = product?.vendor ?? "—";
  const price = product?.price;
  const href = product?.handle ? `/products/${product.handle}` : "#";
  const imageUrl = product?.image;
  const imageAlt = product?.image_alt ?? title;

  return (
    <div
      className={cn(
        "group relative flex flex-col border-r border-b border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        selected && "bg-zinc-50/90 dark:bg-zinc-900/50",
      )}
    >
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggleSelect}
            disabled={disabled}
            className="size-3.5 rounded border-zinc-300 text-zinc-900 accent-zinc-900 focus:ring-1 focus:ring-zinc-400 dark:border-zinc-600 dark:accent-zinc-100"
          />
          <span className="sr-only">Select {title}</span>
        </label>
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="flex size-8 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 text-zinc-500 shadow-sm backdrop-blur transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/95 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
          aria-label="Remove from wishlist"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>

      <Link
        href={href}
        className={cn(
          "relative block aspect-square bg-[#f9f9f9] p-6 sm:p-8 md:p-10 dark:bg-zinc-900/35",
          !product?.handle && "pointer-events-none opacity-80",
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            unoptimized
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs tracking-tight text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col border-t border-zinc-200/90 px-4 py-3 sm:px-5 sm:py-4 dark:border-zinc-800">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
          {vendor}
        </p>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-normal leading-snug tracking-tight text-zinc-800 dark:text-zinc-100">
          {product?.handle ? (
            <Link href={href} className="hover:text-zinc-600 dark:hover:text-zinc-300">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
          {price ? (
            <span className="text-base font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
              {formatMoney(price.amount, price.currency)}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </div>
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full border-zinc-200/90 text-xs tracking-tight dark:border-zinc-700"
            onClick={onMoveToCart}
            disabled={disabled}
          >
            <BagIcon className="size-3.5" />
            Move to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistClient() {
  const m = useMessages();
  const { user, loading: authLoading } = useAuth();
  const cart = useCart();
  const { items, loading, fetchWishlist, removeItem, moveToCart } = useWishlist();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    if (!user) return;
    void fetchWishlist();
  }, [user, fetchWishlist]);

  useEffect(() => {
    setSelectedIds((prev) => {
      const ids = new Set(items.map((i) => i.id));
      const next = new Set<number>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  }, [items]);

  const allSelected = items.length > 0 && selectedIds.size === items.length;
  const hasSelection = selectedIds.size > 0;

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(items.map((i) => i.id)));
  }, [allSelected, items]);

  const handleRemove = useCallback(
    async (id: number) => {
      setIsMutating(true);
      try {
        await removeItem(id);
      } finally {
        setIsMutating(false);
      }
    },
    [removeItem],
  );

  const handleMoveOne = useCallback(
    async (id: number) => {
      setIsMutating(true);
      try {
        await moveToCart([id]);
        await cart.refreshCart();
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } finally {
        setIsMutating(false);
      }
    },
    [moveToCart, cart],
  );

  const handleMoveSelected = useCallback(async () => {
    if (selectedIds.size === 0) return;
    setIsMutating(true);
    try {
      await moveToCart([...selectedIds]);
      await cart.refreshCart();
      setSelectedIds(new Set());
    } finally {
      setIsMutating(false);
    }
  }, [selectedIds, moveToCart, cart]);

  const disabled = isMutating || loading;

  const toolbar = useMemo(
    () => (
      <div className="flex flex-col gap-4 border-b border-zinc-200/90 pb-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm tracking-tight text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
            disabled={disabled || items.length === 0}
            className="size-3.5 rounded border-zinc-300 text-zinc-900 accent-zinc-900 focus:ring-1 focus:ring-zinc-400 dark:border-zinc-600 dark:accent-zinc-100"
          />
          <span className="font-light">Select all</span>
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-zinc-200/90 text-xs tracking-tight dark:border-zinc-700"
          onClick={handleMoveSelected}
          disabled={disabled || !hasSelection}
        >
          <BagIcon className="size-3.5" />
          Move selected to cart
          {hasSelection ? (
            <span className="ml-1 tabular-nums text-zinc-500">({selectedIds.size})</span>
          ) : null}
        </Button>
      </div>
    ),
    [
      allSelected,
      toggleSelectAll,
      disabled,
      items.length,
      handleMoveSelected,
      hasSelection,
      selectedIds.size,
    ],
  );

  if (authLoading) {
    return (
      <div className="space-y-8">
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <HeartIcon className="size-5 text-zinc-400" />
            <h1 className="text-xl font-light tracking-wide text-zinc-900 dark:text-zinc-50">
              Wishlist
            </h1>
          </div>
        </header>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm tracking-tight text-muted-foreground">{m.common.loading}…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-8">
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <HeartIcon className="size-5 text-zinc-400" />
            <h1 className="text-xl font-light tracking-wide text-zinc-900 dark:text-zinc-50">
              Wishlist
            </h1>
          </div>
          <p className="text-sm font-light tracking-tight text-zinc-600 dark:text-zinc-400">
            Sign in to save pieces you love and move them to your bag when you are ready.
          </p>
        </header>
        <div className="flex min-h-[35vh] flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-zinc-200/90 bg-zinc-50/40 px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900/20">
          <HeartIcon className="size-12 text-zinc-300 dark:text-zinc-600" />
          <div className="max-w-sm space-y-2">
            <p className="text-sm font-light tracking-tight text-zinc-700 dark:text-zinc-300">
              Your wishlist is available to members.
            </p>
            <p className="text-xs tracking-tight text-muted-foreground">
              Create an account or sign in to curate your edit.
            </p>
          </div>
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: "default", size: "sm", className: "tracking-tight" })}
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <HeartIcon className="size-5 text-zinc-400" />
            <h1 className="text-xl font-light tracking-wide text-zinc-900 dark:text-zinc-50">
              Wishlist
            </h1>
          </div>
        </header>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm tracking-tight text-muted-foreground">{m.common.loading}…</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-8">
        <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-center gap-2">
            <HeartIcon className="size-5 text-zinc-400" />
            <h1 className="text-xl font-light tracking-wide text-zinc-900 dark:text-zinc-50">
              Wishlist
            </h1>
          </div>
        </header>
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-200/90 bg-zinc-50/30 px-6 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900/15">
          <HeartIcon className="size-10 text-zinc-300 dark:text-zinc-600" />
          <p className="max-w-md text-sm font-light tracking-tight text-zinc-600 dark:text-zinc-400">
            Your wishlist is empty. Explore the collection and tap the heart on any piece to save it
            here.
          </p>
          <Link
            href="/products"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "mt-2 border-zinc-200/90 tracking-tight dark:border-zinc-700",
            })}
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-2">
          <HeartIcon className="size-5 text-zinc-400" />
          <h1 className="text-xl font-light tracking-wide text-zinc-900 dark:text-zinc-50">
            Wishlist
          </h1>
        </div>
        <p className="text-xs tabular-nums tracking-tight text-muted-foreground">
          {items.length} {items.length === 1 ? "piece" : "pieces"} saved
        </p>
      </header>

      {toolbar}

      <div className="grid grid-cols-1 border-l border-t border-zinc-200/90 dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <WishlistRow
            key={item.id}
            item={item}
            product={item.product}
            selected={selectedIds.has(item.id)}
            disabled={disabled}
            onToggleSelect={() => toggleSelect(item.id)}
            onRemove={() => void handleRemove(item.id)}
            onMoveToCart={() => void handleMoveOne(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
