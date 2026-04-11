"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type SVGProps } from "react";
import {
  Lock,
  Trash2,
  Plus,
  Minus,
  X,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

import { useAuth, useCart, useMessages, useOrder } from "@/hooks";
import { cn } from "@/lib/utils";
import type { CartItemDTO, OrderDTO } from "@/types";

// Removed deprecated SVG Icon components as we now use Lucide-react.

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
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-6 md:py-16">

        {/* Navigation & Header */}
        <div className="mb-12 space-y-6">
          <Link
            href="/products"
            className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-600"
          >
            <ArrowLeft className="h-3 w-3" />
            Continue Shopping
          </Link>
          <div className="flex items-baseline justify-between border-b border-[#F6F1E9] pb-8">
            <h1 className="text-2xl font-light tracking-tight text-zinc-900 md:text-3xl">
              Shopping Cart <span className="text-zinc-400 italic">({itemCount} items)</span>
            </h1>
            <button
              type="button"
              disabled={loading || isEmpty}
              onClick={() => clearCart()}
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-[#77080E] disabled:opacity-30 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {loading && !isEmpty ? (
          <p className="text-sm font-light text-zinc-500">{m.common.loading}</p>
        ) : isEmpty ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="text-xl font-light tracking-tight text-zinc-800 dark:text-zinc-100">
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
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:items-start">
            <ul className="space-y-6">
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

            <aside className="space-y-6 bg-white p-8 border border-[#F6F1E9] rounded-sm">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">Order Summary</h2>

              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-900">Promo Code</p>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Trash2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 rotate-90" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full rounded-lg bg-[#F3F4F6] py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:outline-none placeholder:text-zinc-400"
                    />
                  </div>
                  <button className="rounded-lg bg-[#E5E7EB] px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900">{formatMoney(subtotal.amount, subtotal.currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-medium text-zinc-900 uppercase">FREE</span>
                </div>
                <div className="flex justify-between border-b border-[#F6F1E9] pb-4 text-sm text-zinc-500">
                  <span>Tax</span>
                  <span className="font-medium text-zinc-900">{formatMoney((parseFloat(subtotal.amount) * 0.08).toString(), subtotal.currency)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-base font-bold text-zinc-900">Total</span>
                  <span className="text-base font-bold text-zinc-900">
                    {formatMoney((parseFloat(subtotal.amount) * 1.08).toString(), subtotal.currency)}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  type="button"
                  disabled={loading || actionLoading}
                  onClick={handleProceed}
                  className={cn(
                    "flex w-full items-center justify-center gap-3 bg-[#1A1A1A] py-4 rounded-md text-sm font-medium text-white transition-all hover:bg-black",
                    "disabled:opacity-40 disabled:pointer-events-none"
                  )}
                >
                  <Lock className="h-4 w-4" />
                  Proceed to Checkout
                </button>

                <p className="text-center text-sm text-zinc-400">
                  Secure checkout powered by Stripe
                </p>
              </div>

              <div className="space-y-4 border-t border-[#F6F1E9] pt-8">
                <TrustItem icon={RotateCcw} text="Free returns within 30 days" isCheck />
                <TrustItem icon={ShieldCheck} text="2-year warranty included" isCheck />
                <TrustItem icon={CheckCircle2} text="Secure payment processing" isCheck />
              </div>
            </aside>
          </div>
        )}

        {/* SEO Footer: Popular Searches */}
        <div className="mt-40 space-y-12">
          <div className="flex h-12 w-12 items-center justify-center">
            <Image src="/logo.svg" alt="Louve" width={48} height={20} className="opacity-40" />
          </div>
          <div className="space-y-8">
            <h3 className="text-lg font-light tracking-wide text-zinc-900">Popular Searches</h3>
            <div className="space-y-6">
              <SEOSection label="For Women" links="Demi-Fine Jewellery | Rings For Women | Earrings For Women | Bracelet For Women | Pendants For Women | Necklaces For Women" />
              <SEOSection label="For Men" links="Rings For Men | Pendant For Men | Chain For Men" />
              <SEOSection label="Mangalsutra" links="Gold Mangalsutra | Diamond Mangalsutra | Infinity Mangalsutra" />
              <SEOSection label="Pendants" links="Gold Pendants | Diamond Pendants | Solitaire Pendants | Evil Eye Pendants" />
              <SEOSection label="Bracelets" links="Gold Bracelets | Diamond Bracelets | Pearl Bracelets | Evil Eye Bracelets | Chain Bracelets | Stone Bracelets | Cuff Bracelets" />
              <SEOSection label="Necklace" links="Gold Necklace | Diamond Necklace | Pearl Necklace | Necklaces For Women | Evil Eye Necklace | Name Necklace | Emerald Necklace" />
              <SEOSection label="Rings" links="Diamond Rings | Gold Rings | Silver Rings | Solitaire Rings | Gemstone Rings | Mens Rings | Engagement Ring | Couple Ring | Wedding Ring | Statement Ring | Emerald Ring" />
            </div>
          </div>
        </div>
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
              <X className="h-5 w-5" />
            </button>

            {checkoutPhase === "pay" && (
              <>
                <h2
                  id="checkout-dialog-title"
                  className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
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
                  className="mt-6 text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
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

  return (
    <li className="relative flex items-start bg-white border border-[#F6F1E9] p-[20px] transition-all hover:border-[#E5C16C]/30">

      {/* Product Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product?.image_alt || product?.title || "Product"}
            fill
            sizes="80px"
            className="object-contain"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">
            No image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="ml-10 flex-1">
        <div className="space-y-2">
          <Link
            href={`/products/${product?.handle}`}
            className="block text-lg font-medium tracking-tight text-zinc-900 transition-colors hover:text-[#77080E]"
          >
            {product?.title ?? "Product"}
          </Link>

          {/* Metadata Row */}
          <div className="flex gap-16 text-sm font-light text-zinc-400">
            <p>Color: <span className="text-zinc-600">Gold</span></p>
            <p>Karat: <span className="text-zinc-600">22k</span></p>
            <p>Size: <span className="text-zinc-600">22</span></p>
          </div>

          {/* Tags */}
          <div>
            <span className="inline-block bg-[#F6E9E9] px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#77080E]/70 rounded-sm">
              TAGS
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="pt-1">
            <div className="inline-flex items-center border border-zinc-100 bg-[#FDFDFD] rounded-lg px-2">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, -1)}
                className="flex h-9 w-9 items-center justify-center text-zinc-300 hover:text-zinc-900 transition-colors disabled:opacity-20"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-zinc-800">
                {item.quantity}
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, 1)}
                className="flex h-9 w-9 items-center justify-center text-zinc-300 hover:text-zinc-900 transition-colors disabled:opacity-20"
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price (Top Right) */}
      <div className="text-right">
        <p className="text-lg font-medium text-zinc-900">
          {variant?.price ? formatMoney(variant.price.amount, variant.price.currency) : "₹00.00"}
        </p>
      </div>

      {/* Actions (Bottom Right) */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button className="text-sm font-light text-zinc-400 hover:text-zinc-900 transition-colors">
          Save for later
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="text-zinc-300 hover:text-[#77080E] transition-colors"
        >
          <Trash2 className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </li>
  );
}

// ── Components & Utilities ──

function TrustItem({ icon: Icon, text, isCheck }: { icon: any; text: string; isCheck?: boolean }) {
  if (isCheck) {
    return (
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-zinc-400"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-sm text-zinc-500 font-normal">{text}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-[#22C55E]" strokeWidth={1.5} />
      <span className="text-[10px] text-zinc-500 font-medium">{text}</span>
    </div>
  );
}

function SEOSection({ label, links }: { label: string; links: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">{label}</p>
      <p className="text-[10px] leading-relaxed text-zinc-400/80">
        {links}
      </p>
    </div>
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
