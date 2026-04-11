"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-6 dark:bg-zinc-900">
      <h1 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {user?.profile?.display_name ?? user?.phone ?? "Admin"}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
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
