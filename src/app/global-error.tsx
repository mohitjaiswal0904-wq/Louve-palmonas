"use client";

import { useEffect } from "react";
import { SiteLayout } from "@/components/layout";
import { AppProviders } from "@/providers/app-providers";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <AppProviders>
          <SiteLayout>
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {siteConfig.name} · from the house of {siteConfig.parentBrand}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">We hit an issue</h1>
              <p className="text-sm text-muted-foreground">
                {siteConfig.name} ran into an unexpected problem. Please refresh the
                page. If it persists, try again later.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => reset()}>Retry</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Go home
                </Button>
              </div>
            </div>
          </SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
