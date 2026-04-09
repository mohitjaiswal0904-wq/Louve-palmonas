"use client";

import { useEffect } from "react";
import { SiteLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for now; wire to Sentry later.
    console.error(error);
  }, [error]);

  return (
    <SiteLayout>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {siteConfig.name} · from the house of {siteConfig.parentBrand}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          We hit an issue while loading this {siteConfig.name} page. Please try
          again. If the problem continues, come back in a bit.
        </p>
        <div className="flex gap-3">
          <Button onClick={reset}>Try again</Button>
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
  );
}
