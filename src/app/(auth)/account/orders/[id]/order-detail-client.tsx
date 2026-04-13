"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth, useMessages, useOrder } from "@/hooks";
import { buildLoginHref } from "@/lib/auth/return-url";
import { cn } from "@/lib/utils";
import type { OrderDTO, OrderItemDTO, OrderMoneyInfo } from "@/types";

type Props = { paramsPromise: Promise<{ id: string }> };

function formatOrderDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatMoney(m: OrderMoneyInfo) {
  const n = Number(m.amount);
  if (Number.isNaN(n)) return `${m.amount} ${m.currency}`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: m.currency || "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

function orderStatusClass(status: string) {
  const s = status.toLowerCase();
  const map: Record<string, string> = {
    pending: "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-200",
    confirmed: "border-blue-500/25 bg-blue-500/10 text-blue-800 dark:text-blue-200",
    processing: "border-indigo-500/25 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200",
    shipped: "border-purple-500/25 bg-purple-500/10 text-purple-800 dark:text-purple-200",
    delivered: "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    cancelled: "border-red-500/25 bg-red-500/10 text-red-800 dark:text-red-200",
    refunded: "border-zinc-500/25 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  };
  return map[s] ?? "border-zinc-500/20 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300";
}

function paymentStatusClass(status: string) {
  const s = status.toLowerCase();
  const map: Record<string, string> = {
    pending: "border-zinc-400/30 bg-zinc-200/60 text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-200",
    collected: "border-emerald-500/25 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
    failed: "border-red-500/25 bg-red-500/10 text-red-900 dark:text-red-200",
    refunded: "border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-200",
  };
  return map[s] ?? "border-zinc-500/20 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300";
}

function labelize(s: string) {
  if (!s) return "—";
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

function LineItem({ item, skuLabel }: { item: OrderItemDTO; skuLabel: string }) {
  return (
    <div className="flex gap-4 border-b border-zinc-100 py-6 last:border-0 sm:gap-5 dark:border-zinc-800/80">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt=""
            width={80}
            height={96}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wider text-zinc-400">
            Louve
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-light text-zinc-900 dark:text-zinc-50">{item.product_title}</p>
        {item.variant_title ? (
          <p className="mt-1 text-sm text-zinc-500">{item.variant_title}</p>
        ) : null}
        <p className="mt-2 text-xs text-zinc-400">
          {skuLabel}: <span className="font-mono text-zinc-600 dark:text-zinc-400">{item.sku}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs text-zinc-500">
            {item.quantity} × {formatMoney(item.unit_price)}
          </p>
          <p className="tabular-nums text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {formatMoney(item.line_total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailClient({ paramsPromise }: Props) {
  const { id: idParam } = use(paramsPromise);
  const pathname = usePathname();
  const router = useRouter();
  const m = useMessages();
  const { user, loading: authLoading } = useAuth();
  const { getOrder, simulateCheckout, cancelOrder } = useOrder();

  const orderId = Number.parseInt(idParam, 10);
  const idValid = Number.isFinite(orderId) && orderId > 0;

  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [cancelBusy, setCancelBusy] = useState(false);

  const loadOrder = useCallback(async () => {
    if (!idValid) {
      setLoading(false);
      setError("Invalid order.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getOrder(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setOrder(null);
        setError(res.message ?? "Order not found.");
      }
    } catch (e) {
      setOrder(null);
      setError(e instanceof Error ? e.message : "Could not load order.");
    } finally {
      setLoading(false);
    }
  }, [getOrder, orderId, idValid]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(buildLoginHref(pathname || `/account/orders/${idParam}`));
    }
  }, [authLoading, user, router, pathname, idParam]);

  useEffect(() => {
    if (!user) return;
    void loadOrder();
  }, [user, loadOrder]);

  async function onConfirmPayment() {
    if (!idValid) return;
    setCheckoutBusy(true);
    setError(null);
    try {
      const res = await simulateCheckout(orderId, { confirm: true });
      if (res.success && res.data) {
        setOrder(res.data);
        setCheckoutOpen(false);
      } else {
        setError(res.message ?? "Payment could not be completed.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment could not be completed.");
    } finally {
      setCheckoutBusy(false);
    }
  }

  async function onCancelOrder() {
    if (!idValid) return;
    setCancelBusy(true);
    setError(null);
    try {
      const res = await cancelOrder(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError(res.message ?? "Could not cancel order.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not cancel order.");
    } finally {
      setCancelBusy(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm tracking-wide text-zinc-500">{m.common.loading}…</p>
      </div>
    );
  }

  if (!user) return null;

  const showPayNow =
    order &&
    order.status.toLowerCase() === "pending" &&
    order.payment_status.toLowerCase() === "pending";

  const showCancel =
    order &&
    (order.status.toLowerCase() === "pending" || order.status.toLowerCase() === "confirmed");

  return (
    <div className="relative mx-auto max-w-3xl px-3 py-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:px-4 sm:py-10 md:px-6 md:py-12">
      <Link
        href="/account/orders"
        className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-200"
      >
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M7 2L3 6l4 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to orders
      </Link>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm tracking-wide text-zinc-500">{m.common.loading}…</p>
        </div>
      ) : error && !order ? (
        <div
          className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center text-sm text-red-800 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : order ? (
        <>
          {error && (
            <div
              className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-800 dark:text-red-200"
              role="alert"
            >
              {error}
            </div>
          )}

          <header className="mb-10 border-b border-zinc-200/80 pb-10 dark:border-zinc-800">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">Order</p>
            <h1 className="mt-3 font-mono text-xl tracking-wide text-zinc-900 dark:text-zinc-50">
              {order.order_number}
            </h1>
            <p className="mt-4 text-sm text-zinc-500">{formatOrderDate(order.created_at)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                  orderStatusClass(order.status),
                )}
              >
                {labelize(order.status)}
              </span>
              <span
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                  paymentStatusClass(order.payment_status),
                )}
              >
                Payment: {labelize(order.payment_status)}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {showPayNow && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setCheckoutOpen(true)}
                  className="h-11 min-h-[44px] w-full rounded-full bg-zinc-900 px-6 text-xs uppercase tracking-[0.15em] text-white hover:bg-zinc-800 sm:h-9 sm:min-h-0 sm:w-auto dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 touch-manipulation"
                >
                  Pay now
                </Button>
              )}
              {showCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={cancelBusy}
                  onClick={() => void onCancelOrder()}
                  className="h-11 min-h-[44px] w-full rounded-full border-zinc-300 px-6 text-xs uppercase tracking-[0.15em] text-zinc-700 sm:h-9 sm:min-h-0 sm:w-auto dark:border-zinc-600 dark:text-zinc-300 touch-manipulation"
                >
                  {cancelBusy ? "Cancelling…" : "Cancel order"}
                </Button>
              )}
            </div>
          </header>

          <section className="mb-10">
            <h2 className="text-lg font-light tracking-tight text-zinc-900 dark:text-zinc-50">
              Items
            </h2>
            <div className="mt-2 divide-y divide-zinc-100 dark:divide-zinc-800">
              {order.items.map((item) => (
                <LineItem key={item.id} item={item} skuLabel={m.catalog.sku} />
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950/40">
            <h2 className="text-lg font-light tracking-tight text-zinc-900 dark:text-zinc-50">
              Summary
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Subtotal</dt>
                <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">
                  {formatMoney(order.subtotal_amount)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-200/60 pt-3 dark:border-zinc-800">
                <dt className="font-medium text-zinc-800 dark:text-zinc-200">Total</dt>
                <dd className="tabular-nums text-lg font-light text-zinc-900 dark:text-zinc-50">
                  {formatMoney(order.total_amount)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-6 border-t border-zinc-200/80 pt-10 dark:border-zinc-800">
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                Payment method
              </h3>
              <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                {order.payment_method?.trim() ? order.payment_method : "—"}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">Notes</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {order.note?.trim() ? order.note : "No notes on this order."}
              </p>
            </div>
          </section>
        </>
      ) : null}

      {checkoutOpen && order && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-zinc-200/90 bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8 dark:border-zinc-700 dark:bg-zinc-950">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="checkout-title"
                  className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  Simulated checkout
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Complete or decline this test payment for order{" "}
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">{order.order_number}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !checkoutBusy && setCheckoutOpen(false)}
                className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={checkoutBusy}
                onClick={() => setCheckoutOpen(false)}
                className="h-10 rounded-full px-6"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={checkoutBusy}
                onClick={() => void onConfirmPayment()}
                className="h-10 rounded-full bg-zinc-900 px-6 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {checkoutBusy ? "Processing…" : "Confirm payment"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
