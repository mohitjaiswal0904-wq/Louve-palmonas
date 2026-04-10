"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createCsrApiClient } from "@/lib/client";
import * as cartService from "@/services/cart.service";
import { useAuthState } from "./auth.state";
import type {
  AddToCartRequest,
  CartItemDTO,
  CartSummaryDTO,
  UpdateCartItemRequest,
} from "@/types";

export type CartStateValue = {
  items: CartItemDTO[];
  itemCount: number;
  uniqueItems: number;
  subtotal: { amount: string; currency: string };
  loading: boolean;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateItem: (id: number, data: UpdateCartItemRequest) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  removeMultiple: (itemIds: number[]) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartStateContext = createContext<CartStateValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);
  const { user } = useAuthState();
  const [items, setItems] = useState<CartItemDTO[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [uniqueItems, setUniqueItems] = useState(0);
  const [subtotal, setSubtotal] = useState({ amount: "0.00", currency: "INR" });
  const [loading, setLoading] = useState(false);

  const applySummary = useCallback((s: CartSummaryDTO) => {
    setItems(s.items);
    setItemCount(s.item_count);
    setUniqueItems(s.unique_items);
    setSubtotal(s.subtotal);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      setItemCount(0);
      setUniqueItems(0);
      setSubtotal({ amount: "0.00", currency: "INR" });
      return;
    }
    setLoading(true);
    try {
      const res = await cartService.getCartSummary(client);
      if (res.success && res.data) {
        applySummary(res.data as CartSummaryDTO);
      }
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  }, [client, user, applySummary]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (data: AddToCartRequest) => {
      await cartService.addToCart(client, data);
      await refreshCart();
    },
    [client, refreshCart],
  );

  const updateItem = useCallback(
    async (id: number, data: UpdateCartItemRequest) => {
      await cartService.updateCartItem(client, id, data);
      await refreshCart();
    },
    [client, refreshCart],
  );

  const removeItem = useCallback(
    async (id: number) => {
      await cartService.removeCartItem(client, id);
      await refreshCart();
    },
    [client, refreshCart],
  );

  const removeMultiple = useCallback(
    async (itemIds: number[]) => {
      await cartService.removeMultipleCartItems(client, itemIds);
      await refreshCart();
    },
    [client, refreshCart],
  );

  const clearCartFn = useCallback(async () => {
    await cartService.clearCart(client);
    setItems([]);
    setItemCount(0);
    setUniqueItems(0);
    setSubtotal({ amount: "0.00", currency: "INR" });
  }, [client]);

  const value = useMemo<CartStateValue>(
    () => ({
      items,
      itemCount,
      uniqueItems,
      subtotal,
      loading,
      addToCart,
      updateItem,
      removeItem,
      removeMultiple,
      clearCart: clearCartFn,
      refreshCart,
    }),
    [items, itemCount, uniqueItems, subtotal, loading, addToCart, updateItem, removeItem, removeMultiple, clearCartFn, refreshCart],
  );

  return (
    <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>
  );
}

export function useCartState(): CartStateValue {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error("useCartState must be used within <CartProvider>");
  return ctx;
}
