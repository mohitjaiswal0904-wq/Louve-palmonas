"use client";

import { useMemo, useCallback } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as paymentService from "@/services/payment.service";
import type { VerifyPaymentRequest, RefundRequest } from "@/types";

export function usePayment() {
  const client = useMemo(() => createCsrApiClient(), []);

  const payOrder = useCallback(
    (orderId: number) => paymentService.payOrder(client, orderId),
    [client],
  );

  const verifyRazorpay = useCallback(
    (data: VerifyPaymentRequest) => paymentService.verifyRazorpayPayment(client, data),
    [client],
  );

  const getPaymentByOrder = useCallback(
    (orderId: number) => paymentService.getPaymentByOrder(client, orderId),
    [client],
  );

  const requestRefund = useCallback(
    (data: RefundRequest) => paymentService.requestRefund(client, data),
    [client],
  );

  return { payOrder, verifyRazorpay, getPaymentByOrder, requestRefund };
}
