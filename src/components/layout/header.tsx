"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { useLayoutContext } from "@/providers/layout-context";
import { Button } from "@/components/ui/button";
import { useCart, useMessages, useWishlist } from "@/hooks";
import { cn } from "@/lib/utils";
import { HEADER_ACTION_ICONS } from "./header-actions";
import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

function HeaderCountBadge({ count, className }: { count: number; className?: string }) {
  if (count < 1) return null;
  const label = count > 99 ? "99+" : String(count);
  return (
    <span
      className={cn(
        "pointer-events-none absolute -right-0.5 -top-0.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--louve-primal-rouge)] px-1 text-[10px] font-semibold tabular-nums leading-none text-white shadow-sm",
        className,
      )}
      aria-hidden
    >
      {label}
    </span>
  );
}

export function Header() {
  const { toggleSidebar } = useLayoutContext();
  const m = useMessages();
  const { count: wishlistCount } = useWishlist();
  const { itemCount: cartItemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-3 sm:px-4">
        <div className="flex flex-1 items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label={m.common.openMenu}
            onClick={toggleSidebar}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Link
            href="/"
            className="text-base font-light tracking-[0.35em] text-foreground"
            aria-label={`${m.site.name} home`}
          >
            {m.site.name.toUpperCase()}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
          <LanguageSwitcher />
          {m.navigation.header.actions.map((a) => {
            if (a.key === "account") return null;
            const Icon = HEADER_ACTION_ICONS[a.key];
            if (!Icon) return null;

            const badgeCount =
              a.key === "wishlist" ? wishlistCount : a.key === "cart" ? cartItemCount : 0;
            const ariaLabel =
              badgeCount > 0 ? `${a.ariaLabel}, ${badgeCount}` : a.ariaLabel;

            return (
              <Link
                key={a.key}
                href={a.href}
                aria-label={ariaLabel}
                className="relative inline-flex"
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Icon className="size-5" />
                  {(a.key === "wishlist" || a.key === "cart") && (
                    <HeaderCountBadge count={badgeCount} />
                  )}
                </Button>
              </Link>
            );
          })}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
