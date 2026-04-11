"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";

import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";

import { getDashboardSectionTitle } from "./dashboard-nav";

type DashboardHeaderProps = {
  onOpenMobileNav?: () => void;
};

export function DashboardHeader({ onOpenMobileNav }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/dashboard";
  const title = getDashboardSectionTitle(pathname);
  const displayName = user?.profile?.display_name ?? user?.phone ?? "Admin";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-white/95 px-4 backdrop-blur-sm dark:bg-zinc-900/95 sm:px-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 shrink-0 md:hidden"
        aria-label="Open navigation menu"
        onClick={onOpenMobileNav}
      >
        <Menu className="size-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-sm">
          {title}
        </h1>
        <p className="truncate text-xs text-muted-foreground sm:hidden">{displayName}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="hidden max-w-[12rem] truncate text-xs text-muted-foreground sm:inline">
          {displayName}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          aria-label="Log out"
          onClick={() => {
            void logout();
            router.push("/");
          }}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
