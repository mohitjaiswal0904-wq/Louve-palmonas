import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  DashboardStatsResponse,
  AdminUserListResponse,
  AdminOrderListResponse,
  AdminOrderResponse,
  AdminProductListResponse,
} from "@/types";

export async function getDashboardStats(client: ApiClient) {
  return client.get<ApiResponse<DashboardStatsResponse>>("/api/v1/admin/stats");
}

export async function listUsers(client: ApiClient, params: { page?: number; limit?: number; search?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.search) qs.set("search", params.search);
  const q = qs.toString();
  return client.get<ApiResponse<AdminUserListResponse>>(`/api/v1/admin/users${q ? `?${q}` : ""}`);
}

export async function updateUserRole(client: ApiClient, userId: number, role: string) {
  return client.put<ApiResponse<null>>(`/api/v1/admin/users/${userId}/role`, { role });
}

export async function listOrders(client: ApiClient, params: { page?: number; limit?: number; status?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.status) qs.set("status", params.status);
  const q = qs.toString();
  return client.get<ApiResponse<AdminOrderListResponse>>(`/api/v1/admin/orders${q ? `?${q}` : ""}`);
}

export async function getOrder(client: ApiClient, orderId: number) {
  return client.get<ApiResponse<AdminOrderResponse>>(`/api/v1/admin/orders/${orderId}`);
}

export async function updateOrderStatus(client: ApiClient, orderId: number, status: string) {
  return client.put<ApiResponse<null>>(`/api/v1/admin/orders/${orderId}/status`, { status });
}

export async function listProducts(client: ApiClient, params: { page?: number; limit?: number } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const q = qs.toString();
  return client.get<ApiResponse<AdminProductListResponse>>(`/api/v1/admin/products${q ? `?${q}` : ""}`);
}
