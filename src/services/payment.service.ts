import type { ApiClient } from "@/lib/client";
import type { ApiResponse, PaymentDTO, PayOrderResponse, VerifyPaymentRequest, RefundDTO, RefundRequest } from "@/types";

export async function payOrder(client: ApiClient, orderId: number) {
  return client.post<ApiResponse<PayOrderResponse>>(`/api/v1/orders/${orderId}/pay`, {});
}

export async function verifyRazorpayPayment(client: ApiClient, data: VerifyPaymentRequest) {
  return client.post<ApiResponse<PaymentDTO>>("/api/v1/payments/razorpay/verify", data);
}

export async function getPaymentByOrder(client: ApiClient, orderId: number) {
  return client.get<ApiResponse<PaymentDTO>>(`/api/v1/payments/order/${orderId}`);
}

export async function listPayments(client: ApiClient) {
  return client.get<ApiResponse<PaymentDTO[]>>("/api/v1/payments");
}

export async function requestRefund(client: ApiClient, data: RefundRequest) {
  return client.post<ApiResponse<RefundDTO>>("/api/v1/payments/refund", data);
}
