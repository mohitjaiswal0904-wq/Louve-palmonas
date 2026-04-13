"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Globe2, MousePointerClick, UserCheck, Users } from "lucide-react";

import { createCsrApiClient } from "@/lib/client";
import { buildLoginHref } from "@/lib/auth/return-url";
import * as adminService from "@/services/admin.service";
import type { SessionOverviewResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const PERIOD_OPTIONS = [7, 14, 30, 90] as const;

const CATEGORY_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#64748b",
  "#84cc16",
  "#6366f1",
];

function isUnauthorized(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status: number }).status === 401;
}

function formatInt(n: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

export default function DashboardSessionsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<SessionOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    (d: number) => {
      setLoading(true);
      adminService
        .getSessionOverview(client, d)
        .then((res) => {
          if (res.success && res.data) setData(res.data);
        })
        .catch((err: unknown) => {
          if (isUnauthorized(err)) router.replace(buildLoginHref(pathname || "/dashboard/sessions"));
        })
        .finally(() => setLoading(false));
    },
    [client, pathname, router],
  );

  useEffect(() => {
    load(days);
  }, [load, days]);

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
      </div>
    );
  }

  const overview = data;

  const dayChartData = useMemo(() => {
    if (!overview?.by_day) return [];
    return overview.by_day.map((p) => ({
      ...p,
      label_short: p.label,
    }));
  }, [overview]);

  const hourRecentData = overview?.by_hour_recent ?? [];
  const hourOfDayData = (overview?.by_hour_of_day ?? []).map((p) => ({
    ...p,
    label: `${String(p.hour).padStart(2, "0")}:00`,
  }));
  const categoryData = overview?.by_category ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Sessions over time</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            API traffic logged asynchronously from your storefront and admin (same pipeline as per-user session
            logs). Compare volume, unique IPs, and signed-in activity—similar to Shopify admin analytics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((d) => (
            <Button
              key={d}
              type="button"
              size="sm"
              variant={days === d ? "default" : "outline"}
              className="min-h-9"
              onClick={() => setDays(d)}
            >
              {d}d
            </Button>
          ))}
        </div>
      </div>

      {!overview || overview.total_requests === 0 ? (
        <Card className="border-dashed shadow-sm">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            <p className="font-medium text-foreground">No session data yet</p>
            <p className="mt-2">
              Once the API receives traffic, requests appear here (table <code className="rounded bg-muted px-1">api_request_logs</code>
              ). Open the storefront or dashboard with the backend running to populate charts.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  API requests
                </CardTitle>
                <MousePointerClick className="size-4 text-violet-500" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(overview.total_requests)}</p>
                <p className="text-xs text-muted-foreground">
                  ~{overview.avg_requests_per_day.toFixed(1)} / day · {overview.period_days}d window
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Unique IPs
                </CardTitle>
                <Globe2 className="size-4 text-sky-500" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(overview.unique_ips)}</p>
                <p className="text-xs text-muted-foreground">Approx. visitor endpoints hitting the API</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Logged-in users
                </CardTitle>
                <UserCheck className="size-4 text-emerald-500" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(overview.distinct_users)}</p>
                <p className="text-xs text-muted-foreground">Distinct user IDs in the window</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Guest requests
                </CardTitle>
                <Users className="size-4 text-amber-500" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(overview.guest_requests)}</p>
                <p className="text-xs text-muted-foreground">Calls without auth context</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Traffic by day</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Request volume and unique IPs per calendar day (rolling {overview.period_days} days).
                </p>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dayChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 11 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="requests"
                      name="Requests"
                      fill="#8b5cf6"
                      fillOpacity={0.25}
                      stroke="#7c3aed"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="unique_ips"
                      name="Unique IPs"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Last 48 hours (hourly)</CardTitle>
                <p className="text-xs text-muted-foreground">
                  When traffic spikes during the day—useful for deployments and campaigns.
                </p>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={hourRecentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 9 }}
                      interval="preserveStartEnd"
                      minTickGap={24}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      name="Requests"
                      fill="#22c55e"
                      fillOpacity={0.2}
                      stroke="#16a34a"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">By hour of day</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Total requests in each clock hour ({overview.period_days}d), server time—see peak shopping
                  hours.
                </p>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourOfDayData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="requests" name="Requests" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">By category</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Share of traffic: catalog, cart, auth, orders, admin, health, etc.
                </p>
              </CardHeader>
              <CardContent className="h-72">
                {categoryData.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No category breakdown.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="requests"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={88}
                        paddingAngle={1}
                        label={(props) => {
                          const name = String(props.name ?? "");
                          const pct = typeof props.percent === "number" ? props.percent * 100 : 0;
                          return `${name} (${pct.toFixed(0)}%)`;
                        }}
                      >
                        {categoryData.map((_, i) => (
                          <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [formatInt(Number(value)), "Requests"]}
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid hsl(var(--border))",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {dayChartData.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Signed-in vs guest (daily)</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dayChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="authenticated_requests"
                      name="Authenticated"
                      stackId="a"
                      fill="#22c55e"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar dataKey="guest_requests" name="Guest" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {loading && data && (
        <p className="text-center text-xs text-muted-foreground" aria-live="polite">
          Refreshing…
        </p>
      )}
    </div>
  );
}
