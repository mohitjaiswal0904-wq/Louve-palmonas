"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminOrderResponse } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  "",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  refunded: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function DashboardOrdersPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [orders, setOrders] = useState<AdminOrderResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(
    (p: number, status: string) => {
      setLoading(true);
      adminService
        .listOrders(client, { page: p, limit: 20, status: status || undefined })
        .then((res) => {
          if (res.success && res.data) {
            setOrders(res.data.orders);
            setTotal(res.data.total);
            setPage(res.data.page);
            setTotalPages(res.data.total_pages);
          }
        })
        .finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => {
    fetchOrders(1, "");
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} order{total === 1 ? "" : "s"} total
            {statusFilter ? ` · filtered by ${statusFilter}` : ""}
          </p>
        </div>
        <label className="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[11rem]">
          <span className="text-xs font-medium text-muted-foreground">Status</span>
          <select
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-10"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              fetchOrders(1, e.target.value);
            }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s || "all"} value={s}>
                {s || "All statuses"}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No orders found.</p>
        ) : (
          orders.map((o) => (
            <Card key={o.id} size="sm" className="shadow-sm">
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">{o.order_number}</p>
                    <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                      User #{o.user_id}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[o.status] ?? ""}`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{o.payment_status}</span>
                  <span>{o.item_count} items</span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t pt-3">
                  <div>
                    <p className="text-sm font-semibold tabular-nums">
                      {o.currency} {o.total_amount}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "inline-flex min-h-10 items-center justify-center px-4",
                    )}
                  >
                    View
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Tablet + desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border bg-card shadow-sm md:block">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3 font-medium">Order #</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">User ID</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Payment</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Items</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Total</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Date</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b last:border-0 hover:bg-muted/40 dark:hover:bg-zinc-800/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{o.order_number}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{o.user_id}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[o.status] ?? ""}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{o.payment_status}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{o.item_count}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums font-medium">
                    {o.currency} {o.total_amount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/dashboard/orders/${o.id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 text-xs")}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2 sm:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page <= 1 || loading}
              onClick={() => fetchOrders(page - 1, statusFilter)}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page >= totalPages || loading}
              onClick={() => fetchOrders(page + 1, statusFilter)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
