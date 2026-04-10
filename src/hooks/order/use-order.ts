"use client";

import { useOrderState } from "@/state/order.state";

export function useOrder() {
  return useOrderState();
}
