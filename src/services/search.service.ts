import type { ApiClient } from "@/lib/client";
import type {
  PaginatedResponse,
  ApiResponse,
  ProductDTO,
  TopSearchDTO,
  RecentSearchDTO,
  SuggestionDTO,
  SearchProductsParams,
  AutocompleteItemDTO,
} from "@/types";

function toQueryString(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

export async function searchProducts(client: ApiClient, params: SearchProductsParams) {
  const qs = toQueryString(params);
  return client.get<PaginatedResponse<ProductDTO[]>>(`/api/v1/search/products${qs}`);
}

export async function getTopSearches(client: ApiClient, limit = 10, days = 30) {
  return client.get<ApiResponse<TopSearchDTO[]>>(
    `/api/v1/search/top?limit=${limit}&days=${days}`,
  );
}

export async function getRecentSearches(client: ApiClient, limit = 10) {
  return client.get<ApiResponse<RecentSearchDTO[]>>(`/api/v1/search/recent?limit=${limit}`);
}

export async function getSuggestions(client: ApiClient, q: string, limit = 8) {
  return client.get<ApiResponse<SuggestionDTO[]>>(
    `/api/v1/search/suggest?q=${encodeURIComponent(q)}&limit=${limit}`,
  );
}

export async function getAutocomplete(client: ApiClient, q: string, limit = 12) {
  const qs = `q=${encodeURIComponent(q)}&limit=${limit}`;
  return client.get<ApiResponse<AutocompleteItemDTO[]>>(`/api/v1/search/autocomplete?${qs}`);
}
