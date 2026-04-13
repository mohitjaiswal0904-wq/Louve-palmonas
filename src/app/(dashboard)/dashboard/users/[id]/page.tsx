"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createCsrApiClient } from "@/lib/client";
import { buildLoginHref } from "@/lib/auth/return-url";
import * as adminService from "@/services/admin.service";
import type { UserInsightsResponse, SessionLogEntry } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function isUnauthorized(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status: number }).status === 401;
}

function httpStatus(err: unknown): number {
  if (typeof err === "object" && err !== null && "status" in err) {
    const s = (err as { status: number }).status;
    return typeof s === "number" ? s : 0;
  }
  return 0;
}

export default function DashboardUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const [data, setData] = useState<UserInsightsResponse | null>(null);
  const [logs, setLogs] = useState<SessionLogEntry[]>([]);
  const [logPage, setLogPage] = useState(1);
  const [logTotalPages, setLogTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [logsLoading, setLogsLoading] = useState(false);

  const userId = Number(id);

  function loadLogs(page: number) {
    if (!id || Number.isNaN(userId)) return;
    setLogsLoading(true);
    adminService
      .getUserSessionLogs(client, userId, { page, limit: 25 })
      .then((res) => {
        if (res.success && res.data) {
          setLogs(res.data.logs);
          setLogPage(res.data.page);
          setLogTotalPages(res.data.total_pages);
        }
      })
      .catch((err: unknown) => {
        if (isUnauthorized(err)) router.replace(buildLoginHref(pathname || "/dashboard/users"));
      })
      .finally(() => setLogsLoading(false));
  }

  useEffect(() => {
    if (!id || Number.isNaN(userId)) return;
    setLoading(true);
    setLoadError(null);
    adminService
      .getUserInsights(client, userId)
      .then((res) => {
        if (res.success && res.data) setData(res.data);
        else setLoadError("Unexpected response from server.");
      })
      .catch((err: unknown) => {
        if (isUnauthorized(err)) router.replace(buildLoginHref(pathname || "/dashboard/users"));
        else if (httpStatus(err) === 404) {
          const msg = err instanceof Error ? err.message : "Not found.";
          setLoadError(
            msg.toLowerCase().includes("endpoint not found")
              ? "This route is not registered on the API process you are hitting. Rebuild and restart the Louve backend, then try again."
              : msg,
          );
        } else {
          setLoadError(err instanceof Error ? err.message : "Could not load user.");
        }
      })
      .finally(() => setLoading(false));
    loadLogs(1);
  }, [client, id, userId, pathname, router]);

  if (!id || Number.isNaN(userId)) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Link>
        <p className="text-sm text-muted-foreground">Invalid user id in URL.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Link>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Could not load user</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{loadError ?? "No data returned."}</p>
            <Link
              href="/dashboard/users"
              className="inline-flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-muted"
            >
              Return to user list
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const u = data.user;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard/users"
          aria-label="Back to users"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {u.profile?.display_name ?? u.phone}
          </h2>
          <p className="mt-0.5 font-mono text-sm text-muted-foreground">
            {u.user_code ? `${u.user_code} · ` : ""}
            {u.phone}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Orders</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{data.orders_count}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cart lines</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{data.cart_line_count}</p>
            <p className="text-xs text-muted-foreground">Qty {data.cart_total_qty}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Wishlist</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{data.wishlist_count}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Addresses</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{data.address_count}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium uppercase">{u.role}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Status</span>
              <span>{u.status}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Email</span>
              <span className="truncate text-right">{u.email ?? "—"}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Joined</span>
              <span className="tabular-nums">{new Date(u.created_at).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">API activity (session overview)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Counts from async request logs (catalog GETs + total events). Session logs below list each API
              call.
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground">Product API hits</p>
              <p className="text-lg font-semibold tabular-nums">{data.api_catalog_product_hits}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Collection API hits</p>
              <p className="text-lg font-semibold tabular-nums">{data.api_collection_hits}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total session events</p>
              <p className="text-lg font-semibold tabular-nums">{data.session_events_count}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.recent_orders.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recent_orders.map((o) => (
              <div
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm"
              >
                <div>
                  {o.order_code && (
                    <p className="font-mono text-xs text-muted-foreground">{o.order_code}</p>
                  )}
                  <p className="font-medium">{o.order_number}</p>
                </div>
                <div className="text-right text-xs">
                  <p>
                    {o.status} · {o.payment_status}
                  </p>
                  <p className="text-muted-foreground">
                    {o.currency} {o.total_amount}
                  </p>
                </div>
                <Link
                  href={`/dashboard/orders/${o.id}`}
                  className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm hover:bg-muted"
                >
                  Open
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Session log</CardTitle>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={logsLoading || logPage <= 1}
              onClick={() => loadLogs(logPage - 1)}
            >
              Newer
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={logsLoading || logPage >= logTotalPages}
              onClick={() => loadLogs(logPage + 1)}
            >
              Older
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {logsLoading && logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading logs…</p>
          ) : logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No API requests recorded for this user yet.</p>
          ) : (
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="pb-2 pr-2 font-medium">Time</th>
                  <th className="pb-2 pr-2 font-medium">Category</th>
                  <th className="pb-2 pr-2 font-medium">Method</th>
                  <th className="pb-2 pr-2 font-medium">Path</th>
                  <th className="pb-2 pr-2 font-medium">IP</th>
                  <th className="pb-2 pr-2 font-medium">HTTP</th>
                  <th className="pb-2 font-medium">ms</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row, idx) => (
                  <tr key={`${row.created_at}-${idx}`} className="border-b border-border/60 last:border-0">
                    <td className="py-1.5 pr-2 whitespace-nowrap tabular-nums">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="py-1.5 pr-2">{row.category}</td>
                    <td className="py-1.5 pr-2">{row.method}</td>
                    <td className="max-w-[280px] truncate py-1.5 pr-2 font-mono" title={row.path}>
                      {row.path}
                    </td>
                    <td className="py-1.5 pr-2 font-mono">{row.client_ip}</td>
                    <td className="py-1.5 pr-2 tabular-nums">{row.status_code}</td>
                    <td className="py-1.5 tabular-nums">{row.latency_ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
