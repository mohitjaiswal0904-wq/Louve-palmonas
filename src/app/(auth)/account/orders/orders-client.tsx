"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PaginationBar } from "@/components/catalog/pagination-bar";
import { Button } from "@/components/ui/button";
import { useAuth, useMessages, useOrder } from "@/hooks";
import { buildLoginHref } from "@/lib/auth/return-url";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";
import type { OrderSummaryDTO, Pagination } from "@/types";

type FilterTab = "all" | "pending" | "confirmed" | "delivered" | "cancelled";

const FILTERS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function formatOrderDate(iso: string) {
  try {
    return formatDate(iso, "en-IN", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function formatMoney(amount: string, currency: string) {
  const n = Number(amount);
  if (Number.isNaN(n)) return `${amount} ${currency}`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
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

export default function OrdersClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const m = useMessages();
  const { listOrders, cancelOrder } = useOrder();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderSummaryDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(buildLoginHref("/account/orders"));
    }
  }, [authLoading, user, router]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listOrders({
        page,
        limit: 10,
        status: filter === "all" ? undefined : filter,
      });
      setOrders(res.data ?? []);
      setPagination(res.pagination);
    } catch (e) {
      setOrders([]);
      setPagination(null);
      setError(e instanceof Error ? e.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [listOrders, page, filter]);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user, fetchOrders]);

  function onFilterChange(next: FilterTab) {
    setFilter(next);
    setPage(1);
  }

  async function handleCancel(orderId: number) {
    setCancellingId(orderId);
    try {
      const res = await cancelOrder(orderId);
      if (res.success && res.data) {
        await fetchOrders();
      } else {
        setError(res.message ?? "Could not cancel order.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not cancel order.");
    } finally {
      setCancellingId(null);
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

  return (
    <div className="mx-auto max-w-4xl px-3 py-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:px-4 sm:py-10 md:px-6 md:py-12">
      <header className="mb-8 border-b border-zinc-200/80 pb-6 sm:mb-10 sm:pb-8 dark:border-zinc-800">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">Account</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Your orders
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Track shipments, review purchases, and manage open orders from one place.
        </p>
      </header>

      <div
        className="-mx-1 mb-6 flex gap-2 overflow-x-auto overflow-y-hidden border-b border-zinc-200/60 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible dark:border-zinc-800/80 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter orders by status"
      >
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            onClick={() => onFilterChange(key)}
            className={cn(
              "shrink-0 snap-start rounded-full border px-4 py-2.5 text-xs font-medium tracking-wide transition-colors touch-manipulation sm:py-1.5",
              filter === key
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-transparent bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div
          className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-800 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[32vh] items-center justify-center">
          <p className="text-sm tracking-wide text-zinc-500">{m.common.loading}…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/50 px-8 py-20 text-center dark:border-zinc-700 dark:bg-zinc-950/40">
          <svg
            className="mb-6 h-12 w-12 text-zinc-300 dark:text-zinc-600"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden
          >
            <rect x="8" y="12" width="32" height="28" rx="2" />
            <path d="M16 12V8h16v4" />
            <path d="M8 22h32" strokeLinecap="round" />
          </svg>
          <p className="text-lg font-light text-zinc-800 dark:text-zinc-200">No orders yet</p>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">
            When you place an order, it will appear here with status and tracking details.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
          >
            Continue shopping
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id}>
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-700">
                  <Link href={`/account/orders/${order.id}`} className="block px-4 py-5 pr-10 sm:px-6 sm:pr-14">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                          Order number
                        </p>
                        <p className="font-mono text-sm tracking-wide text-zinc-900 dark:text-zinc-100">
                          {order.order_number}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              orderStatusClass(order.status),
                            )}
                          >
                            {labelize(order.status)}
                          </span>
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              paymentStatusClass(order.payment_status),
                            )}
                          >
                            Payment: {labelize(order.payment_status)}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                          Total
                        </p>
                        <p className="mt-1 font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                          {formatMoney(order.total_amount.amount, order.total_amount.currency)}
                        </p>
                        <p className="mt-2 text-xs text-zinc-500">
                          {order.item_count} {order.item_count === 1 ? "item" : "items"}
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">{formatOrderDate(order.created_at)}</p>
                      </div>
                    </div>
                  </Link>
                  {(order.status === "pending" || order.status === "confirmed") && (
                    <div className="border-t border-zinc-100 px-5 py-3 dark:border-zinc-800/80 sm:px-6">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={cancellingId === order.id}
                        className="h-7 text-xs text-zinc-600 hover:text-red-700 dark:text-zinc-400 dark:hover:text-red-300"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void handleCancel(order.id);
                        }}
                      >
                        {cancellingId === order.id ? "Cancelling…" : "Cancel order"}
                      </Button>
                    </div>
                  )}
                  <span
                    className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-zinc-300 transition group-hover:text-zinc-500 sm:block"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        d="M9 6l6 6-6 6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {pagination && (
            <PaginationBar pagination={pagination} onPageChange={(p) => setPage(p)} />
          )}
        </>
      )}
    </div>
  );
}
