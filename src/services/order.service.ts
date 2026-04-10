import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  PaginatedResponse,
  CreateOrderRequest,
  CheckoutSimulateRequest,
  OrderDTO,
  OrderSummaryDTO,
  OrderCountDTO,
  OrderListParams,
} from "@/types";

function toQs(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

export async function createOrder(client: ApiClient, data: CreateOrderRequest = {}) {
  return client.post<ApiResponse<OrderDTO>>("/api/v1/orders", data);
}

export async function listOrders(client: ApiClient, params: OrderListParams = {}) {
  const qs = toQs(params);
  return client.get<PaginatedResponse<OrderSummaryDTO[]>>(`/api/v1/orders${qs}`);
}

export async function getOrderCount(client: ApiClient) {
  return client.get<ApiResponse<OrderCountDTO>>("/api/v1/orders/count");
}

export async function getOrder(client: ApiClient, id: number) {
  return client.get<ApiResponse<OrderDTO>>(`/api/v1/orders/${id}`);
}

export async function getOrderByNumber(client: ApiClient, number: string) {
  return client.get<ApiResponse<OrderDTO>>(`/api/v1/orders/number/${number}`);
}

export async function simulateCheckout(client: ApiClient, orderId: number, data: CheckoutSimulateRequest) {
  return client.post<ApiResponse<OrderDTO>>(`/api/v1/orders/${orderId}/checkout`, data);
}

export async function cancelOrder(client: ApiClient, orderId: number) {
  return client.post<ApiResponse<OrderDTO>>(`/api/v1/orders/${orderId}/cancel`, {});
}
