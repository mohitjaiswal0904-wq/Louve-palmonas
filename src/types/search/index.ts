/** Search module types matching the Go backend search module DTOs. */

export type SearchProductsParams = {
  q: string;
  page?: number;
  limit?: number;
  vendor?: string;
  product_type?: string;
  min_price?: string;
  max_price?: string;
  sort_by?: string;
  sort_order?: string;
  currency?: string;
};

export type TopSearchDTO = {
  query: string;
  count: number;
};

export type RecentSearchDTO = {
  id: number;
  query: string;
  created_at: string;
};

export type SuggestionDTO = {
  query: string;
  type: "popular" | "vendor" | "product_type" | "history";
};

/** GET /api/v1/search/autocomplete — products + collections */
export type AutocompleteItemDTO = {
  label: string;
  type: "product" | "collection";
  href: string;
};
