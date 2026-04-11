"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminOrderResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ALL_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

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
    adminService
      .getOrder(client, Number(id))
      .then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
          setNewStatus(res.data.status);
        }
      })
      .finally(() => setLoading(false));
  }, [client, id]);

  async function handleStatusUpdate() {
    if (!order || newStatus === order.status) return;
    setUpdating(true);
    const res = await adminService.updateOrderStatus(client, order.id, newStatus);
    if (res.success) {
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
    }
    setUpdating(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="h-40 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
      </div>
    );
  }

  if (!order) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Order not found.
      </p>
    );
  }

  const addr = order.shipping_address;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0"
          aria-label="Back to orders"
          onClick={() => router.push("/dashboard/orders")}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Order {order.order_number}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Placed {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 text-sm sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium uppercase">{order.status}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">Payment</dt>
                  <dd>{order.payment_status}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">Method</dt>
                  <dd>{order.payment_method || "—"}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">Total</dt>
                  <dd className="font-semibold tabular-nums">
                    {order.currency} {order.total_amount}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="tabular-nums">{order.item_count}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-muted-foreground">User ID</dt>
                  <dd className="tabular-nums">{order.user_id}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Line items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.product_title}
                      className="h-16 w-16 shrink-0 rounded-md object-cover sm:h-14 sm:w-14"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{item.product_title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.variant_title} &middot; SKU: {item.sku || "—"}
                    </p>
                  </div>
                  <div className="text-left text-sm sm:text-right">
                    <p className="tabular-nums text-muted-foreground">
                      {item.quantity} &times; {item.currency} {item.unit_price}
                    </p>
                    <p className="font-medium tabular-nums">
                      {item.currency} {item.line_total}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Update status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">New status</span>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <Button
                type="button"
                className="min-h-11 w-full"
                size="sm"
                disabled={updating || newStatus === order.status}
                onClick={() => void handleStatusUpdate()}
              >
                {updating ? "Updating..." : "Update status"}
              </Button>
            </CardContent>
          </Card>

          {addr && addr.line1 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {addr.full_name && <p className="font-medium text-foreground">{addr.full_name}</p>}
                {addr.phone && <p>{addr.phone}</p>}
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>{[addr.city, addr.state, addr.postal_code].filter(Boolean).join(", ")}</p>
                {addr.country && <p>{addr.country}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
