export type CreateOrderRequest = {
  payment_method?: string;
  note?: string;
  address_id?: number;
  shipping_address?: {
    full_name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
};

export type CheckoutSimulateRequest = {
  confirm: boolean;
};

export type OrderMoneyInfo = {
  amount: string;
  currency: string;
};

export type OrderItemDTO = {
  id: number;
  line_code?: string;
  product_id: number;
  variant_id: number;
  product_title: string;
  variant_title: string;
  sku: string;
  quantity: number;
  unit_price: OrderMoneyInfo;
  line_total: OrderMoneyInfo;
  image_url?: string;
};

export type OrderDTO = {
  id: number;
  order_code?: string;
  user_code?: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method?: string;
  subtotal_amount: OrderMoneyInfo;
  total_amount: OrderMoneyInfo;
  item_count: number;
  note?: string;
  shipping_address?: {
    full_name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  cancelled_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  items: OrderItemDTO[];
};

export type OrderSummaryDTO = {
  id: number;
  order_code?: string;
  user_code?: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: OrderMoneyInfo;
  item_count: number;
  created_at: string;
};

export type OrderCountDTO = {
  count: number;
};

export type OrderListParams = {
  page?: number;
  limit?: number;
  status?: string;
};
