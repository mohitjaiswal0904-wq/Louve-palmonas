export type PaymentDTO = {
  id: number;
  payment_code?: string;
  order_code?: string;
  user_code?: string;
  order_id: number;
  user_id: number;
  method: string;
  status: string;
  amount: string;
  currency: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  failure_reason?: string;
  created_at: string;
  updated_at: string;
};

export type RefundDTO = {
  id: number;
  refund_code?: string;
  payment_code?: string;
  order_code?: string;
  user_code?: string;
  payment_id: number;
  order_id: number;
  user_id: number;
  amount: string;
  currency: string;
  status: string;
  razorpay_refund_id?: string;
  reason?: string;
  created_at: string;
  updated_at: string;
};

export type PayOrderResponse = {
  payment: PaymentDTO;
  method: string;
  razorpay_order_id?: string;
  status?: string;
};

export type VerifyPaymentRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RefundRequest = {
  payment_id: number;
  amount: string;
  reason?: string;
};
