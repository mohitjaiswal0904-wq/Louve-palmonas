"use client";

import { useWishlistState } from "@/state/wishlist.state";

export function useWishlist() {
  return useWishlistState();
}
