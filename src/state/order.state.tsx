"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { createCsrApiClient } from "@/lib/client";
import * as orderService from "@/services/order.service";
import type {
  ApiResponse,
  CheckoutSimulateRequest,
  CreateOrderRequest,
  OrderCountDTO,
  OrderDTO,
  OrderListParams,
  OrderSummaryDTO,
  PaginatedResponse,
} from "@/types";

export type OrderStateValue = {
  createOrder: (data?: CreateOrderRequest) => Promise<ApiResponse<OrderDTO>>;
  listOrders: (params?: OrderListParams) => Promise<PaginatedResponse<OrderSummaryDTO[]>>;
  getOrder: (id: number) => Promise<ApiResponse<OrderDTO>>;
  getOrderByNumber: (number: string) => Promise<ApiResponse<OrderDTO>>;
  getOrderCount: () => Promise<ApiResponse<OrderCountDTO>>;
  simulateCheckout: (orderId: number, data: CheckoutSimulateRequest) => Promise<ApiResponse<OrderDTO>>;
  cancelOrder: (orderId: number) => Promise<ApiResponse<OrderDTO>>;
};

const OrderStateContext = createContext<OrderStateValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);

  const createOrderFn = useCallback(
    (data?: CreateOrderRequest) => orderService.createOrder(client, data),
    [client],
  );

  const listOrdersFn = useCallback(
    (params?: OrderListParams) => orderService.listOrders(client, params),
    [client],
  );

  const getOrderFn = useCallback(
    (id: number) => orderService.getOrder(client, id),
    [client],
  );

  const getOrderByNumberFn = useCallback(
    (number: string) => orderService.getOrderByNumber(client, number),
    [client],
  );

  const getOrderCountFn = useCallback(
    () => orderService.getOrderCount(client),
    [client],
  );

  const simulateCheckoutFn = useCallback(
    (orderId: number, data: CheckoutSimulateRequest) =>
      orderService.simulateCheckout(client, orderId, data),
    [client],
  );

  const cancelOrderFn = useCallback(
    (orderId: number) => orderService.cancelOrder(client, orderId),
    [client],
  );

  const value = useMemo<OrderStateValue>(
    () => ({
      createOrder: createOrderFn,
      listOrders: listOrdersFn,
      getOrder: getOrderFn,
      getOrderByNumber: getOrderByNumberFn,
      getOrderCount: getOrderCountFn,
      simulateCheckout: simulateCheckoutFn,
      cancelOrder: cancelOrderFn,
    }),
    [createOrderFn, listOrdersFn, getOrderFn, getOrderByNumberFn, getOrderCountFn, simulateCheckoutFn, cancelOrderFn],
  );

  return (
    <OrderStateContext.Provider value={value}>{children}</OrderStateContext.Provider>
  );
}

export function useOrderState(): OrderStateValue {
  const ctx = useContext(OrderStateContext);
  if (!ctx) throw new Error("useOrderState must be used within <OrderProvider>");
  return ctx;
}
