"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/hooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { DashboardNavLinks } from "./dashboard-nav";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-zinc-50 pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] dark:bg-zinc-950">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] min-h-0 min-w-0 flex-col overflow-hidden bg-zinc-50 pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] dark:bg-zinc-950 md:flex-row md:pb-0">
      <DashboardSidebar />

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="flex h-full max-h-[100dvh] w-[min(100vw,20rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Admin menu</SheetTitle>
            <SheetDescription>Navigate the Louve admin dashboard</SheetDescription>
          </SheetHeader>
          <div className="flex h-14 shrink-0 items-center border-b px-4">
            <Link
              href="/dashboard"
              className="text-sm font-semibold uppercase tracking-wide"
              onClick={() => setMobileNavOpen(false)}
            >
              Louve Admin
            </Link>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <DashboardNavLinks onNavigate={() => setMobileNavOpen(false)} />
          </div>
          <div className="shrink-0 border-t px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileNavOpen(false)}
            >
              &larr; Back to store
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6">
          {children}
        </main>
        <footer className="shrink-0 border-t bg-white/80 px-4 py-3 text-center text-xs text-muted-foreground backdrop-blur-sm dark:bg-zinc-900/80 sm:px-6 sm:text-left">
          Louve Admin &mdash; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
