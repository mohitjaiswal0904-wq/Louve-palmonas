"use client";

import { useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { CartInsightsResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Package } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ef4444", "#6366f1", "#f97316", "#ec4899", "#14b8a6", "#64748b"];

export default function CartInsightsPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [data, setData] = useState<CartInsightsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getCartInsights(client)
      .then((res) => {
        if (res.success && res.data) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [client]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-48 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
      </div>
    );
  }

  const stats = data?.stats;
  const topProducts = data?.top_products ?? [];
  const pieData = topProducts.slice(0, 8).map((p) => ({ name: truncate(p.title, 30), value: p.cart_count }));
  const barData = topProducts.slice(0, 10).map((p) => ({ name: truncate(p.title, 25), qty: p.total_qty, carts: p.cart_count }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Cart insights</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Understand what customers are adding to their carts right now
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card size="sm" className="shadow-sm">
          <CardContent className="flex items-center gap-4 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Users with carts</p>
              <p className="text-2xl font-bold tabular-nums">{stats?.unique_users ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm" className="shadow-sm">
          <CardContent className="flex items-center gap-4 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Package className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unique line items</p>
              <p className="text-2xl font-bold tabular-nums">{stats?.total_items ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm" className="shadow-sm">
          <CardContent className="flex items-center gap-4 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <ShoppingCart className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total quantity</p>
              <p className="text-2xl font-bold tabular-nums">{stats?.total_quantity ?? 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Most added to cart (by quantity)</CardTitle>
          </CardHeader>
          <CardContent>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={Math.max(240, barData.length * 36)}>
                <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={160} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="qty" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Quantity" />
                  <Bar dataKey="carts" fill="#22c55e" radius={[0, 4, 4, 0]} name="In carts" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-20 text-center text-sm text-muted-foreground">No cart data available</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Cart distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <div className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-1.5">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="truncate">{d.name}</span>
                      </div>
                      <span className="shrink-0 tabular-nums font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="py-20 text-center text-sm text-muted-foreground">No cart data</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Products table */}
      {topProducts.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">All products in carts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:hidden">
              {topProducts.map((p) => (
                <div key={p.product_id} className="flex items-center gap-3 rounded-lg border p-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted text-xs">—</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      In {p.cart_count} carts · {p.total_qty} total qty
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block -mx-3 sm:-mx-4">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2 font-medium">Product</th>
                    <th className="px-4 py-2 font-medium">In carts</th>
                    <th className="px-4 py-2 font-medium">Total qty</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.product_id} className="border-b last:border-0">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt="" className="h-8 w-8 rounded-md object-cover" />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-xs">—</div>
                          )}
                          <span className="font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 tabular-nums font-medium">{p.cart_count}</td>
                      <td className="px-4 py-2.5 tabular-nums">{p.total_qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len) + "…" : str;
}
