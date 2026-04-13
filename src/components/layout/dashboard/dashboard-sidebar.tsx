"use client";

import Link from "next/link";

import { DashboardNavLinks } from "./dashboard-nav";

export function DashboardSidebar() {
  return (
    <aside className="hidden h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r bg-white dark:bg-zinc-900 md:flex md:w-72">
      <div className="flex h-14 shrink-0 items-center border-b px-5">
        <Link
          href="/dashboard"
          className="text-sm font-semibold uppercase tracking-wide text-foreground transition-opacity hover:opacity-80"
        >
          Louve Admin
        </Link>
      </div>
      <div className="flex-1 px-3 py-4">
        <DashboardNavLinks />
      </div>
      <div className="shrink-0 border-t px-5 py-4">
        <Link
          href="/"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to store
        </Link>
      </div>
    </aside>
  );
}
