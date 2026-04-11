"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSearch } from "@/hooks";
import { cn } from "@/lib/utils";
import type { TopSearchDTO } from "@/types";

export type PopularSearchesProps = {
  /** Search page: small uppercase label + pills. Cart/footer: larger heading + optional logo. */
  variant?: "compact" | "footer";
  limit?: number;
  days?: number;
  title?: string;
  /** Only used when `variant="footer"` — shows Louve mark above the block. */
  showLogo?: boolean;
  className?: string;
};

/**
 * Fetches top searches from `GET /api/v1/search/top` and renders clickable terms.
 * Use on the search page, cart footer, or anywhere inside `SearchProvider`.
 */
export function PopularSearches({
  variant = "compact",
  limit = 10,
  days = 30,
  title = "Popular searches",
  showLogo = false,
  className,
}: PopularSearchesProps) {
  const search = useSearch();
  const router = useRouter();
  const [items, setItems] = useState<TopSearchDTO[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    search
      .getTopSearches(limit, days)
      .then((r) => {
        if (cancelled) return;
        if (r.success && r.data?.length) {
          setItems(r.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [search, limit, days]);

  function navigate(q: string) {
    const t = q.trim();
    if (t) router.push(`/search/${encodeURIComponent(t)}`);
  }

  if (ready && items.length === 0) return null;

  const pillClass =
    variant === "footer"
      ? "rounded-full border border-zinc-200/90 px-4 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
      : "rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300";

  const section = (
    <section className="space-y-3">
      <h2
        className={cn(
          variant === "footer"
            ? "text-lg font-light tracking-wide text-zinc-900 dark:text-zinc-50"
            : "text-xs font-medium uppercase tracking-wider text-zinc-500",
        )}
      >
        {title}
      </h2>
      {!ready ? (
        <div className="flex flex-wrap gap-2" aria-hidden>
          {Array.from({ length: Math.min(limit, 8) }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((t, i) => (
            <button
              key={`${t.query}-${i}`}
              type="button"
              onClick={() => navigate(t.query)}
              className={pillClass}
            >
              {t.query}
            </button>
          ))}
        </div>
      )}
    </section>
  );

  if (variant === "footer") {
    return (
      <div className={cn("mt-40 space-y-12", className)}>
        {showLogo ? (
          <div className="flex h-12 w-12 items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Louve"
              width={48}
              height={20}
              className="opacity-40"
            />
          </div>
        ) : null}
        <div className="space-y-8">{section}</div>
      </div>
    );
  }

  return <div className={className}>{section}</div>;
}
