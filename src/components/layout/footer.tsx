"use client";

import Link from "next/link";

import { useMessages } from "@/hooks";

export function Footer() {
  const m = useMessages();

  return (
    <footer className="border-t bg-background pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-5 sm:py-10 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-light tracking-[0.35em] text-foreground">
              {m.site.name.toUpperCase()}
            </div>
            <div className="text-xs text-muted-foreground">
              {m.common.footerFromHouse}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            {m.navigation.footer.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {section.title}
                </div>
                {section.links
                  .filter((l) => l.key !== "stores")
                  .map((l) => (
                  <Link
                    key={l.key}
                    className="block max-sm:min-h-[44px] max-sm:py-2.5 text-sm leading-snug text-muted-foreground hover:text-foreground"
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {m.common.notes}
            </div>
            <div className="text-pretty text-sm text-muted-foreground">
              © {new Date().getFullYear()} {m.site.name}. {m.common.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
