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

  const applyLocalItems = useCallback(
    (nextItems: CartItemDTO[]) => {
      setItems(nextItems);
      setUniqueItems(nextItems.length);
      const nextItemCount = nextItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
      setItemCount(nextItemCount);
      const nextSubtotalAmount = nextItems.reduce((sum, it) => {
        const amt = parseFloat(it.line_total?.amount ?? "0");
        return sum + (Number.isFinite(amt) ? amt : 0);
      }, 0);
      setSubtotal((s) => ({
        amount: nextSubtotalAmount.toFixed(2),
        currency: s.currency || "INR",
      }));
    },
    [],
  );

  const refreshCart = useCallback(async (opts?: { silent?: boolean }) => {
    if (!user) {
      setItems([]);
      setItemCount(0);
      setUniqueItems(0);
      setSubtotal({ amount: "0.00", currency: "INR" });
      return;
    }
    if (!opts?.silent) setLoading(true);
    try {
      const res = await cartService.getCartSummary(client);
      if (res.success && res.data) {
        applySummary(res.data as CartSummaryDTO);
      }
    } catch {
      /* noop */
    } finally {
      if (!opts?.silent) setLoading(false);
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
      // Optimistic update (prevents "page refresh" feeling)
      if (typeof data.quantity === "number") {
        setItems((prev) => {
          const next = prev.map((it) => {
            if (it.id !== id) return it;
            const nextQty = data.quantity ?? it.quantity;
            const unit = parseFloat(it.variant?.price?.amount ?? "0");
            const lineTotal =
              Number.isFinite(unit) && unit > 0
                ? (unit * nextQty).toFixed(2)
                : it.line_total?.amount ?? "0.00";
            return {
              ...it,
              quantity: nextQty,
              line_total: { ...it.line_total, amount: lineTotal },
            };
          });
          // Update derived totals right away
          queueMicrotask(() => applyLocalItems(next));
          return next;
        });
      }

      try {
        await cartService.updateCartItem(client, id, data);
        // Sync with backend quietly
        await refreshCart({ silent: true });
      } catch {
        // On failure, re-sync quietly to revert optimistic state
        await refreshCart({ silent: true });
        // Keep UI responsive; callers shouldn't crash on tap.
      }
    },
    [client, refreshCart, applyLocalItems],
  );

  const removeItem = useCallback(
    async (id: number) => {
      // Optimistic remove
      setItems((prev) => {
        const next = prev.filter((it) => it.id !== id);
        queueMicrotask(() => applyLocalItems(next));
        return next;
      });
      try {
        await cartService.removeCartItem(client, id);
        await refreshCart({ silent: true });
      } catch {
        await refreshCart({ silent: true });
        // Keep UI responsive; callers shouldn't crash on tap.
      }
    },
    [client, refreshCart, applyLocalItems],
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
