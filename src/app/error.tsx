"use client";

import { useEffect } from "react";

import { SiteLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/use-messages";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const m = useMessages();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteLayout>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {m.errors.brandLine}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {m.errors.errorTitle}
        </h1>
        <p className="text-sm text-muted-foreground">{m.errors.errorBody}</p>
        <div className="flex gap-3">
          <Button onClick={reset}>{m.errors.tryAgain}</Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            {m.errors.goHome}
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
