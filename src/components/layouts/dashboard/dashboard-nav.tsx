"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Box, Database, LayoutDashboard, ShoppingCart, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Products", href: "/dashboard/products", icon: Box },
  { label: "Cart Insights", href: "/dashboard/cart-insights", icon: BarChart3 },
  { label: "SQL Explorer", href: "/dashboard/sql-explorer", icon: Database },
] as const;

export function getDashboardSectionTitle(pathname: string): string {
  const match = DASHBOARD_NAV.find(
    (n) => pathname === n.href || (n.href !== "/dashboard" && pathname.startsWith(n.href)),
  );
  return match?.label ?? "Dashboard";
}

type NavLinksProps = {
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
};

export function DashboardNavLinks({ onNavigate, className, linkClassName }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-0.5", className)} aria-label="Admin navigation">
      {DASHBOARD_NAV.map(({ label, href, icon: Icon }) => {
        const active =
          pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100",
              linkClassName,
            )}
          >
            <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
