"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { PopularSearches } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages, useSearch } from "@/hooks";
import type { RecentSearchDTO, SuggestionDTO } from "@/types";

export default function SearchClient() {
  const m = useMessages();
  const search = useSearch();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchDTO[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionDTO[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const didInit = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    search.getRecentSearches(6).then((r) => {
      if (r.data) setRecentSearches(r.data);
    }).catch(() => {});
  }, [search]);

  function handleQueryChange(val: string) {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        search.getSuggestions(val.trim(), 6).then((r) => {
          if (r.data) {
            setSuggestions(r.data);
            setShowSuggestions(true);
          }
        }).catch(() => {});
      }, 250);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function navigateToSearch(q: string) {
    if (q.trim()) {
      setShowSuggestions(false);
      router.push(`/search/${encodeURIComponent(q.trim())}`);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigateToSearch(query);
  }

  return (
    <div className="min-h-[calc(100dvh-var(--site-header-offset,4rem)-10rem)] bg-gradient-to-b from-zinc-100/90 via-background to-background dark:from-zinc-950 dark:via-background dark:to-background">
      <div className="w-full px-3 py-10 sm:px-4 sm:py-14 md:py-16 lg:px-5 xl:px-6 2xl:px-8">
        {/* Hero + primary search */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/85 dark:shadow-none sm:p-8 md:p-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-5">
            <h1 className="text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl md:text-[2rem] dark:text-zinc-50">
              {m.catalog.searchTitle}
            </h1>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {m.catalog.searchSubtitle}
            </p>
          </div>

          <div className="relative mx-auto mt-8 max-w-4xl sm:mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
              <Input
                type="search"
                placeholder={m.catalog.searchPlaceholder}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="h-12 min-h-12 rounded-xl border-zinc-200/90 bg-white text-base shadow-inner dark:border-zinc-700 dark:bg-zinc-950 sm:h-14 sm:min-h-14 sm:flex-1 sm:text-[15px]"
                autoFocus
              />
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-xl bg-zinc-900 px-8 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:h-14 sm:px-10"
              >
                {m.catalog.searchButton}
              </Button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10 sm:right-auto sm:min-w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={`${s.query}-${i}`}
                    type="button"
                    onMouseDown={() => navigateToSearch(s.query)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm text-zinc-800 transition hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800/80 sm:px-5"
                  >
                    <span className="min-w-0 flex-1 truncate">{s.query}</span>
                    <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      {s.type === "vendor" ? "Brand" : s.type === "product_type" ? "Category" : "Popular"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-14 md:mt-16">
          {recentSearches.length > 0 && (
            <section className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-8">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Recent searches
              </h2>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                {recentSearches.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => navigateToSearch(r.query)}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80"
                  >
                    {r.query}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-8">
            <PopularSearches
              variant="compact"
              limit={8}
              title="Popular searches"
              className="[&_h2]:text-[11px] [&_h2]:font-semibold [&_h2]:tracking-[0.2em] [&_button]:border-zinc-200 [&_button]:bg-white [&_button]:px-4 [&_button]:py-2 [&_button]:text-sm [&_button]:shadow-sm dark:[&_button]:border-zinc-700 dark:[&_button]:bg-zinc-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
