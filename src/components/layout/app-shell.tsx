"use client";

import type { ReactNode } from "react";
import { useLayoutContext } from "@/providers/layout-context";
import { cn } from "@/utils/cn";
import { Header } from "./header";

export function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const { sidebarOpen } = useLayoutContext();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "w-64 shrink-0 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50",
            "fixed inset-y-0 top-14 z-10 flex flex-col transition-transform md:static md:top-0 md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebar}
        </aside>
        <main className="min-w-0 flex-1 overflow-auto p-4 pt-[4.5rem] md:p-6">{children}</main>
      </div>
    </div>
  );
}
