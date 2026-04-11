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
import * as wishlistService from "@/services/wishlist.service";
import { useAuthState } from "./auth.state";
import type {
  AddToWishlistRequest,
  ApiResponse,
  PaginatedResponse,
  UpdateWishlistItemRequest,
  WishlistCheckDTO,
  WishlistCountDTO,
  WishlistItemDTO,
  WishlistListParams,
  WishlistProductIdsDTO,
} from "@/types";

export type WishlistStateValue = {
  items: WishlistItemDTO[];
  count: number;
  wishlistedProductIds: Set<number>;
  loading: boolean;
  addToWishlist: (data: AddToWishlistRequest) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  updateItem: (id: number, data: UpdateWishlistItemRequest) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  moveToCart: (itemIds: number[]) => Promise<void>;
  fetchWishlist: (params?: WishlistListParams) => Promise<PaginatedResponse<WishlistItemDTO[]>>;
  fetchCount: () => Promise<ApiResponse<WishlistCountDTO>>;
  checkProduct: (productId: number) => Promise<ApiResponse<WishlistCheckDTO>>;
  fetchProductIds: () => Promise<void>;
};

const WishlistStateContext = createContext<WishlistStateValue | null>(null);

function isUnauthorized(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status?: number }).status === 401;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);
  const { user, loading: authLoading, refreshUser } = useAuthState();
  const [items, setItems] = useState<WishlistItemDTO[]>([]);
  const [count, setCount] = useState(0);
  const [wishlistedProductIds, setWishlistedProductIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchProductIds = useCallback(async () => {
    if (!user) {
      setWishlistedProductIds(new Set());
      setCount(0);
      return;
    }
    try {
      const res = await wishlistService.getWishlistProductIds(client);
      if (res.success && res.data) {
        const ids = (res.data as WishlistProductIdsDTO).product_ids ?? [];
        setWishlistedProductIds(new Set(ids));
        setCount(ids.length);
      }
    } catch {
      /* noop */
    }
  }, [client, user]);

  useEffect(() => {
    fetchProductIds();
  }, [fetchProductIds]);

  const addToWishlist = useCallback(
    async (data: AddToWishlistRequest) => {
      if (!user || authLoading) return;
      try {
        await wishlistService.addToWishlist(client, data);
        setWishlistedProductIds((prev) => new Set([...prev, data.product_id]));
        setCount((c) => c + 1);
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
      }
    },
    [client, user, authLoading, refreshUser],
  );

  const removeFromWishlist = useCallback(
    async (productId: number) => {
      if (!user || authLoading) return;
      try {
        await wishlistService.removeWishlistByProduct(client, productId);
        setWishlistedProductIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        setCount((c) => Math.max(0, c - 1));
        setItems((prev) => prev.filter((i) => i.product_id !== productId));
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
      }
    },
    [client, user, authLoading, refreshUser],
  );

  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (!user || authLoading) return;
      if (wishlistedProductIds.has(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist({ product_id: productId });
      }
    },
    [wishlistedProductIds, addToWishlist, removeFromWishlist, user, authLoading],
  );

  const updateItem = useCallback(
    async (id: number, data: UpdateWishlistItemRequest) => {
      if (!user || authLoading) return;
      try {
        const res = await wishlistService.updateWishlistItem(client, id, data);
        if (res.success && res.data) {
          setItems((prev) => prev.map((i) => (i.id === id ? (res.data as WishlistItemDTO) : i)));
        }
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
      }
    },
    [client, user, authLoading, refreshUser],
  );

  const removeItem = useCallback(
    async (id: number) => {
      if (!user || authLoading) return;
      const item = items.find((i) => i.id === id);
      try {
        await wishlistService.removeWishlistItem(client, id);
        setItems((prev) => prev.filter((i) => i.id !== id));
        setCount((c) => Math.max(0, c - 1));
        if (item) {
          setWishlistedProductIds((prev) => {
            const next = new Set(prev);
            next.delete(item.product_id);
            return next;
          });
        }
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
      }
    },
    [client, items, user, authLoading, refreshUser],
  );

  const moveToCart = useCallback(
    async (itemIds: number[]) => {
      if (!user || authLoading) return;
      try {
        await wishlistService.moveWishlistToCart(client, itemIds);
        const removed = items.filter((i) => itemIds.includes(i.id));
        setItems((prev) => prev.filter((i) => !itemIds.includes(i.id)));
        setCount((c) => Math.max(0, c - itemIds.length));
        setWishlistedProductIds((prev) => {
          const next = new Set(prev);
          removed.forEach((i) => next.delete(i.product_id));
          return next;
        });
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
      }
    },
    [client, items, user, authLoading, refreshUser],
  );

  const emptyWishlistPage = (): PaginatedResponse<WishlistItemDTO[]> => ({
    success: false,
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    timestamp: new Date().toISOString(),
  });

  const fetchWishlist = useCallback(
    async (params?: WishlistListParams) => {
      if (!user) {
        setItems([]);
        return emptyWishlistPage();
      }
      setLoading(true);
      try {
        const res = await wishlistService.listWishlist(client, params);
        if (res.success && res.data) {
          setItems(res.data);
        }
        return res;
      } catch (err) {
        if (isUnauthorized(err)) void refreshUser();
        return emptyWishlistPage();
      } finally {
        setLoading(false);
      }
    },
    [client, user, refreshUser],
  );

  const fetchCount = useCallback(
    () => wishlistService.getWishlistCount(client),
    [client],
  );

  const checkProduct = useCallback(
    (productId: number) => wishlistService.checkWishlist(client, productId),
    [client],
  );

  const value = useMemo<WishlistStateValue>(
    () => ({
      items,
      count,
      wishlistedProductIds,
      loading,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      updateItem,
      removeItem,
      moveToCart,
      fetchWishlist,
      fetchCount,
      checkProduct,
      fetchProductIds,
    }),
    [
      items, count, wishlistedProductIds, loading,
      addToWishlist, removeFromWishlist, toggleWishlist,
      updateItem, removeItem, moveToCart,
      fetchWishlist, fetchCount, checkProduct, fetchProductIds,
    ],
  );

  return (
    <WishlistStateContext.Provider value={value}>{children}</WishlistStateContext.Provider>
  );
}

export function useWishlistState(): WishlistStateValue {
  const ctx = useContext(WishlistStateContext);
  if (!ctx) throw new Error("useWishlistState must be used within <WishlistProvider>");
  return ctx;
}
