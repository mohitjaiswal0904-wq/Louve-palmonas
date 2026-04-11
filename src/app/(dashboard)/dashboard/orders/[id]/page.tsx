"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminOrderResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ALL_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"];

export default function DashboardOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const [order, setOrder] = useState<AdminOrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminService.getOrder(client, Number(id)).then((res) => {
      if (res.success && res.data) {
        setOrder(res.data);
        setNewStatus(res.data.status);
      }
    }).finally(() => setLoading(false));
  }, [client, id]);

  async function handleStatusUpdate() {
    if (!order || newStatus === order.status) return;
    setUpdating(true);
    const res = await adminService.updateOrderStatus(client, order.id, newStatus);
    if (res.success) {
      setOrder((prev) => prev ? { ...prev, status: newStatus } : prev);
    }
    setUpdating(false);
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading order...</div>;
  if (!order) return <div className="text-sm text-muted-foreground">Order not found.</div>;

  const addr = order.shipping_address;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push("/dashboard/orders")}>
          <ArrowLeft className="size-4" />
        </Button>
        <h2 className="text-lg font-semibold tracking-tight">Order {order.order_number}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border bg-white p-5 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-medium">Details</h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Status</dt><dd className="font-medium uppercase">{order.status}</dd>
              <dt className="text-muted-foreground">Payment</dt><dd>{order.payment_status}</dd>
              <dt className="text-muted-foreground">Method</dt><dd>{order.payment_method || "—"}</dd>
              <dt className="text-muted-foreground">Total</dt><dd className="font-semibold">{order.currency} {order.total_amount}</dd>
              <dt className="text-muted-foreground">Items</dt><dd>{order.item_count}</dd>
              <dt className="text-muted-foreground">User ID</dt><dd>{order.user_id}</dd>
              <dt className="text-muted-foreground">Created</dt><dd>{new Date(order.created_at).toLocaleString()}</dd>
            </dl>
          </div>

          <div className="rounded-lg border bg-white p-5 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-medium">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded border p-3">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.product_title} className="h-12 w-12 rounded object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{item.product_title}</p>
                    <p className="text-xs text-muted-foreground">{item.variant_title} &middot; SKU: {item.sku || "—"}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="tabular-nums">{item.quantity} &times; {item.currency} {item.unit_price}</p>
                    <p className="font-medium tabular-nums">{item.currency} {item.line_total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-white p-5 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-medium">Update Status</h3>
            <select
              className="mb-3 w-full rounded-md border bg-white px-3 py-2 text-sm dark:bg-zinc-900"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <Button className="w-full" size="sm" disabled={updating || newStatus === order.status} onClick={() => void handleStatusUpdate()}>
              {updating ? "Updating..." : "Update Status"}
            </Button>
          </div>

          {addr && addr.line1 && (
            <div className="rounded-lg border bg-white p-5 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-medium">Shipping Address</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                {addr.full_name && <p className="font-medium text-foreground">{addr.full_name}</p>}
                {addr.phone && <p>{addr.phone}</p>}
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>{[addr.city, addr.state, addr.postal_code].filter(Boolean).join(", ")}</p>
                {addr.country && <p>{addr.country}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
