"use client";

import { useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { DashboardStatsResponse } from "@/types";
import { BarChart3, Box, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboardStats(client)
      .then((res) => {
        if (res.success && res.data) setStats(res.data);
      })
      .finally(() => setLoading(false));
  }, [client]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-40 animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800"
            />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Total users",
      value: stats?.total_users ?? 0,
      icon: Users,
      iconClass: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total orders",
      value: stats?.total_orders ?? 0,
      icon: ShoppingCart,
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats?.total_revenue ?? 0),
      icon: BarChart3,
      iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Products",
      value: stats?.total_products ?? 0,
      icon: Box,
      iconClass: "text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          High-level metrics for your store. Data updates when you load this page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} size="sm" className="shadow-sm">
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
        ))}
      </div>
    </div>
  );
}

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₹${n.toFixed(0)}`;
  }
}
