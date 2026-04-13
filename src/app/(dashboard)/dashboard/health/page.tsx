"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  HardDrive,
  Server,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCsrApiClient } from "@/lib/client";
import { buildLoginHref } from "@/lib/auth/return-url";
import * as healthService from "@/services/health.service";
import type { BackendHealthData, FrontendHealthData } from "@/types/health";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/format";

const POLL_MS = 10_000;
const MAX_SAMPLES = 36;

function formatBytes(b: number): string {
  if (!Number.isFinite(b) || b <= 0) return "0 B";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let n = b;
  while (n >= 1024 && i < u.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n < 10 && i > 0 ? n.toFixed(2) : Math.round(n)} ${u[i]}`;
}

function formatClock(ts: number): string {
  return formatTime(ts, "en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function statusBadgeClass(s: string): string {
  switch (s) {
    case "up":
      return "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-400";
    case "degraded":
      return "bg-amber-500/15 text-amber-800 ring-amber-500/30 dark:text-amber-300";
    case "down":
      return "bg-red-500/15 text-red-700 ring-red-500/30 dark:text-red-400";
    default:
      return "bg-zinc-500/15 text-zinc-700 ring-zinc-500/30 dark:text-zinc-300";
  }
}

type TimeSample = { t: number; label: string; heapMb: number; goroutines: number };

type FeProbe = {
  ok: boolean;
  latencyMs: number;
  data: FrontendHealthData | null;
  error?: string;
};

function collectWarnings(data: BackendHealthData): string[] {
  const w: string[] = [];
  if (data.status === "down") w.push("Backend reports overall status: down.");
  else if (data.status === "degraded") w.push("Backend reports overall status: degraded.");

  const disk = data.system.disk;
  if (disk && disk.usedPercent >= 90) {
    w.push(`Root volume is ${disk.usedPercent.toFixed(1)}% full — critical.`);
  } else if (disk && disk.usedPercent >= 80) {
    w.push(`Root volume is ${disk.usedPercent.toFixed(1)}% full — consider freeing space.`);
  }

  for (const [name, c] of Object.entries(data.components)) {
    if (c.status === "down") w.push(`Component “${name}” is down${c.error ? `: ${c.error}` : ""}.`);
    else if (c.status === "degraded") {
      w.push(`Component “${name}” is degraded (elevated latency or pressure).`);
    }
  }
  const wait = data.components.mariadb?.details?.waitCount;
  if (typeof wait === "number" && wait > 0) {
    w.push(`Database connection pool had ${wait} waits — check pool sizing or load.`);
  }
  return w;
}

export default function DashboardHealthPage() {
  const pathname = usePathname();
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);

  const [loading, setLoading] = useState(true);
  const [backend, setBackend] = useState<BackendHealthData | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendHttpDown, setBackendHttpDown] = useState(false);
  const [lastFetchMs, setLastFetchMs] = useState<number | null>(null);
  const [samples, setSamples] = useState<TimeSample[]>([]);
  const [fe, setFe] = useState<FeProbe | null>(null);

  const probeFrontend = useCallback(async () => {
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const latencyMs = Math.round(
        typeof performance !== "undefined" ? performance.now() - t0 : 0,
      );
      const text = await res.text();
      let data: FrontendHealthData | null = null;
      try {
        data = text ? (JSON.parse(text) as FrontendHealthData) : null;
      } catch {
        data = null;
      }
      setFe({
        ok: res.ok,
        latencyMs,
        data,
        error: res.ok ? undefined : `HTTP ${res.status}`,
      });
    } catch (e) {
      setFe({
        ok: false,
        latencyMs: 0,
        data: null,
        error: e instanceof Error ? e.message : "probe failed",
      });
    }
  }, []);

  const loadBackend = useCallback(async () => {
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    const result = await healthService.fetchBackendHealth(client);
    const elapsed = Math.round(
      typeof performance !== "undefined" ? performance.now() - t0 : 0,
    );
    setLastFetchMs(elapsed);

    if (result.kind === "error") {
      if (result.httpStatus === 401) {
        router.replace(buildLoginHref(pathname || "/dashboard/health"));
        return;
      }
      setBackend(null);
      setBackendError(result.message);
      setBackendHttpDown(false);
      return;
    }

    setBackendError(null);
    setBackend(result.data);
    setBackendHttpDown(result.kind === "down");

    const bytes = result.data.system.memoryAllocBytes;
    if (typeof bytes === "number") {
      const heapMb = bytes / (1024 * 1024);
      setSamples((prev) => {
        const next = [
          ...prev,
          {
            t: Date.now(),
            label: formatClock(Date.now()),
            heapMb: Math.round(heapMb * 100) / 100,
            goroutines: result.data.system.goroutines,
          },
        ];
        return next.length > MAX_SAMPLES ? next.slice(-MAX_SAMPLES) : next;
      });
    }
  }, [client, pathname, router]);

  useEffect(() => {
    let alive = true;
    async function first() {
      setLoading(true);
      await Promise.all([loadBackend(), probeFrontend()]);
      if (alive) setLoading(false);
    }
    void first();
    const id = window.setInterval(() => {
      void loadBackend();
      void probeFrontend();
    }, POLL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [loadBackend, probeFrontend]);

  const warnings = backend ? collectWarnings(backend) : [];

  const dbPoolData = useMemo(() => {
    const m = backend?.components?.mariadb?.details;
    if (!m) return [];
    return [
      { name: "Open", value: Number(m.openConns) || 0 },
      { name: "In use", value: Number(m.inUse) || 0 },
      { name: "Idle", value: Number(m.idle) || 0 },
      { name: "Max", value: Number(m.maxOpen) || 0 },
    ];
  }, [backend]);

  const diskPie = useMemo(() => {
    const d = backend?.system?.disk;
    if (!d || !d.totalBytes) return [];
    return [
      { name: "Used", value: d.usedBytes, fill: "#f97316" },
      { name: "Free", value: d.freeBytes, fill: "#22c55e" },
    ];
  }, [backend]);

  const componentRows = useMemo(() => {
    if (!backend) return [];
    return Object.entries(backend.components).map(([name, c]) => ({
      name,
      status: c.status,
      latency: c.latency,
      error: c.error,
    }));
  }, [backend]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-48 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-40 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-40 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
        </div>
        <div className="h-72 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          System health
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Backend runtime (Go API) and Next.js frontend probes. Refreshes every{" "}
          {POLL_MS / 1000}s.
        </p>
      </div>

      {warnings.length > 0 && (
        <div
          className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
          role="alert"
        >
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <ul className="list-inside list-disc space-y-1">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {backendError && !backend && (
        <div
          className="flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-950 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-100"
          role="alert"
        >
          <XCircle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
          <p>Could not load backend health: {backendError}</p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-zinc-200/80 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Server className="size-4 text-violet-600 dark:text-violet-400" />
              Backend (Louve API)
            </CardTitle>
            {backend && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  statusBadgeClass(backend.status),
                )}
              >
                {backend.status}
                {backendHttpDown ? " · HTTP 503" : ""}
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {backend ? (
              <>
                <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500">Version</span>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{backend.version}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500">Environment</span>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{backend.env}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500">Uptime</span>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{backend.uptime}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500">BFF round-trip</span>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {lastFetchMs != null ? `${lastFetchMs} ms` : "—"}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Last API timestamp: {backend.timestamp}
                </p>
              </>
            ) : (
              <p className="text-zinc-500">No backend payload yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200/80 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Activity className="size-4 text-sky-600 dark:text-sky-400" />
              Frontend (Next.js)
            </CardTitle>
            {fe?.ok ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-500/30 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                up
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-500/30 dark:text-red-400">
                <XCircle className="size-3.5" />
                issue
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {fe ? (
              <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500">Probe latency</span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{fe.latencyMs} ms</p>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500">Node</span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {fe.data?.node ?? "—"}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-500 dark:text-zinc-500">NODE_ENV</span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {fe.data?.environment ?? "—"}
                  </p>
                </div>
                {fe.error && (
                  <p className="col-span-2 text-xs text-red-600 dark:text-red-400">{fe.error}</p>
                )}
              </div>
            ) : (
              <p className="text-zinc-500">No frontend probe yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {backend && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-zinc-200/80 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-base">Go heap (live samples)</CardTitle>
                <p className="text-xs text-zinc-500">
                  Allocated heap from runtime.MemStats, polled every {POLL_MS / 1000}s.
                </p>
              </CardHeader>
              <CardContent className="h-64">
                {samples.length >= 2 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={samples}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                      <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#71717a" />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        stroke="#71717a"
                        label={{ value: "MB", angle: -90, position: "insideLeft", fontSize: 10 }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid rgb(228 228 231)",
                          fontSize: 12,
                        }}
                        formatter={(v) => [`${Number(v)} MB`, "Heap"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="heapMb"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                        name="Heap MB"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-full items-center justify-center text-sm text-zinc-500">
                    Collecting samples… ({samples.length}/{2} needed)
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-200/80 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="size-4" />
                  MariaDB pool
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                {dbPoolData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dbPoolData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#71717a" />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10 }} stroke="#71717a" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Connections" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-full items-center justify-center text-sm text-zinc-500">
                    No database metrics in payload.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-zinc-200/80 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <HardDrive className="size-4" />
                  Root volume ({backend.system.disk?.path ?? "/"})
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                {diskPie.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diskPie}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={56}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {diskPie.map((e) => (
                          <Cell key={e.name} fill={e.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => formatBytes(Number(v))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-full items-center justify-center text-sm text-zinc-500">
                    Disk metrics unavailable (non-Unix host or snapshot failed).
                  </p>
                )}
                {backend.system.disk && (
                  <p className="text-center text-xs text-zinc-500">
                    {backend.system.disk.usedPercent.toFixed(1)}% used ·{" "}
                    {formatBytes(backend.system.disk.usedBytes)} /{" "}
                    {formatBytes(backend.system.disk.totalBytes)}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-200/80 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cpu className="size-4" />
                  Runtime & OS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <div className="flex justify-between gap-4 border-b border-zinc-100 py-1 dark:border-zinc-800">
                  <span className="text-zinc-500">Host</span>
                  <span className="text-right font-mono text-xs">{backend.system.hostname}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 py-1 dark:border-zinc-800">
                  <span className="text-zinc-500">Go</span>
                  <span className="text-right font-mono text-xs">{backend.system.goVersion}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 py-1 dark:border-zinc-800">
                  <span className="text-zinc-500">Platform</span>
                  <span className="text-right font-mono text-xs">
                    {backend.system.os} / {backend.system.arch}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 py-1 dark:border-zinc-800">
                  <span className="text-zinc-500">CPUs · goroutines</span>
                  <span>
                    {backend.system.numCpu} · {backend.system.goroutines}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-zinc-100 py-1 dark:border-zinc-800">
                  <span className="text-zinc-500">Memory (alloc / total / sys)</span>
                  <span className="text-right text-xs">
                    {backend.system.memoryAlloc} · {backend.system.memoryTotal} ·{" "}
                    {backend.system.memorySys}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1">
                  <span className="text-zinc-500">GC cycles</span>
                  <span>{backend.system.gcCycles}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-200/80 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-base">Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                      <th className="pb-2 pr-4 font-medium">Name</th>
                      <th className="pb-2 pr-4 font-medium">Status</th>
                      <th className="pb-2 pr-4 font-medium">Latency</th>
                      <th className="pb-2 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentRows.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-zinc-100 dark:border-zinc-800/80"
                      >
                        <td className="py-2 pr-4 font-medium capitalize">{row.name}</td>
                        <td className="py-2 pr-4">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                              statusBadgeClass(row.status),
                            )}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                          {row.latency ?? "—"}
                        </td>
                        <td className="py-2 text-xs text-zinc-600 dark:text-zinc-400">
                          {row.error ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(() => {
                const pool = backend.components.redis?.details?.pool;
                if (pool == null || typeof pool !== "object") return null;
                return (
                  <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-xs dark:bg-zinc-900/50">
                    <p className="mb-1 font-medium text-zinc-700 dark:text-zinc-300">Redis client pool</p>
                    <pre className="overflow-x-auto font-mono text-zinc-600 dark:text-zinc-400">
                      {JSON.stringify(pool, null, 2)}
                    </pre>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
