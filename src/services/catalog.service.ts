import type { ApiClient } from "@/lib/client";
import type {
  PaginatedResponse,
  ApiResponse,
  ProductDTO,
  ProductDetailDTO,
  FiltersDTO,
  ProductListParams,
  CollectionDTO,
  CollectionDetailDTO,
} from "@/types";

function toQueryString(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

export async function listProducts(client: ApiClient, params: ProductListParams = {}) {
  const qs = toQueryString(params);
  return client.get<PaginatedResponse<ProductDTO[]>>(`/api/v1/catalog/products${qs}`);
}

export async function getProductByHandle(client: ApiClient, handle: string) {
  return client.get<ApiResponse<ProductDetailDTO>>(`/api/v1/catalog/products/${handle}`);
}

export async function getProductById(client: ApiClient, id: number) {
  return client.get<ApiResponse<ProductDetailDTO>>(`/api/v1/catalog/products/id/${id}`);
}

export async function getFilters(client: ApiClient) {
  return client.get<ApiResponse<FiltersDTO>>("/api/v1/catalog/filters");
}

export async function listCollections(client: ApiClient) {
  return client.get<ApiResponse<CollectionDTO[]>>("/api/v1/catalog/collections");
}

export async function getCollectionBySlug(client: ApiClient, slug: string) {
  return client.get<ApiResponse<CollectionDTO>>(`/api/v1/catalog/collections/${slug}`);
}

export async function getCollectionProducts(client: ApiClient, slug: string, params: { page?: number; limit?: number } = {}) {
  const qs = toQueryString(params);
  return client.get<ApiResponse<CollectionDetailDTO>>(`/api/v1/catalog/collections/${slug}/products${qs}`);
}
