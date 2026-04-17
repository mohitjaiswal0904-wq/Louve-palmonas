"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Lock,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Check,
} from "lucide-react";

import { PopularSearches } from "@/components/common";
import { useAuth, useCart, useLoginGate, useMessages, useOrder, usePayment } from "@/hooks";
import { cn } from "@/lib/utils";
import type { CartItemDTO, OrderDTO, PayOrderResponse } from "@/types";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: () => void) => void;
    };
  }
}

const TAX_RATE = 0.08;

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

export default function CartClient() {
  const router = useRouter();
  const { replaceWithLogin } = useLoginGate();
  const m = useMessages();
  const { user, loading: authLoading } = useAuth();
  const {
    items,
    itemCount,
    subtotal,
    loading: cartLoading,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
  } = useCart();
  const order = useOrder();
  const { payOrder, verifyRazorpay } = usePayment();

  const [promoCode, setPromoCode] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<OrderDTO | null>(null);
  const razorpayLoaded = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) {
      replaceWithLogin();
    }
  }, [authLoading, user, replaceWithLogin]);

  const loadRazorpayScript = useCallback((): Promise<void> => {
    if (razorpayLoaded.current && window.Razorpay) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        razorpayLoaded.current = true;
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  }, []);

  const sub = parseFloat(subtotal.amount);
  const tax = sub * TAX_RATE;
  const total = sub + tax;
  const currency = subtotal.currency || "INR";

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

  const handlePlaceOrder = useCallback(async () => {
    setCheckoutError(null);
    setActionLoading(true);

    try {
      const createRes = await order.createOrder({
        payment_method: "razorpay",
      } as Parameters<typeof order.createOrder>[0]);

      if (!createRes.success || !createRes.data) {
        setCheckoutError(
          createRes.message || "Could not create order. Please try again.",
        );
        setActionLoading(false);
        return;
      }

      const createdOrder = createRes.data;
      const payRes = await payOrder(createdOrder.id);

      if (!payRes.success || !payRes.data) {
        setCheckoutError("Payment initiation failed. Please try again.");
        setActionLoading(false);
        return;
      }

      const payData: PayOrderResponse = payRes.data;

      await loadRazorpayScript();

      const options: Record<string, unknown> = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payData.payment.amount,
        currency: payData.payment.currency,
        name: "Louve",
        description: `Order ${createdOrder.order_number}`,
        order_id: payData.razorpay_order_id,
        one_click_checkout: true,
        show_coupons: false,
        prefill: {
          name: user?.profile?.display_name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: { color: "#1A1A1A" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await verifyRazorpay({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyRes.success) {
              await refreshCart();
              setSuccessOrder(createdOrder);
              setTimeout(() => {
                router.push(`/account/orders/${createdOrder.id}`);
              }, 2200);
            } else {
              setCheckoutError("Payment verification failed.");
            }
          } catch {
            setCheckoutError(
              "Payment verification failed. Please contact support.",
            );
          } finally {
            setActionLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setActionLoading(false);
            setCheckoutError("Payment was cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setActionLoading(false);
        setCheckoutError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.";
      setCheckoutError(
        /cart is empty/i.test(msg)
          ? "Your cart is empty. Add items before checkout."
          : msg,
      );
      setActionLoading(false);
    }
  }, [
    order,
    payOrder,
    verifyRazorpay,
    refreshCart,
    loadRazorpayScript,
    router,
    user,
  ]);

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-light tracking-wide text-zinc-500">
          {m.common.loading}
        </p>
      </div>
    );
  }

  if (!user) return null;

  const loading = cartLoading;
  const isEmpty = items.length === 0 && !successOrder;

  if (successOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-md">
        <div className="relative w-full max-w-md border border-zinc-200/80 bg-zinc-50/95 p-10 text-center shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300/80">
            <CheckCircle2
              className="h-7 w-7 text-zinc-800"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="mt-6 text-2xl font-light tracking-tight text-zinc-900">
            Order placed successfully
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
            Thank you. Order{" "}
            <span className="text-zinc-800">{successOrder.order_number}</span>{" "}
            is confirmed. Taking you to your order…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-[max(6rem,env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto max-w-[1440px] px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 xl:px-8 xl:py-16">
        {/* Navigation & Header */}
        <div className="mb-8 space-y-4 sm:mb-10 sm:space-y-6 md:mb-12">
          <Link
            href="/products"
            className="inline-flex min-h-[44px] items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-600 touch-manipulation"
          >
            <ArrowLeft className="h-3 w-3 shrink-0" />
            Continue Shopping
          </Link>
          <div className="flex flex-col gap-4 border-b border-[#F6F1E9] pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:pb-8">
            <h1 className="text-xl font-light tracking-tight text-zinc-900 sm:text-2xl md:text-3xl">
              Shopping Cart{" "}
              <span className="italic text-zinc-400">({itemCount} items)</span>
            </h1>
            <button
              type="button"
              disabled={loading || isEmpty}
              onClick={() => clearCart()}
              className="min-h-[44px] shrink-0 self-start text-left text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-[#77080E] disabled:opacity-30 sm:self-auto sm:min-h-0 touch-manipulation"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {loading && !isEmpty ? (
          <p className="text-sm font-light text-zinc-500">
            {m.common.loading}
          </p>
        ) : isEmpty ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="text-xl font-light tracking-tight text-zinc-800">
              Your bag is empty
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
              Discover our curated selection of fine jewelry and objects.
            </p>
            <Link
              href="/products"
              className="mt-10 inline-block border border-zinc-900/90 bg-zinc-900 px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-zinc-800"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:gap-10 xl:grid-cols-[1fr_min(100%,420px)] xl:items-start xl:gap-12 2xl:gap-16">
            {/* Cart items */}
            <ul className="min-w-0 space-y-4 sm:space-y-6">
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

            {/* Checkout sidebar */}
            <aside className="order-last overflow-hidden rounded-sm border border-[#E6E6E6] bg-white xl:sticky xl:top-[calc(var(--site-header-offset,4rem)+0.5rem)] xl:max-h-[calc(100dvh-var(--site-header-offset,4rem)-1.5rem)] xl:overflow-y-auto">
              <div className="px-6 py-6">
                <h2 className="text-[22px] font-medium tracking-tight text-zinc-900">
                  Order Summary
                </h2>

                <div className="mt-6">
                  <p className="text-sm font-medium text-zinc-900">Promo Code</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative min-w-0 flex-1">
                      <Tag
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="h-11 w-full rounded-md border border-zinc-200 bg-zinc-100 py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="button"
                      className="h-11 shrink-0 rounded-md bg-zinc-100 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">
                      {formatMoney(subtotal.amount, currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Shipping</span>
                    <span className="font-medium uppercase text-zinc-900">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-4 text-sm text-zinc-500">
                    <span>Tax</span>
                    <span className="font-medium text-zinc-900">
                      {formatMoney(tax.toString(), currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-base font-semibold text-zinc-900">
                      Total
                    </span>
                    <span className="text-base font-semibold text-zinc-900">
                      {formatMoney(total.toString(), currency)}
                    </span>
                  </div>
                </div>

                {checkoutError && (
                  <p className="mt-5 text-sm text-[#77080E]" role="alert">
                    {checkoutError}
                  </p>
                )}

                <button
                  type="button"
                  disabled={actionLoading || loading || isEmpty}
                  onClick={handlePlaceOrder}
                  className={cn(
                    "mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-black",
                    "disabled:pointer-events-none disabled:opacity-40",
                  )}
                >
                  <Lock className="h-4 w-4" strokeWidth={1.75} />
                  {actionLoading ? "Processing…" : "Proceed to Checkout"}
                </button>

                <p className="mt-5 text-center text-sm text-zinc-400">
                  Secure checkout powered by Razorpay
                </p>
              </div>

              <div className="border-t border-zinc-200 px-6 py-6">
                <div className="space-y-4">
                  {[
                    "Free returns within 30 days",
                    "2-year warranty included",
                    "Secure payment processing",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-sm font-normal leading-snug text-zinc-500">
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        <PopularSearches
          variant="footer"
          showLogo
          limit={12}
          title="Popular Searches"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Cart Line Item
// ═══════════════════════════════════════════════════════════════

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
    <li className="border border-[#F6F1E9] bg-white p-4 transition-all hover:border-[#E5C16C]/30 sm:p-5 md:p-[20px]">
      {/* Mobile layout (matches reference) */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] overflow-hidden bg-white"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product?.image_alt || product?.title || "Product"}
                  fill
                  sizes="33vw"
                  className="object-contain object-top"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-widest text-zinc-300">
                  —
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <Link
            href={`/products/${product?.handle}`}
            className="min-w-0 flex-1 text-[13.17px] font-[500] leading-snug tracking-tight text-[#717171]"
          >
            <span className="block line-clamp-1">
              {product?.title ?? "Product"}
            </span>
          </Link>
          <p className="shrink-0 text-[13px] font-[500] tabular-nums text-[#1F1F1F]">
            {variant?.price
              ? formatMoney(variant.price.amount, variant.price.currency)
              : "₹00.00"}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-10 gap-y-1 text-[11.85px] font-[400] text-[#717182]">
          <span>
            Color: <span className="text-zinc-500">Gold</span>
          </span>
          <span>
            Karat: <span className="text-zinc-500">22k</span>
          </span>
          <span>
            Size: <span className="text-zinc-500">22</span>
          </span>
        </div>

        <span className="mt-3 inline-flex h-[16.15px] w-[37.95px] items-center justify-center rounded-[16.41px] bg-[#77080E33] text-[9px] font-[500] tracking-widest text-[#77080E]">
          TAGS
        </span>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="inline-flex h-[22.38px] w-[79px] items-center overflow-hidden rounded-[6.58px] border-[0.66px] border-[#1F1F1F1A] bg-white">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onQtyChange(item, -1)}
              className="flex h-full w-[22px] items-center justify-center text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-20"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" strokeWidth={2.5} />
            </button>
            <span className="flex-1 text-center text-[11px] font-[500] tabular-nums text-zinc-800">
              {item.quantity}
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onQtyChange(item, 1)}
              className="flex h-full w-[22px] items-center justify-center text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-20"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-[9px] font-[500] text-[#717182]"
              tabIndex={-1}
              aria-hidden
            >
              Save for later
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={onRemove}
              className="inline-flex h-6 w-6 items-center justify-center text-[#717182] transition-colors hover:text-[#77080E] disabled:opacity-30"
              aria-label="Remove from cart"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Tablet/Desktop/iPad layout (unchanged) */}
      <div className="hidden flex-col gap-4 md:flex sm:flex-row sm:items-start">
        <div className="flex gap-4 sm:min-w-0 sm:flex-1">
          <div className="relative h-[128px] w-[128px] shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product?.image_alt || product?.title || "Product"}
                fill
                sizes="128px"
                className="object-contain"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <Link
              href={`/products/${product?.handle}`}
              className="block text-base font-medium leading-snug tracking-tight text-zinc-900 transition-colors hover:text-[#77080E] sm:text-lg"
            >
              {product?.title ?? "Product"}
            </Link>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-light text-zinc-400 sm:text-sm">
                <p>
                  Color: <span className="text-zinc-600">Gold</span>
                </p>
                <p>
                  Karat: <span className="text-zinc-600">22k</span>
                </p>
                <p>
                  Size: <span className="text-zinc-600">22</span>
                </p>
              </div>

              <span className="inline-block rounded-sm bg-[#F6E9E9] px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#77080E]/70">
                TAGS
              </span>
            </div>

            <div className="inline-flex items-center rounded-lg border border-zinc-100 bg-[#FDFDFD] px-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, -1)}
                className="flex size-11 items-center justify-center text-zinc-300 transition-colors hover:text-zinc-900 disabled:opacity-20 touch-manipulation sm:size-9"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-medium tabular-nums text-zinc-800">
                {item.quantity}
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, 1)}
                className="flex size-11 items-center justify-center text-zinc-300 transition-colors hover:text-zinc-900 disabled:opacity-20 touch-manipulation sm:size-9"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 border-t border-[#F6F1E9] pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          <p className="text-lg font-medium tabular-nums text-zinc-900">
            {variant?.price
              ? formatMoney(variant.price.amount, variant.price.currency)
              : "₹00.00"}
          </p>
          <div className="flex items-center gap-3 pt-16">
            <button
              type="button"
              className="hidden text-sm font-light text-zinc-400 transition-colors hover:text-zinc-900 md:inline"
              tabIndex={-1}
              aria-hidden
            >
              Save for later
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={onRemove}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-300 transition-colors hover:text-[#77080E] disabled:opacity-30 touch-manipulation sm:min-h-0 sm:min-w-0"
              aria-label="Remove from cart"
            >
              <Trash2 className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

// (trust badge component removed; inline checks used instead)
