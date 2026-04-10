import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  CartItemDTO,
  CartSummaryDTO,
  CartCountDTO,
} from "@/types";

export async function addToCart(client: ApiClient, data: AddToCartRequest) {
  return client.post<ApiResponse<CartItemDTO>>("/api/v1/cart", data);
}

export async function getCartSummary(client: ApiClient) {
  return client.get<ApiResponse<CartSummaryDTO>>("/api/v1/cart");
}

export async function getCartCount(client: ApiClient) {
  return client.get<ApiResponse<CartCountDTO>>("/api/v1/cart/count");
}

export async function updateCartItem(client: ApiClient, id: number, data: UpdateCartItemRequest) {
  return client.put<ApiResponse<CartItemDTO>>(`/api/v1/cart/${id}`, data);
}

export async function removeCartItem(client: ApiClient, id: number) {
  return client.del<ApiResponse<null>>(`/api/v1/cart/${id}`);
}

export async function removeMultipleCartItems(client: ApiClient, itemIds: number[]) {
  return client.post<ApiResponse<null>>("/api/v1/cart/remove-multiple", { item_ids: itemIds });
}

export async function clearCart(client: ApiClient) {
  return client.del<ApiResponse<null>>("/api/v1/cart");
}
