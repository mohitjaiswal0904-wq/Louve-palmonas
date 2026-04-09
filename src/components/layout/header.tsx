"use client";

import { useLayoutContext } from "@/providers/layout-context";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const { toggleSidebar } = useLayoutContext();

  return (
    <header className="fixed top-0 z-20 flex h-14 w-full shrink-0 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <Button
        type="button"
        variant="ghost"
        className="md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        Menu
      </Button>
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{siteConfig.name}</span>
    </header>
  );
}
