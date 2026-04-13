"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createCsrApiClient } from "@/lib/client";
import { buildLoginHref } from "@/lib/auth/return-url";
import * as adminService from "@/services/admin.service";
import type { AnalyticsOverviewResponse, DashboardStatsResponse } from "@/types";
import {
  BarChart3,
  Box,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  pending: "#eab308",
  confirmed: "#3b82f6",
  processing: "#6366f1",
  shipped: "#a855f7",
  delivered: "#22c55e",
  cancelled: "#ef4444",
  refunded: "#71717a",
};
const PIE_COLORS = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ef4444", "#6366f1", "#71717a"];

function isUnauthorized(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status: number }).status === 401;
}

export default function DashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getDashboardStats(client),
      adminService.getAnalyticsOverview(client, 30),
    ])
      .then(([statsRes, analyticsRes]) => {
        if (statsRes.success && statsRes.data) setStats(statsRes.data);
        if (analyticsRes.success && analyticsRes.data) setAnalytics(analyticsRes.data);
      })
      .catch((err: unknown) => {
        if (isUnauthorized(err)) router.replace(buildLoginHref(pathname || "/dashboard"));
      })
      .finally(() => setLoading(false));
  }, [client, router, pathname]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-40 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-72 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total users", value: stats?.total_users ?? 0, icon: Users, iconClass: "text-blue-600 dark:text-blue-400", href: "/dashboard/users" },
    { label: "Total orders", value: stats?.total_orders ?? 0, icon: ShoppingCart, iconClass: "text-emerald-600 dark:text-emerald-400", href: "/dashboard/orders" },
    { label: "Revenue", value: formatCurrency(stats?.total_revenue ?? 0), icon: TrendingUp, iconClass: "text-amber-600 dark:text-amber-400", href: "/dashboard/analytics" },
    { label: "Products", value: stats?.total_products ?? 0, icon: Box, iconClass: "text-violet-600 dark:text-violet-400", href: "/dashboard/products" },
  ];

  const revenueData = (analytics?.revenue ?? []).map((d) => ({
    ...d,
    date: formatShortDate(d.date),
  }));

  const orderStatusData = analytics?.orders_by_status ?? [];
  const userGrowthData = (analytics?.user_growth ?? []).map((d) => ({
    ...d,
    date: formatShortDate(d.date),
  }));
  const topProducts = analytics?.top_products ?? [];
  const recentOrders = analytics?.recent_orders ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Store performance at a glance &mdash; last 30 days
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((c) => (
          <Link key={c.label} href={c.href} className="group">
            <Card size="sm" className="shadow-sm transition-shadow group-hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </CardTitle>
                <c.icon className={`size-4 shrink-0 ${c.iconClass}`} aria-hidden />
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold tabular-nums tracking-tight">{c.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue trend */}
        <Card className="shadow-sm lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Revenue trend</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e4e4e7" }}
                    formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">No revenue data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Order status */}
        <Card className="shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Orders by status</CardTitle>
          </CardHeader>
          <CardContent>
            {orderStatusData.length > 0 ? (
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <ResponsiveContainer width={160} height={160} className="shrink-0">
                  <PieChart>
                    <Pie data={orderStatusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={2}>
                      {orderStatusData.map((entry, i) => (
                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {orderStatusData.map((s) => (
                    <div key={s.status} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ background: STATUS_COLORS[s.status] ?? "#71717a" }}
                        />
                        <span className="capitalize">{s.status}</span>
                      </div>
                      <span className="tabular-nums font-medium">{s.count}</span>
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

      {/* Charts row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* User growth */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">User registrations</CardTitle>
            <Link href="/dashboard/users" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-muted-foreground")}>
              View all <ArrowRight className="ml-1 size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {userGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={userGrowthData}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">No user data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Top selling products</CardTitle>
            <Link href="/dashboard/products" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-muted-foreground")}>
              View all <ArrowRight className="ml-1 size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.slice(0, 5).map((p, i) => (
                  <div key={p.product_id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium tabular-nums">
                      {i + 1}
                    </span>
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="h-9 w-9 shrink-0 rounded-md object-cover" />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">—</div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.product_title}</p>
                      <p className="text-xs text-muted-foreground">{p.total_qty} sold · {p.order_count} orders</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold tabular-nums">₹{p.revenue.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">No sales data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent orders</CardTitle>
            <Link href="/dashboard/orders" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-muted-foreground")}>
              View all <ArrowRight className="ml-1 size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-3 sm:-mx-4">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Order #</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Status</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Payment</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Total</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
                        <Link href={`/dashboard/orders/${o.id}`} className="hover:underline">{o.order_number}</Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs capitalize">{o.status}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs">{o.payment_status}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 tabular-nums font-medium">{o.currency} {o.total_amount}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs tabular-nums">{new Date(o.created_at).toLocaleDateString()}</td>
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

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  } catch {
    return `₹${n.toFixed(0)}`;
  }
}

function formatShortDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}
