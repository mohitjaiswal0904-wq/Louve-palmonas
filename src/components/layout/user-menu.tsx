"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Package, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks";
import { useMessages } from "@/hooks";

export function UserMenu() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const m = useMessages();
  const u = m.navigation.userMenu;

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled aria-busy>
        <User className="size-5 opacity-50" />
      </Button>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm" className="h-8 text-xs font-medium tracking-wide">
            Sign in
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button
            size="sm"
            className="h-8 bg-zinc-900 text-xs font-medium tracking-wide text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  const initials = user.profile?.display_name
    ? user.profile.display_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="inline-flex items-center justify-center rounded-full p-1.5 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Account menu"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
          {initials}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium">
            {user.profile?.display_name ?? "Louve member"}
          </p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => go("/account/profile")}
        >
          <User className="mr-2 size-4 shrink-0" />
          {u.profile}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => go("/account/orders")}>
          <Package className="mr-2 size-4 shrink-0" />
          {u.orders}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => go("/cart")}>
          <ShoppingBag className="mr-2 size-4 shrink-0" />
          {u.cart}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => go("/wishlist")}>
          <Heart className="mr-2 size-4 shrink-0" />
          {u.wishlist}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={() => void logout()}
        >
          <LogOut className="mr-2 size-4 shrink-0" />
          {u.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
