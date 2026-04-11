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
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="User menu"
        >
          <User className="size-5 stroke-[1.5]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem className="cursor-pointer" onClick={() => go("/auth/login")}>
            <User className="mr-2 size-4 shrink-0" />
            Sign in
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => go("/auth/signup")}>
            {/* Using User icon for signup too or another relevant icon */}
            <User className="mr-2 size-4 shrink-0" />
            Sign up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
        aria-label="User menu"
      >
        <User className="size-5 stroke-[1.5]" />
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
