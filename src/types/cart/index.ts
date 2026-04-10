export type AddToCartRequest = {
  product_id: number;
  variant_id: number;
  quantity?: number;
};

export type UpdateCartItemRequest = {
  quantity?: number;
  variant_id?: number;
};

export type RemoveMultipleRequest = {
  item_ids: number[];
};

export type CartMoneyInfo = {
  amount: string;
  currency: string;
};

export type CartProductInfo = {
  title: string;
  handle: string;
  vendor: string;
  image: string;
  image_alt: string;
};

export type CartVariantInfo = {
  id: number;
  title: string;
  price: CartMoneyInfo;
  compare_at_price?: CartMoneyInfo;
  sku: string;
  available: boolean;
};

export type CartItemDTO = {
  id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  product?: CartProductInfo;
  variant?: CartVariantInfo;
  line_total: CartMoneyInfo;
  created_at: string;
  updated_at: string;
};

export type CartSummaryDTO = {
  items: CartItemDTO[];
  item_count: number;
  unique_items: number;
  subtotal: CartMoneyInfo;
};

export type CartCountDTO = {
  count: number;
};
