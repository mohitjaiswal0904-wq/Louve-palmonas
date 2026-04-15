"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { createCsrApiClient } from "@/lib/client";
import * as catalogService from "@/services/catalog.service";
import type {
  ApiResponse,
  FiltersDTO,
  PaginatedResponse,
  ProductDetailDTO,
  ProductDTO,
  ProductListParams,
} from "@/types";

export type CatalogStateValue = {
  listProducts: (
    params?: ProductListParams,
  ) => Promise<PaginatedResponse<ProductDTO[]>>;
  getProductByHandle: (handle: string) => Promise<ApiResponse<ProductDetailDTO>>;
  getProductById: (id: number) => Promise<ApiResponse<ProductDetailDTO>>;
  getFilters: () => Promise<ApiResponse<FiltersDTO>>;
};

const CatalogStateContext = createContext<CatalogStateValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);

  const value = useMemo<CatalogStateValue>(
    () => ({
      listProducts: (params) => catalogService.listProducts(client, params),
      getProductByHandle: (handle) => catalogService.getProductByHandle(client, handle),
      getProductById: (id) => catalogService.getProductById(client, id),
      getFilters: () => catalogService.getFilters(client),
    }),
    [client],
  );

  return (
    <CatalogStateContext.Provider value={value}>{children}</CatalogStateContext.Provider>
  );
}

export function useCatalogState(): CatalogStateValue {
  const ctx = useContext(CatalogStateContext);
  if (!ctx) {
    throw new Error("useCatalogState must be used within <CatalogProvider>");
  }
  return ctx;
}
