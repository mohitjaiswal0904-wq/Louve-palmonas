"use client";

import { useCartState } from "@/state/cart.state";

export function useCart() {
  return useCartState();
}
