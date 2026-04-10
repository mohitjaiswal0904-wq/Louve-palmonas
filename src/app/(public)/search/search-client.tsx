"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages, useSearch } from "@/hooks";
import type { TopSearchDTO, RecentSearchDTO, SuggestionDTO } from "@/types";

export default function SearchClient() {
  const m = useMessages();
  const search = useSearch();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [topSearches, setTopSearches] = useState<TopSearchDTO[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearchDTO[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionDTO[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const didInit = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    search.getTopSearches(8).then((r) => {
      if (r.data) setTopSearches(r.data);
    }).catch(() => {});
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
    <div className="mx-auto max-w-2xl space-y-10 py-4">
      {/* Search form */}
      <div className="space-y-3 text-center">
        <h1 className="text-xl font-light tracking-wide">{m.catalog.searchTitle}</h1>
        <p className="text-sm text-muted-foreground">{m.catalog.searchSubtitle}</p>
      </div>

      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="search"
            placeholder={m.catalog.searchPlaceholder}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="h-12"
            autoFocus
          />
          <Button
            type="submit"
            className="h-12 bg-zinc-900 px-8 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {m.catalog.searchButton}
          </Button>
        </form>

        {/* Autocomplete suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-16 top-full z-20 mt-1 rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            {suggestions.map((s, i) => (
              <button
                key={`${s.query}-${i}`}
                type="button"
                onMouseDown={() => navigateToSearch(s.query)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <span className="flex-1">{s.query}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                  {s.type === "vendor" ? "Brand" : s.type === "product_type" ? "Category" : "Popular"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Recent searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => navigateToSearch(r.query)}
                className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
              >
                {r.query}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Top searches */}
      {topSearches.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Popular searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {topSearches.map((t, i) => (
              <button
                key={`${t.query}-${i}`}
                type="button"
                onClick={() => navigateToSearch(t.query)}
                className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
              >
                {t.query}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
