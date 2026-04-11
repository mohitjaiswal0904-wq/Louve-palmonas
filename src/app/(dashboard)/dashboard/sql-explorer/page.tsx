"use client";

import { useMemo, useState, useCallback } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { SQLQueryResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Table2, BarChart3, Lightbulb, Copy, Check, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SUGGESTIONS = [
  { label: "Total orders count", query: "SELECT COUNT(*) AS total_orders FROM orders" },
  { label: "Orders by status", query: "SELECT status, COUNT(*) AS count FROM orders GROUP BY status ORDER BY count DESC" },
  { label: "Daily orders (last 30d)", query: "SELECT DATE(created_at) AS date, COUNT(*) AS orders FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(created_at) ORDER BY date" },
  { label: "Revenue by day", query: "SELECT DATE(created_at) AS date, SUM(CAST(total_amount AS DECIMAL(20,2))) AS revenue FROM orders WHERE payment_status = 'collected' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(created_at) ORDER BY date" },
  { label: "Top 10 products by sales", query: "SELECT product_title, SUM(quantity) AS total_sold, SUM(CAST(line_total AS DECIMAL(20,2))) AS revenue FROM order_items GROUP BY product_title ORDER BY total_sold DESC LIMIT 10" },
  { label: "Users with most orders", query: "SELECT user_id, COUNT(*) AS order_count, SUM(CAST(total_amount AS DECIMAL(20,2))) AS total_spent FROM orders GROUP BY user_id ORDER BY order_count DESC LIMIT 10" },
  { label: "Cart items per product", query: "SELECT product_id, COUNT(*) AS in_carts, SUM(quantity) AS total_qty FROM cart_items GROUP BY product_id ORDER BY in_carts DESC LIMIT 15" },
  { label: "Payment method breakdown", query: "SELECT COALESCE(payment_method, 'unknown') AS method, COUNT(*) AS count FROM orders GROUP BY payment_method ORDER BY count DESC" },
  { label: "Avg order value", query: "SELECT ROUND(AVG(CAST(total_amount AS DECIMAL(20,2))), 2) AS avg_order_value FROM orders WHERE payment_status = 'collected'" },
  { label: "User signups (last 30d)", query: "SELECT DATE(created_at) AS date, COUNT(*) AS signups FROM users WHERE is_deleted = false AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(created_at) ORDER BY date" },
  { label: "Orders with high value (>1000)", query: "SELECT order_number, total_amount, currency, status, created_at FROM orders WHERE CAST(total_amount AS DECIMAL(20,2)) > 1000 ORDER BY CAST(total_amount AS DECIMAL(20,2)) DESC LIMIT 20" },
  { label: "Tables in database", query: "SHOW TABLES" },
];

type ViewMode = "table" | "bar" | "line" | "pie";
const CHART_COLORS = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ef4444", "#6366f1", "#f97316", "#ec4899"];

export default function SQLExplorerPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SQLQueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ViewMode>("table");
  const [copied, setCopied] = useState(false);

  const execute = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await adminService.executeQuery(client, query.trim());
      if (res.success && res.data) {
        setResult(res.data);
        setView("table");
      } else {
        setError("Query failed. Check your syntax.");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Query execution failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [client, query]);

  function handleCopy() {
    if (!result) return;
    const csv = [
      result.columns.join(","),
      ...result.rows.map((r) => result.columns.map((c) => JSON.stringify(r[c] ?? "")).join(",")),
    ].join("\n");
    navigator.clipboard.writeText(csv).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const canChart = result && result.columns.length >= 2 && result.rows.length > 0;
  const numericCols = result?.columns.filter((c) => result.rows.some((r) => typeof r[c] === "number" || (!isNaN(Number(r[c])) && r[c] !== null && r[c] !== ""))) ?? [];
  const labelCol = result?.columns.find((c) => !numericCols.includes(c)) ?? result?.columns[0] ?? "col";

  const chartData = result?.rows.map((r) => {
    const row: Record<string, unknown> = { [labelCol]: String(r[labelCol] ?? "") };
    for (const nc of numericCols) {
      row[nc] = Number(r[nc]) || 0;
    }
    return row;
  }) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">SQL Explorer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run read-only SQL queries against your database. SELECT, SHOW, DESCRIBE, and EXPLAIN only.
        </p>
      </div>

      {/* Suggestions */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="size-4 text-amber-500" />
          <CardTitle className="text-base">Query suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                className="rounded-lg border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                onClick={() => setQuery(s.query)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="shadow-sm">
        <CardContent className="space-y-3 pt-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your SQL query here..."
            className="min-h-[8rem] w-full resize-y rounded-lg border border-input bg-background p-3 font-mono text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
            spellCheck={false}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                void execute();
              }
            }}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Press <kbd className="rounded border px-1 py-0.5 text-[10px] font-semibold">Ctrl</kbd> + <kbd className="rounded border px-1 py-0.5 text-[10px] font-semibold">Enter</kbd> to run
            </p>
            <Button
              type="button"
              onClick={() => void execute()}
              disabled={loading || !query.trim()}
              className="min-h-11 gap-2 sm:min-h-0"
            >
              <Play className="size-4" />
              {loading ? "Running..." : "Run query"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50 shadow-sm dark:border-red-900/50 dark:bg-red-950/20">
          <CardContent className="flex items-start gap-3 pt-4">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Query error</p>
              <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">
              Results ({result.count} row{result.count === 1 ? "" : "s"})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 rounded-lg border p-0.5">
                <button
                  type="button"
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === "table" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setView("table")}
                >
                  <Table2 className="size-3.5" />
                </button>
                {canChart && (
                  <>
                    <button
                      type="button"
                      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === "bar" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      onClick={() => setView("bar")}
                    >
                      <BarChart3 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === "line" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      onClick={() => setView("line")}
                    >
                      L
                    </button>
                    <button
                      type="button"
                      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === "pie" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      onClick={() => setView("pie")}
                    >
                      P
                    </button>
                  </>
                )}
              </div>
              <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs" onClick={handleCopy}>
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "CSV"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {view === "table" && (
              <div className="overflow-x-auto -mx-3 sm:-mx-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      {result.columns.map((col) => (
                        <th key={col} className="whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                        {result.columns.map((col) => (
                          <td key={col} className="whitespace-nowrap px-3 py-2 tabular-nums">
                            {row[col] === null || row[col] === undefined ? (
                              <span className="text-muted-foreground">NULL</span>
                            ) : (
                              String(row[col])
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {view === "bar" && canChart && (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey={labelCol} tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  {numericCols.map((nc, i) => (
                    <Bar key={nc} dataKey={nc} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "line" && canChart && (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey={labelCol} tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  {numericCols.map((nc, i) => (
                    <Line key={nc} type="monotone" dataKey={nc} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "pie" && canChart && numericCols.length > 0 && (
              <div className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={chartData} dataKey={numericCols[0]} nameKey={labelCol} cx="50%" cy="50%" outerRadius={110} innerRadius={55} paddingAngle={2}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
