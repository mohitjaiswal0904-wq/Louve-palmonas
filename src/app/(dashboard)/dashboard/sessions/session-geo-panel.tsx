"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Globe2, MapPin, MapPinned, Users } from "lucide-react";

import { SessionGeoMap, type SessionGeoMapHandle } from "@/components/dashboard/session-geo-map";
import { createCsrApiClient } from "@/lib/client";
import { getMapboxAccessToken } from "@/lib/config/env";
import { buildLoginHref } from "@/lib/auth/return-url";
import * as adminService from "@/services/admin.service";
import type { SessionGeoOverviewResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PERIOD_OPTIONS = [7, 14, 30, 90] as const;

function isUnauthorized(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status: number }).status === 401;
}

function formatInt(n: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

type Props = {
  days: number;
  onDaysChange: (d: number) => void;
};

export function SessionGeoPanel({ days, onDaysChange }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const [data, setData] = useState<SessionGeoOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<SessionGeoMapHandle>(null);
  const mapToken = getMapboxAccessToken();

  const load = useCallback(
    (d: number) => {
      setLoading(true);
      adminService
        .getSessionGeoOverview(client, d)
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

  const countryChart = useMemo(() => {
    const rows = data?.by_country ?? [];
    return rows.slice(0, 14).map((r) => ({
      name: r.country_name || r.country_code || "?",
      events: r.events,
      users: r.unique_users,
    }));
  }, [data]);

  const indiaStateChart = useMemo(() => {
    const rows = data?.by_region_india ?? [];
    return [...rows]
      .sort((a, b) => a.events - b.events)
      .slice(-18)
      .map((r) => ({
        state: r.region_name,
        events: r.events,
        users: r.unique_users,
      }));
  }, [data]);

  if (loading && !data) {
    return (
      <div className="space-y-4">
        <div className="h-64 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-72 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  const g = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Geography (signed-in sessions)</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Built from <code className="rounded bg-muted px-1">session_activities</code>: each row is an IP snapshot
            (login, IP change, or at most every 6h while active) with geolocation from the backend lookup. Guest
            storefront traffic is not included here—use “API traffic” for full request volume.
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
              onClick={() => onDaysChange(d)}
            >
              {d}d
            </Button>
          ))}
        </div>
      </div>

      {!g || g.total_events === 0 ? (
        <Card className="border-dashed shadow-sm">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            <p className="font-medium text-foreground">No geographic session data yet</p>
            <p className="mt-2">
              Sign in through the app so the API records IP + geo into <code className="rounded bg-muted px-1">session_activities</code>.
              Localhost IPs are marked private and usually have no coordinates—use a tunnel or staging with real
              client IPs to populate the map.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Activity rows
                </CardTitle>
                <MapPinned className="size-4 text-orange-600" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(g.total_events)}</p>
                <p className="text-xs text-muted-foreground">{g.period_days}d window · session_activities</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  With coordinates
                </CardTitle>
                <Globe2 className="size-4 text-sky-500" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(g.with_coordinates)}</p>
                <p className="text-xs text-muted-foreground">
                  {g.without_coordinates > 0
                    ? `${formatInt(g.without_coordinates)} private / unresolved`
                    : "All rows have lat/lon"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Unique users
                </CardTitle>
                <Users className="size-4 text-emerald-600" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(g.unique_users)}</p>
                <p className="text-xs text-muted-foreground">Distinct user_id in window</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Map buckets
                </CardTitle>
                <MapPin className="size-4 text-amber-600" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">{formatInt(g.map_points.length)}</p>
                <p className="text-xs text-muted-foreground">Lat/lon cells (weighted)</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">Traffic heat map</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Circle size reflects event count per ~0.01° cell. Click a dot for details.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => mapRef.current?.fitIndia()}>
                  Focus India
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => mapRef.current?.fitWorld()}>
                  Worldwide
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!mapToken ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Mapbox token missing</p>
                  <p className="mt-2 max-w-md">
                    Set <code className="rounded bg-muted px-1">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> in{" "}
                    <code className="rounded bg-muted px-1">.env.local</code> (public token, restrict by URL in
                    Mapbox). Restart Next.js after changing env.
                  </p>
                </div>
              ) : (
                <SessionGeoMap ref={mapRef} accessToken={mapToken} points={g.map_points} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">By country</CardTitle>
                <p className="text-xs text-muted-foreground">Events and distinct users per country code.</p>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countryChart} margin={{ top: 8, right: 8, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-28} textAnchor="end" height={70} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="events" name="Events" fill="#ea580c" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    <Bar dataKey="users" name="Users" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">India — state / region</CardTitle>
                <p className="text-xs text-muted-foreground">
                  From <code className="rounded bg-muted px-1">region_name</code> when country is IN (horizontal
                  “pyramid” style).
                </p>
              </CardHeader>
              <CardContent className="h-80">
                {indiaStateChart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No India-tagged rows in this window.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={indiaStateChart}
                      margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="state"
                        width={120}
                        tick={{ fontSize: 10 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid hsl(var(--border))",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="events" name="Events" fill="#b45309" radius={[0, 4, 4, 0]} maxBarSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Top cities</CardTitle>
              <p className="text-xs text-muted-foreground">Most frequent city labels in session_activities.</p>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-2 pr-3 font-medium">City</th>
                    <th className="pb-2 pr-3 font-medium">Region</th>
                    <th className="pb-2 pr-3 font-medium">Country</th>
                    <th className="pb-2 text-right font-medium tabular-nums">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {(g.top_cities ?? []).map((row, i) => (
                    <tr key={`${row.city}-${row.country_code}-${i}`} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-3 font-medium">{row.city}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{row.region_name || "—"}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{row.country_code}</td>
                      <td className="py-2 text-right tabular-nums">{formatInt(row.events)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}

      {loading && data && (
        <p className="text-center text-xs text-muted-foreground" aria-live="polite">
          Refreshing geography…
        </p>
      )}
    </div>
  );
}
