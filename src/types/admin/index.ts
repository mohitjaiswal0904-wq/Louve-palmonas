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
