"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu } from "lucide-react";

import { useAuth } from "@/hooks";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Link
          href="/"
          target="_blank"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "hidden gap-1.5 text-xs text-muted-foreground sm:inline-flex",
          )}
        >
          Visit store
          <ExternalLink className="size-3" />
        </Link>
        <span className="hidden max-w-[12rem] truncate text-xs text-muted-foreground lg:inline">
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
