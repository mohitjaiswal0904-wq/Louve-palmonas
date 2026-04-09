"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { useLayoutContext } from "@/providers/layout-context";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/use-messages";
import { HEADER_ACTION_ICONS } from "./header-actions";
import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

export function Header() {
  const { toggleSidebar } = useLayoutContext();
  const m = useMessages();

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
            return (
              <Link
                key={a.key}
                href={a.href}
                aria-label={a.ariaLabel}
                className="inline-flex"
              >
                <Button variant="ghost" size="icon">
                  <Icon className="size-5" />
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
