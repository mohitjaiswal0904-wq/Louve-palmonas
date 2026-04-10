"use client";

import { useSearchState } from "@/state/search.state";

/** Search API facades; state calls `search.service`. */
export function useSearch() {
  return useSearchState();
}
