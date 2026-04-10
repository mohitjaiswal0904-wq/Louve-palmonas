"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type SVGProps } from "react";

import { useAuth, useCart, useMessages, useOrder } from "@/hooks";
import { cn } from "@/lib/utils";
import type { CartItemDTO, OrderDTO } from "@/types";

function formatMoney(amount: string, currency: string): string {
  const num = parseFloat(amount);
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${currency} ${num.toFixed(2)}`;
  }
}

function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMinus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type CheckoutPhase = "idle" | "pay" | "success";

export default function CartClient() {
  const router = useRouter();
  const m = useMessages();
  const { user, loading: authLoading } = useAuth();
  const {
    items,
    itemCount,
    uniqueItems,
    subtotal,
    loading: cartLoading,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
  } = useCart();
  const order = useOrder();

  const [checkoutPhase, setCheckoutPhase] = useState<CheckoutPhase>("idle");
  const [pendingOrder, setPendingOrder] = useState<OrderDTO | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  const handleQtyChange = useCallback(
    async (item: CartItemDTO, delta: number) => {
      const next = item.quantity + delta;
      if (next < 1) {
        await removeItem(item.id);
        return;
      }
      await updateItem(item.id, { quantity: next });
    },
    [updateItem, removeItem],
  );

  const handleProceed = useCallback(async () => {
    setCheckoutError(null);
    setActionLoading(true);
    try {
      const res = await order.createOrder();
      if (res.success && res.data) {
        setPendingOrder(res.data);
        setCheckoutPhase("pay");
        return;
      }
      setCheckoutError(res.message || res.error?.message || "Could not create order.");
    } catch {
      setCheckoutError("Could not create order. Please try again.");
    } finally {
      setActionLoading(false);
    }
  }, [order]);

  const handleConfirmPayment = useCallback(async () => {
    if (!pendingOrder) return;
    setCheckoutError(null);
    setActionLoading(true);
    try {
      const res = await order.simulateCheckout(pendingOrder.id, { confirm: true });
      if (res.success && res.data) {
        const completed = res.data;
        setPendingOrder(completed);
        await refreshCart();
        setCheckoutPhase("success");
        window.setTimeout(() => {
          router.push(`/account/orders/${completed.id}`);
        }, 1800);
        return;
      }
      setCheckoutError(res.message || res.error?.message || "Payment could not be confirmed.");
    } catch {
      setCheckoutError("Payment could not be confirmed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  }, [order, pendingOrder, refreshCart, router]);

  const handleCancelCheckout = useCallback(async () => {
    if (!pendingOrder || actionLoading) return;
    setCheckoutError(null);
    setActionLoading(true);
    try {
      await order.cancelOrder(pendingOrder.id);
      await refreshCart();
      setPendingOrder(null);
      setCheckoutPhase("idle");
    } finally {
      setActionLoading(false);
    }
  }, [order, pendingOrder, refreshCart, actionLoading]);

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-light tracking-wide text-zinc-500">{m.common.loading}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const loading = cartLoading;
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-[60vh] bg-zinc-50/50 pb-24 pt-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col gap-6 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">Shopping bag</p>
            <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Your cart
            </h1>
          </div>
          <button
            type="button"
            disabled={loading || isEmpty}
            onClick={() => clearCart()}
            className={cn(
              "self-start text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors",
              "hover:text-zinc-900 dark:hover:text-zinc-200",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            Clear cart
          </button>
        </header>

        {loading && !isEmpty ? (
          <p className="text-sm font-light text-zinc-500">{m.common.loading}</p>
        ) : isEmpty ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="font-serif text-xl font-light tracking-tight text-zinc-800 dark:text-zinc-100">
              Your bag is empty
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
              Discover our curated selection of fine jewelry and objects.
            </p>
            <Link
              href="/products"
              className="mt-10 inline-block border border-zinc-900/90 bg-zinc-900 px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
            <ul className="space-y-0 divide-y divide-zinc-200/90 dark:divide-zinc-800/90">
              {items.map((item) => (
                <CartLine
                  key={item.id}
                  item={item}
                  disabled={loading}
                  onQtyChange={handleQtyChange}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </ul>

            <aside className="border border-zinc-200/70 bg-white/80 p-8 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/40 lg:sticky lg:top-28">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">Summary</p>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-zinc-600 dark:text-zinc-400">
                  <dt className="font-light">Unique items</dt>
                  <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">{uniqueItems}</dd>
                </div>
                <div className="flex justify-between gap-4 text-zinc-600 dark:text-zinc-400">
                  <dt className="font-light">Total quantity</dt>
                  <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">{itemCount}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Subtotal</dt>
                  <dd className="text-lg font-light tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
                    {formatMoney(subtotal.amount, subtotal.currency)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                disabled={loading || actionLoading}
                onClick={handleProceed}
                className={cn(
                  "mt-10 w-full border border-zinc-900 bg-zinc-900 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white",
                  "transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
                  "disabled:pointer-events-none disabled:opacity-40",
                )}
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </div>

      {checkoutPhase !== "idle" && pendingOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-md"
          role="presentation"
          onClick={checkoutPhase === "pay" ? () => void handleCancelCheckout() : undefined}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-dialog-title"
            className="relative w-full max-w-md border border-zinc-200/80 bg-zinc-50/95 p-10 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)] dark:border-zinc-700/80 dark:bg-zinc-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              disabled={actionLoading || checkoutPhase === "success"}
              onClick={checkoutPhase === "pay" ? () => void handleCancelCheckout() : undefined}
              className="absolute right-4 top-4 rounded-sm p-1 text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-0 dark:hover:text-zinc-100"
            >
              <IconClose className="h-5 w-5" />
            </button>

            {checkoutPhase === "pay" && (
              <>
                <h2
                  id="checkout-dialog-title"
                  className="font-serif text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  Checkout
                </h2>
                <p className="mt-2 text-sm font-light text-zinc-500">
                  Review your order before confirming payment.
                </p>
                <dl className="mt-8 space-y-3 border-t border-zinc-200/80 pt-8 text-sm dark:border-zinc-800/80">
                  <div className="flex justify-between gap-4">
                    <dt className="font-light text-zinc-500">Order number</dt>
                    <dd className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                      {pendingOrder.order_number}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-light text-zinc-500">Total</dt>
                    <dd className="text-lg font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                      {formatMoney(pendingOrder.total_amount.amount, pendingOrder.total_amount.currency)}
                    </dd>
                  </div>
                </dl>
                {checkoutError && (
                  <p className="mt-6 text-sm text-red-600 dark:text-red-400" role="alert">
                    {checkoutError}
                  </p>
                )}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={handleCancelCheckout}
                    className="border border-zinc-300/90 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100/80 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={handleConfirmPayment}
                    className="border border-zinc-900 bg-zinc-900 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  >
                    {actionLoading ? "Processing…" : "Confirm payment"}
                  </button>
                </div>
              </>
            )}

            {checkoutPhase === "success" && (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300/80 dark:border-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-zinc-800 dark:text-zinc-100"
                    aria-hidden
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2
                  id="checkout-dialog-title"
                  className="mt-6 font-serif text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  Payment successful
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
                  Thank you. Order <span className="text-zinc-800 dark:text-zinc-200">{pendingOrder.order_number}</span>{" "}
                  is confirmed. Taking you to your order…
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type CartLineProps = {
  item: CartItemDTO;
  disabled: boolean;
  onQtyChange: (item: CartItemDTO, delta: number) => void;
  onRemove: () => void;
};

function CartLine({ item, disabled, onQtyChange, onRemove }: CartLineProps) {
  const product = item.product;
  const variant = item.variant;
  const imageUrl = product?.image;
  const href = product?.handle ? `/products/${product.handle}` : undefined;

  const title = (
    <div className="min-w-0">
      {product?.vendor && (
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">{product.vendor}</p>
      )}
      {href ? (
        <Link
          href={href}
          className="mt-1 block font-serif text-lg font-light tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          {product?.title ?? "Product"}
        </Link>
      ) : (
        <p className="mt-1 font-serif text-lg font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          {product?.title ?? "Product"}
        </p>
      )}
      <p className="mt-2 text-xs font-light text-zinc-500">
        {variant?.title && <span>{variant.title}</span>}
        {variant?.title && variant?.sku && <span className="text-zinc-400"> · </span>}
        {variant?.sku && <span className="tabular-nums">SKU {variant.sku}</span>}
      </p>
    </div>
  );

  return (
    <li className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start">
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-zinc-100/80 dark:bg-zinc-900/50 sm:h-32 sm:w-32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product?.image_alt || product?.title || "Product"}
            fill
            sizes="128px"
            className="object-contain object-center"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="min-w-0 flex-1">{title}</div>

        <div className="flex flex-row items-end justify-between gap-6 sm:flex-col sm:items-end">
          <div className="text-right">
            <p className="text-xs font-light text-zinc-500">Unit</p>
            <p className="mt-0.5 tabular-nums text-sm text-zinc-800 dark:text-zinc-100">
              {variant?.price
                ? formatMoney(variant.price.amount, variant.price.currency)
                : "—"}
            </p>
            <p className="mt-3 text-xs font-light text-zinc-500">Line total</p>
            <p className="mt-0.5 text-base font-light tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
              {formatMoney(item.line_total.amount, item.line_total.currency)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-zinc-200/90 dark:border-zinc-700/90">
              <button
                type="button"
                disabled={disabled}
                aria-label="Decrease quantity"
                onClick={() => onQtyChange(item, -1)}
                className="flex h-10 w-10 items-center justify-center text-zinc-600 transition-colors hover:bg-zinc-100/80 disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
                {item.quantity}
              </span>
              <button
                type="button"
                disabled={disabled}
                aria-label="Increase quantity"
                onClick={() => onQtyChange(item, 1)}
                className="flex h-10 w-10 items-center justify-center text-zinc-600 transition-colors hover:bg-zinc-100/80 disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              disabled={disabled}
              aria-label="Remove item"
              onClick={onRemove}
              className="flex h-10 w-10 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-40 dark:hover:text-zinc-100"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
