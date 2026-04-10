"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks";

export function NotFoundContent() {
  const m = useMessages();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {m.errors.brandLine}
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {m.errors.notFoundTitle}
      </h1>
      <p className="text-sm text-muted-foreground">{m.errors.notFoundBody}</p>
      <Link href="/" className="inline-flex">
        <Button>{m.errors.goHome}</Button>
      </Link>
    </div>
  );
}
