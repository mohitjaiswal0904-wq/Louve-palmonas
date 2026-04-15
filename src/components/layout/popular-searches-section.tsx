"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCatalog, useMessages } from "@/hooks";
import { coercePopularSearchCategories } from "@/lib/catalog/coerce-popular-searches";
import { POPULAR_SEARCHES_FALLBACK } from "@/lib/catalog/popular-searches-fallback";
import type { PopularSearchCategoryDTO, PopularSearchLinkDTO } from "@/types";

type ResolvedLink =
  | { kind: "internal"; href: string }
  | { kind: "external"; href: string }
  | null;

function resolveLink(link: PopularSearchLinkDTO): ResolvedLink {
  if (link.href?.trim()) {
    const h = link.href.trim();
    if (/^https?:\/\//i.test(h)) return { kind: "external", href: h };
    return { kind: "internal", href: h.startsWith("/") ? h : `/${h.replace(/^\//, "")}` };
  }
  const q = (link.query ?? link.label).trim();
  if (!q) return null;
  return { kind: "internal", href: `/search/${encodeURIComponent(q)}` };
}

/**
 * Full-width block above the footer. Data from `GET /api/v1/catalog/popular-searches`
 * (via BFF). Uses {@link POPULAR_SEARCHES_FALLBACK} when the API is missing, errors, or returns no categories.
 */
export function PopularSearchesSection() {
  const m = useMessages();
  const catalog = useCatalog();
  const [categories, setCategories] = useState<PopularSearchCategoryDTO[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    catalog
      .getPopularSearches()
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res.data != null) {
          const coerced = coercePopularSearchCategories(res.data);
          setCategories(
            coerced.length > 0 ? coerced : POPULAR_SEARCHES_FALLBACK,
          );
          return;
        }
        setCategories(POPULAR_SEARCHES_FALLBACK);
      })
      .catch(() => {
        if (!cancelled) setCategories(POPULAR_SEARCHES_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [catalog]);

  if (!ready) return null;

  return (
    <section
      className="border-t border-[#F0F0F0] bg-white dark:border-zinc-800 dark:bg-zinc-950"
      aria-labelledby="popular-searches-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:px-10 md:py-14 lg:px-12">
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-400"
          >
            <Image
              src="/logo.png"
              alt={m.common.brandAlt}
              width={320}
              height={120}
              className="h-12 w-auto max-w-[min(100%,280px)] object-contain object-center sm:h-14 md:h-[4.5rem]"
              sizes="(max-width: 768px) 224px, 280px"
            />
          </Link>
        </div>

        <div className="mt-12 space-y-6 md:mt-16 md:space-y-8">
          <h2
            id="popular-searches-heading"
            className="text-left text-lg font-bold tracking-tight text-zinc-900 md:text-xl dark:text-zinc-50"
          >
            {m.common.popularSearchesHeading}
          </h2>

          <div className="space-y-5 md:space-y-7">
            {categories.map((group) => (
              <div
                key={group.categoryName}
                className="flex flex-wrap items-baseline gap-x-1 gap-y-2 text-left text-xs leading-relaxed text-[#757575] md:text-[13px] dark:text-zinc-400"
              >
                <span className="shrink-0 font-normal text-[#9E9E9E] dark:text-zinc-500">
                  {group.categoryName}:
                </span>
                {group.links.map((link, i) => {
                  const resolved = resolveLink(link);
                  const bodyClass =
                    "font-normal text-[#757575] transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100";
                  return (
                    <span key={`${link.label}-${i}`} className="inline-flex flex-wrap items-baseline gap-x-1">
                      {i > 0 ? (
                        <span
                          className="select-none px-0.5 text-[#9E9E9E] dark:text-zinc-600"
                          aria-hidden
                        >
                          |
                        </span>
                      ) : null}
                      {resolved?.kind === "internal" ? (
                        <Link href={resolved.href} className={bodyClass}>
                          {link.label}
                        </Link>
                      ) : resolved?.kind === "external" ? (
                        <a
                          href={resolved.href}
                          rel="noopener noreferrer"
                          className={bodyClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span className={bodyClass}>{link.label}</span>
                      )}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
