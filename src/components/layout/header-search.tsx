"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMessages, useSearch } from "@/hooks";
import { cn } from "@/lib/utils";
import type { AutocompleteItemDTO } from "@/types";

type HeaderSearchProps = {
  ariaLabel: string;
};

export function HeaderSearch({ ariaLabel }: HeaderSearchProps) {
  const m = useMessages();
  const search = useSearch();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AutocompleteItemDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const runSearch = useCallback(
    (q: string) => {
      const t = q.trim();
      if (!t) return;
      setExpanded(false);
      router.push(`/search/${encodeURIComponent(t)}`);
    },
    [router],
  );

  useEffect(() => {
    if (!expanded) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setQuery("");
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [expanded]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < 1) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      search
        .getAutocomplete(q, 12)
        .then((res) => {
          if (res.success && res.data?.length) {
            setSuggestions(res.data);
          } else {
            setSuggestions([]);
          }
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(() => setLoading(false));
    }, 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const showDropdown =
    expanded && query.trim().length >= 1 && (loading || suggestions.length > 0);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setExpanded(false);
      setQuery("");
      setSuggestions([]);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch(query);
    }
  }

  function pickItem(item: AutocompleteItemDTO) {
    setExpanded(false);
    setQuery("");
    setSuggestions([]);
    router.push(item.href);
  }

  if (!expanded) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative size-10 touch-manipulation sm:size-9"
        aria-label={ariaLabel}
        aria-expanded={false}
        onClick={() => setExpanded(true)}
      >
        <Search className="size-5" />
      </Button>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative z-50 flex max-w-[100vw] items-center sm:max-w-none"
    >
      <div
        className={cn(
          "flex max-w-[calc(100vw-7rem)] items-center gap-1 rounded-md border border-zinc-200 bg-background pl-2 pr-1 shadow-sm sm:max-w-none",
          "dark:border-zinc-700",
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSuggestions([]);
          }}
          onKeyDown={handleKeyDown}
          placeholder={m.catalog.searchPlaceholder}
          className="h-10 min-h-[44px] w-[min(55vw,12rem)] min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-400 sm:h-9 sm:min-h-0 sm:w-56 sm:text-sm"
          inputMode="search"
          enterKeyHint="search"
          aria-label={m.catalog.searchTitle}
          aria-autocomplete="list"
          aria-controls="header-search-suggestions"
          aria-expanded={showDropdown}
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="h-9 min-h-[44px] shrink-0 touch-manipulation px-2 text-xs sm:h-8 sm:min-h-0 sm:px-3"
          onClick={() => runSearch(query)}
        >
          {m.catalog.searchButton}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 shrink-0 touch-manipulation sm:size-8"
          aria-label={m.common.closeMenu}
          onClick={() => {
            setExpanded(false);
            setQuery("");
            setSuggestions([]);
          }}
        >
          <X className="size-4" />
        </Button>
      </div>

      {showDropdown && (
        <div
          id="header-search-suggestions"
          role="listbox"
          className={cn(
            "absolute right-0 top-full z-50 mt-1 max-h-[min(50dvh,320px)] w-[min(calc(100vw-1.5rem),20rem)] overflow-auto rounded-md border border-zinc-200 bg-popover py-1 text-popover-foreground shadow-md sm:max-h-[min(60vh,320px)]",
            "dark:border-zinc-700 dark:bg-zinc-950",
          )}
        >
          {loading && suggestions.length === 0 ? (
            <p className="px-3 py-2 text-xs text-muted-foreground">{m.catalog.searching}</p>
          ) : (
            suggestions.map((item, i) => (
              <button
                key={`${item.href}-${i}`}
                type="button"
                role="option"
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickItem(item)}
              >
                <span className="line-clamp-2">{item.label}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-zinc-400">
                  {item.type === "collection" ? "Collection" : "Product"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
