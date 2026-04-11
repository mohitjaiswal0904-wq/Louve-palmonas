"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { useLayoutContext } from "@/providers/layout-context";
import { Button } from "@/components/ui/button";
import { useCart, useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import { HEADER_ACTION_ICONS } from "./header-actions";
import { HeaderSearch } from "./header-search";
import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";
import { MegaMenu } from "./mega-menu";

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
  const { sidebarOpen, toggleSidebar } = useLayoutContext();
  const m = useMessages();
  const { itemCount: cartItemCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full border-b bg-background/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md transition-none">
      <div className="flex h-16 w-full min-w-0 items-center px-3 sm:px-4 md:px-6 lg:px-10 xl:px-[46px]">
        {/* Left: Menu */}
        <div className="flex min-w-0 flex-1 items-center justify-start">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 touch-manipulation hover:bg-transparent sm:size-9"
            aria-label={m.common.openMenu}
            onClick={toggleSidebar}
          >
            <Menu className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        {/* Center: Logo */}
        <div className="flex min-w-0 flex-none items-center justify-center px-1">
          <Link
            href="/"
            className="flex max-w-[min(100%,9rem)] items-center sm:max-w-[10rem] md:max-w-none"
            aria-label={`${m.site.name} home`}
          >
            <Image
              src="/logo.png"
              alt={m.site.name}
              width={140}
              height={40}
              priority
              className="h-7 w-auto object-contain dark:invert sm:h-8"
            />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5">
          <LanguageSwitcher />
          {m.navigation.header.actions.map((a) => {
            if (a.key === "account") return null;
            /* Wishlist hidden — route redirects to /cart */
            if (a.key === "wishlist") return null;

            if (a.key === "search") {
              return <HeaderSearch key={a.key} ariaLabel={a.ariaLabel} />;
            }

            const Icon = HEADER_ACTION_ICONS[a.key];
            if (!Icon) return null;

            const badgeCount = a.key === "cart" ? cartItemCount : 0;
            const ariaLabel =
              badgeCount > 0 ? `${a.ariaLabel}, ${badgeCount}` : a.ariaLabel;

            return (
              <Link
                key={a.key}
                href={a.href}
                aria-label={ariaLabel}
                className="relative inline-flex"
              >
                <Button variant="ghost" size="icon" className="relative size-10 touch-manipulation sm:size-9">
                  <Icon className="size-5" />
                  {a.key === "cart" && (
                    <HeaderCountBadge count={badgeCount} />
                  )}
                </Button>
              </Link>
            );
          })}
          <UserMenu />
        </div>
      </div>

      <MegaMenu 
        isOpen={sidebarOpen} 
        onClose={() => toggleSidebar()} 
      />
    </header>
  );
}
