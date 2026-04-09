"use client";

import Link from "next/link";
import {
  Menu,
} from "lucide-react";

import { siteConfig } from "@/lib/config/site";
import { headerNav } from "@/lib/config/navigation";
import { useLayoutContext } from "@/providers/layout-context";
import { Button } from "@/components/ui/button";

export function Header() {
  const { toggleSidebar } = useLayoutContext();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-3 sm:px-4">
        <div className="flex flex-1 items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={toggleSidebar}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Link
            href="/"
            className="text-base font-light tracking-[0.35em] text-foreground"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.name.toUpperCase()}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
          {headerNav.actions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.key} href={a.href} aria-label={a.ariaLabel} className="inline-flex">
                <Button variant="ghost" size="icon">
                  <Icon className="size-5" />
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
