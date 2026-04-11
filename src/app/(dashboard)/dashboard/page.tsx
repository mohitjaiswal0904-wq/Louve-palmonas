"use client";

import { useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { DashboardStatsResponse } from "@/types";
import { BarChart3, Box, ShoppingCart, Users } from "lucide-react";

export default function DashboardPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats(client).then((res) => {
      if (res.success && res.data) setStats(res.data);
    }).finally(() => setLoading(false));
  }, [client]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading stats...</div>;
  }

  const cards = [
    { label: "Total Users", value: stats?.total_users ?? 0, icon: Users, color: "text-blue-600" },
    { label: "Total Orders", value: stats?.total_orders ?? 0, icon: ShoppingCart, color: "text-green-600" },
    { label: "Revenue", value: formatCurrency(stats?.total_revenue ?? 0), icon: BarChart3, color: "text-amber-600" },
    { label: "Products", value: stats?.total_products ?? 0, icon: Box, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border bg-white p-5 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</p>
              <c.icon className={`size-4 ${c.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
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
