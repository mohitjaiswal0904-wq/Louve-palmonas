export type AddToWishlistRequest = {
  product_id: number;
  variant_id?: number;
  note?: string;
};

export type UpdateWishlistItemRequest = {
  note?: string;
  variant_id?: number;
};

export type MoveToCartRequest = {
  item_ids: number[];
};

export type WishlistProductInfo = {
  title: string;
  handle: string;
  vendor: string;
  price: { amount: string; currency: string };
  image?: string;
  image_alt?: string;
};

export type WishlistItemDTO = {
  id: number;
  product_id: number;
  variant_id?: number;
  note?: string;
  product?: WishlistProductInfo;
  created_at: string;
};

export type WishlistCountDTO = {
  count: number;
};

export type WishlistProductIdsDTO = {
  product_ids: number[];
};

export type WishlistCheckDTO = {
  in_wishlist: boolean;
};

export type WishlistListParams = {
  page?: number;
  limit?: number;
};
