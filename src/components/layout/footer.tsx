"use client";

import Link from "next/link";

import { useMessages } from "@/hooks";

export function Footer() {
  const m = useMessages();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-light tracking-[0.35em] text-foreground">
              {m.site.name.toUpperCase()}
            </div>
            <div className="text-xs text-muted-foreground">
              {m.common.footerFromHouse}
            </div>
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-2">
            {m.navigation.footer.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {section.title}
                </div>
                {section.links.map((l) => (
                  <Link
                    key={l.key}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {m.common.notes}
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {m.site.name}. {m.common.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
