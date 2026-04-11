"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminOrderResponse } from "@/types";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = ["", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"];
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
      adminService.listOrders(client, { page: p, limit: 20, status: status || undefined }).then((res) => {
        if (res.success && res.data) {
          setOrders(res.data.orders);
          setTotal(res.data.total);
          setPage(res.data.page);
          setTotalPages(res.data.total_pages);
        }
      }).finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => { fetchOrders(1, ""); }, [fetchOrders]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Orders ({total})</h2>
        <select
          className="h-9 rounded-md border bg-white px-3 text-sm dark:bg-zinc-900"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); fetchOrders(1, e.target.value); }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s || "All statuses"}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">No orders found.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-4 py-3 font-mono text-xs">{o.order_number}</td>
                  <td className="px-4 py-3 tabular-nums">{o.user_id}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[o.status] ?? ""}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{o.payment_status}</td>
                  <td className="px-4 py-3 tabular-nums">{o.item_count}</td>
                  <td className="px-4 py-3 tabular-nums font-medium">{o.currency} {o.total_amount}</td>
                  <td className="px-4 py-3 text-xs tabular-nums">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/orders/${o.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => fetchOrders(page - 1, statusFilter)}>Previous</Button>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => fetchOrders(page + 1, statusFilter)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
