import type { ApiClient } from "@/lib/client";
import type {
  ApiResponse,
  DashboardStatsResponse,
  AdminUserListResponse,
  AdminOrderListResponse,
  AdminOrderResponse,
  AdminProductListResponse,
  AnalyticsOverviewResponse,
  CartInsightsResponse,
  SQLQueryResponse,
  UserInsightsResponse,
  UserSessionLogsResponse,
  SessionOverviewResponse,
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

export async function getUserInsights(client: ApiClient, userId: number) {
  return client.get<ApiResponse<UserInsightsResponse>>(`/api/v1/admin/users/${userId}/insights`);
}

export async function getUserSessionLogs(
  client: ApiClient,
  userId: number,
  params: { page?: number; limit?: number } = {},
) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const q = qs.toString();
  return client.get<ApiResponse<UserSessionLogsResponse>>(
    `/api/v1/admin/users/${userId}/session-logs${q ? `?${q}` : ""}`,
  );
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

export async function patchOrder(
  client: ApiClient,
  orderId: number,
  body: { status?: string; payment_status?: string },
) {
  return client.put<ApiResponse<null>>(`/api/v1/admin/orders/${orderId}`, body);
}

export async function listProducts(client: ApiClient, params: { page?: number; limit?: number } = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const q = qs.toString();
  return client.get<ApiResponse<AdminProductListResponse>>(`/api/v1/admin/products${q ? `?${q}` : ""}`);
}

export async function getAnalyticsOverview(client: ApiClient, days = 30) {
  return client.get<ApiResponse<AnalyticsOverviewResponse>>(`/api/v1/admin/analytics?days=${days}`);
}

export async function getCartInsights(client: ApiClient) {
  return client.get<ApiResponse<CartInsightsResponse>>("/api/v1/admin/analytics/cart");
}

export async function getSessionOverview(client: ApiClient, days = 7) {
  const d = Math.min(90, Math.max(1, days));
  return client.get<ApiResponse<SessionOverviewResponse>>(
    `/api/v1/admin/analytics/sessions?days=${d}`,
  );
}

export async function executeQuery(client: ApiClient, query: string) {
  return client.post<ApiResponse<SQLQueryResponse>>("/api/v1/admin/query", { query });
}
