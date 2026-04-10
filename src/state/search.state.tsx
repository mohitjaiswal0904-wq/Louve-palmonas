"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { createCsrApiClient } from "@/lib/client";
import * as searchService from "@/services/search.service";
import type {
  ApiResponse,
  PaginatedResponse,
  ProductDTO,
  RecentSearchDTO,
  SearchProductsParams,
  SuggestionDTO,
  TopSearchDTO,
} from "@/types";

export type SearchStateValue = {
  searchProducts: (
    params: SearchProductsParams,
  ) => Promise<PaginatedResponse<ProductDTO[]>>;
  getTopSearches: (limit?: number, days?: number) => Promise<ApiResponse<TopSearchDTO[]>>;
  getRecentSearches: (limit?: number) => Promise<ApiResponse<RecentSearchDTO[]>>;
  getSuggestions: (q: string, limit?: number) => Promise<ApiResponse<SuggestionDTO[]>>;
};

const SearchStateContext = createContext<SearchStateValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);

  const value = useMemo<SearchStateValue>(
    () => ({
      searchProducts: (params) => searchService.searchProducts(client, params),
      getTopSearches: (limit, days) => searchService.getTopSearches(client, limit, days),
      getRecentSearches: (limit) => searchService.getRecentSearches(client, limit),
      getSuggestions: (q, limit) => searchService.getSuggestions(client, q, limit),
    }),
    [client],
  );

  return (
    <SearchStateContext.Provider value={value}>{children}</SearchStateContext.Provider>
  );
}

export function useSearchState(): SearchStateValue {
  const ctx = useContext(SearchStateContext);
  if (!ctx) {
    throw new Error("useSearchState must be used within <SearchProvider>");
  }
  return ctx;
}
