import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  PaginatedResponse,
  AddToWishlistRequest,
  UpdateWishlistItemRequest,
  WishlistItemDTO,
  WishlistCountDTO,
  WishlistProductIdsDTO,
  WishlistCheckDTO,
  WishlistListParams,
} from "@/types";

function toQs(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

export async function addToWishlist(client: ApiClient, data: AddToWishlistRequest) {
  return client.post<ApiResponse<WishlistItemDTO>>("/api/v1/wishlist", data);
}

export async function listWishlist(client: ApiClient, params: WishlistListParams = {}) {
  const qs = toQs(params);
  return client.get<PaginatedResponse<WishlistItemDTO[]>>(`/api/v1/wishlist${qs}`);
}

export async function getWishlistCount(client: ApiClient) {
  return client.get<ApiResponse<WishlistCountDTO>>("/api/v1/wishlist/count");
}

export async function checkWishlist(client: ApiClient, productId: number) {
  return client.get<ApiResponse<WishlistCheckDTO>>(`/api/v1/wishlist/check/${productId}`);
}

export async function getWishlistProductIds(client: ApiClient) {
  return client.get<ApiResponse<WishlistProductIdsDTO>>("/api/v1/wishlist/product-ids");
}

export async function updateWishlistItem(client: ApiClient, id: number, data: UpdateWishlistItemRequest) {
  return client.put<ApiResponse<WishlistItemDTO>>(`/api/v1/wishlist/${id}`, data);
}

export async function removeWishlistItem(client: ApiClient, id: number) {
  return client.del<ApiResponse<null>>(`/api/v1/wishlist/${id}`);
}

export async function removeWishlistByProduct(client: ApiClient, productId: number) {
  return client.del<ApiResponse<null>>(`/api/v1/wishlist/product/${productId}`);
}

export async function moveWishlistToCart(client: ApiClient, itemIds: number[]) {
  return client.post<ApiResponse<null>>("/api/v1/wishlist/move-to-cart", { item_ids: itemIds });
}
