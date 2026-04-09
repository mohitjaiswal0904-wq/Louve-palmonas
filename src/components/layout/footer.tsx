import Link from "next/link";

import { footerNav } from "@/lib/config/navigation";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-light tracking-[0.35em] text-foreground">
              LOUVE
            </div>
            <div className="text-xs text-muted-foreground">
              From the house of Palmonas
            </div>
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-2">
            {footerNav.map((section) => (
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
              Notes
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Louve. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
