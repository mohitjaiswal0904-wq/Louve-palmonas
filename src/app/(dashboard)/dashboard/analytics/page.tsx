"use client";

import { useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AnalyticsOverviewResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ef4444", "#6366f1", "#71717a", "#f97316"];

const STATUS_COLORS: Record<string, string> = {
  pending: "#eab308",
  confirmed: "#3b82f6",
  processing: "#6366f1",
  shipped: "#a855f7",
  delivered: "#22c55e",
  cancelled: "#ef4444",
  refunded: "#71717a",
};

type Range = 7 | 14 | 30 | 90;

export default function AnalyticsPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [data, setData] = useState<AnalyticsOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<Range>(30);

  useEffect(() => {
    setLoading(true);
    adminService
      .getAnalyticsOverview(client, range)
      .then((res) => {
        if (res.success && res.data) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [client, range]);

  const ranges: { label: string; value: Range }[] = [
    { label: "7d", value: 7 },
    { label: "14d", value: 14 },
    { label: "30d", value: 30 },
    { label: "90d", value: 90 },
  ];

  const revenueData = (data?.revenue ?? []).map((d) => ({
    ...d,
    date: fmtDate(d.date),
  }));
  const userGrowthData = (data?.user_growth ?? []).map((d) => ({
    ...d,
    date: fmtDate(d.date),
  }));
  const ordersByStatus = data?.orders_by_status ?? [];
  const topProducts = data?.top_products ?? [];

  const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = revenueData.reduce((a, b) => a + b.order_count, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalNewUsers = userGrowthData.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Analytics</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed performance metrics for the selected period
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border p-1">
          {ranges.map((r) => (
            <Button
              key={r.value}
              type="button"
              size="sm"
              variant={range === r.value ? "default" : "ghost"}
              className="h-8 px-3 text-xs"
              onClick={() => setRange(r.value)}
              disabled={loading}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          ))}
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card size="sm" className="shadow-sm">
              <CardContent className="pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Period revenue</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">₹{totalRevenue.toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>
            <Card size="sm" className="shadow-sm">
              <CardContent className="pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Orders placed</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{totalOrders}</p>
              </CardContent>
            </Card>
            <Card size="sm" className="shadow-sm">
              <CardContent className="pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Avg order value</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">₹{avgOrderValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
            <Card size="sm" className="shadow-sm">
              <CardContent className="pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">New users</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{totalNewUsers}</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue + orders combined chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Revenue &amp; orders over time</CardTitle>
            </CardHeader>
            <CardContent>
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGradA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e4e4e7" }} formatter={(v, name) => [name === "revenue" ? `₹${Number(v).toLocaleString("en-IN")}` : v, name === "revenue" ? "Revenue" : "Orders"]} />
                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGradA)" />
                    <Line yAxisId="right" type="monotone" dataKey="order_count" stroke="#22c55e" strokeWidth={2} dot={false} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-20 text-center text-sm text-muted-foreground">No revenue data in this period</p>
              )}
            </CardContent>
          </Card>

          {/* Row: User growth + order status */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">New user registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {userGrowthData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Signups" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-16 text-center text-sm text-muted-foreground">No registrations in this period</p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Order status breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {ordersByStatus.length > 0 ? (
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <ResponsiveContainer width={180} height={180} className="shrink-0">
                      <PieChart>
                        <Pie data={ordersByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={2}>
                          {ordersByStatus.map((s, i) => (
                            <Cell key={s.status} fill={STATUS_COLORS[s.status] ?? PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {ordersByStatus.map((s) => (
                        <div key={s.status} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="inline-block h-3 w-3 rounded-full" style={{ background: STATUS_COLORS[s.status] ?? "#71717a" }} />
                            <span className="capitalize">{s.status}</span>
                          </div>
                          <span className="tabular-nums font-semibold">{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="py-16 text-center text-sm text-muted-foreground">No orders yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top products bar chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Top products by quantity sold</CardTitle>
            </CardHeader>
            <CardContent>
              {topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height={Math.max(200, topProducts.length * 40)}>
                  <BarChart data={topProducts.slice(0, 10)} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="product_title" tick={{ fontSize: 11 }} width={180} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v, name) => [name === "revenue" ? `₹${Number(v).toLocaleString("en-IN")}` : v, name === "total_qty" ? "Qty sold" : String(name)]} />
                    <Bar dataKey="total_qty" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Qty sold" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">No sales data yet</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function fmtDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}
