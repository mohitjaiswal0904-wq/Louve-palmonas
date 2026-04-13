export type DashboardStatsResponse = {
  total_users: number;
  total_orders: number;
  total_revenue: number;
  total_products: number;
};

export type AdminUserResponse = {
  id: number;
  user_code?: string;
  phone: string;
  email?: string;
  status: string;
  role: string;
  profile?: { display_name?: string; avatar_url?: string };
  created_at: string;
};

export type AdminUserListResponse = {
  users: AdminUserResponse[];
  total: number;
  page: number;
  total_pages: number;
};

export type AdminOrderItemResp = {
  id: number;
  line_code?: string;
  product_id: number;
  variant_id: number;
  product_title: string;
  variant_title: string;
  sku: string;
  quantity: number;
  unit_price: string;
  line_total: string;
  currency: string;
  image_url?: string;
};

export type AdminShippingResponse = {
  full_name?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

export type AdminOrderResponse = {
  id: number;
  order_code?: string;
  user_code?: string;
  user_id: number;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method?: string;
  total_amount: string;
  currency: string;
  item_count: number;
  shipping_address?: AdminShippingResponse;
  cancelled_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  items: AdminOrderItemResp[];
};

export type AdminOrderListResponse = {
  orders: AdminOrderResponse[];
  total: number;
  page: number;
  total_pages: number;
};

export type AdminProductListResponse = {
  products: unknown[];
  total: number;
  page: number;
  total_pages: number;
};

// Analytics

export type RevenueDataPoint = {
  date: string;
  revenue: number;
  order_count: number;
};

export type OrderStatusCount = {
  status: string;
  count: number;
};

export type UserGrowthPoint = {
  date: string;
  count: number;
};

export type TopProductRow = {
  product_id: number;
  product_title: string;
  image_url?: string;
  total_qty: number;
  order_count: number;
  revenue: number;
};

export type CartInsightRow = {
  product_id: number;
  title: string;
  image_url?: string;
  cart_count: number;
  total_qty: number;
};

export type CartStatsResponse = {
  unique_users: number;
  total_items: number;
  total_quantity: number;
};

export type AnalyticsOverviewResponse = {
  revenue: RevenueDataPoint[];
  orders_by_status: OrderStatusCount[];
  user_growth: UserGrowthPoint[];
  top_products: TopProductRow[];
  recent_orders: AdminOrderResponse[];
};

export type CartInsightsResponse = {
  stats: CartStatsResponse;
  top_products: CartInsightRow[];
};

export type SQLQueryResponse = {
  columns: string[];
  rows: Record<string, unknown>[];
  count: number;
};

export type SessionLogEntry = {
  created_at: string;
  method: string;
  path: string;
  query?: string;
  category: string;
  client_ip: string;
  user_code?: string;
  is_guest: boolean;
  status_code: number;
  latency_ms: number;
  correlation_id?: string;
};

export type UserSessionLogsResponse = {
  logs: SessionLogEntry[];
  total: number;
  page: number;
  total_pages: number;
};

export type UserInsightsResponse = {
  user: AdminUserResponse;
  orders_count: number;
  cart_line_count: number;
  cart_total_qty: number;
  wishlist_count: number;
  address_count: number;
  api_catalog_product_hits: number;
  api_collection_hits: number;
  session_events_count: number;
  recent_orders: AdminOrderResponse[];
};

export type SessionTrafficPoint = {
  bucket: string;
  label: string;
  requests: number;
  unique_ips: number;
  authenticated_requests?: number;
  guest_requests?: number;
};

export type SessionCategoryShare = {
  category: string;
  requests: number;
  percent: number;
};

export type SessionHourOfDayPoint = {
  hour: number;
  requests: number;
};

export type SessionOverviewResponse = {
  period_days: number;
  total_requests: number;
  unique_ips: number;
  distinct_users: number;
  guest_requests: number;
  avg_requests_per_day: number;
  by_day: SessionTrafficPoint[];
  by_hour_recent: SessionTrafficPoint[];
  by_hour_of_day: SessionHourOfDayPoint[];
  by_category: SessionCategoryShare[];
};
