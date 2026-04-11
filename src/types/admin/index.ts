export type DashboardStatsResponse = {
  total_users: number;
  total_orders: number;
  total_revenue: number;
  total_products: number;
};

export type AdminUserResponse = {
  id: number;
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
