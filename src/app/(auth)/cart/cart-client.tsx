"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Lock,
  Trash2,
  Plus,
  Minus,
  X,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  Truck,
} from "lucide-react";

import { PopularSearches } from "@/components/common";
import { useAuth, useCart, useMessages, useOrder, usePayment } from "@/hooks";
import { cn } from "@/lib/utils";
import type { CartItemDTO, OrderDTO, PayOrderResponse } from "@/types";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: () => void) => void;
    };
  }
}

type PaymentMethod = "razorpay" | "cod";

type CodAddress = {
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

const TAX_RATE = 0.08;

const EMPTY_COD_ADDRESS: CodAddress = {
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
};

function formatMoney(amount: string, currency: string): string {
  const num = parseFloat(amount);
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency} ${num.toFixed(0)}`;
  }
}

export default function CartClient() {
  const router = useRouter();
  const m = useMessages();
  const { user, loading: authLoading } = useAuth();
  const {
    items,
    itemCount,
    subtotal,
    loading: cartLoading,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
  } = useCart();
  const order = useOrder();
  const { payOrder, verifyRazorpay } = usePayment();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const [codAddress, setCodAddress] = useState<CodAddress>(EMPTY_COD_ADDRESS);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<OrderDTO | null>(null);
  const razorpayLoaded = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  const loadRazorpayScript = useCallback((): Promise<void> => {
    if (razorpayLoaded.current && window.Razorpay) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        razorpayLoaded.current = true;
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  }, []);

  const sub = parseFloat(subtotal.amount);
  const tax = sub * TAX_RATE;
  const total = sub + tax;
  const currency = subtotal.currency || "INR";

  const handleQtyChange = useCallback(
    async (item: CartItemDTO, delta: number) => {
      const next = item.quantity + delta;
      if (next < 1) {
        await removeItem(item.id);
        return;
      }
      await updateItem(item.id, { quantity: next });
    },
    [updateItem, removeItem],
  );

  const codFormValid = useMemo(() => {
    const { full_name, phone, line1, city, state, postal_code } = codAddress;
    return !!(
      full_name.trim() &&
      phone.trim() &&
      line1.trim() &&
      city.trim() &&
      state.trim() &&
      postal_code.trim()
    );
  }, [codAddress]);

  const canPlaceOrder =
    paymentMethod === "razorpay" || (paymentMethod === "cod" && codFormValid);

  const handlePlaceOrder = useCallback(async () => {
    if (paymentMethod === "cod" && !codFormValid) return;
    setCheckoutError(null);
    setActionLoading(true);

    try {
      const createPayload: Record<string, unknown> =
        paymentMethod === "cod"
          ? {
              payment_method: "cod",
              shipping_address: {
                full_name: codAddress.full_name,
                phone: codAddress.phone,
                line1: codAddress.line1,
                line2: codAddress.line2,
                city: codAddress.city,
                state: codAddress.state,
                postal_code: codAddress.postal_code,
                country: codAddress.country || "India",
              },
            }
          : { payment_method: "razorpay" };

      const createRes = await order.createOrder(
        createPayload as Parameters<typeof order.createOrder>[0],
      );

      if (!createRes.success || !createRes.data) {
        setCheckoutError(
          createRes.message || "Could not create order. Please try again.",
        );
        setActionLoading(false);
        return;
      }

      const createdOrder = createRes.data;
      const payRes = await payOrder(createdOrder.id);

      if (!payRes.success || !payRes.data) {
        setCheckoutError("Payment initiation failed. Please try again.");
        setActionLoading(false);
        return;
      }

      const payData: PayOrderResponse = payRes.data;

      if (paymentMethod === "cod") {
        await refreshCart();
        setSuccessOrder(createdOrder);
        setActionLoading(false);
        setTimeout(() => {
          router.push(`/account/orders/${createdOrder.id}`);
        }, 2200);
        return;
      }

      await loadRazorpayScript();

      const options: Record<string, unknown> = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payData.payment.amount,
        currency: payData.payment.currency,
        name: "Louve",
        description: `Order ${createdOrder.order_number}`,
        order_id: payData.razorpay_order_id,
        one_click_checkout: true,
        show_coupons: false,
        prefill: {
          name: user?.profile?.display_name || "",
          email: user?.email || "",
          contact: user?.profile?.phone || "",
        },
        theme: { color: "#1A1A1A" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await verifyRazorpay({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyRes.success) {
              await refreshCart();
              setSuccessOrder(createdOrder);
              setTimeout(() => {
                router.push(`/account/orders/${createdOrder.id}`);
              }, 2200);
            } else {
              setCheckoutError("Payment verification failed.");
            }
          } catch {
            setCheckoutError(
              "Payment verification failed. Please contact support.",
            );
          } finally {
            setActionLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setActionLoading(false);
            setCheckoutError("Payment was cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setActionLoading(false);
        setCheckoutError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.";
      setCheckoutError(
        /cart is empty/i.test(msg)
          ? "Your cart is empty. Add items before checkout."
          : msg,
      );
      setActionLoading(false);
    }
  }, [
    paymentMethod,
    codFormValid,
    codAddress,
    order,
    payOrder,
    verifyRazorpay,
    refreshCart,
    loadRazorpayScript,
    router,
    user,
  ]);

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-light tracking-wide text-zinc-500">
          {m.common.loading}
        </p>
      </div>
    );
  }

  if (!user) return null;

  const loading = cartLoading;
  const isEmpty = items.length === 0 && !successOrder;

  if (successOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-md">
        <div className="relative w-full max-w-md border border-zinc-200/80 bg-zinc-50/95 p-10 text-center shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300/80">
            <CheckCircle2
              className="h-7 w-7 text-zinc-800"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="mt-6 text-2xl font-light tracking-tight text-zinc-900">
            Order placed successfully
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
            Thank you. Order{" "}
            <span className="text-zinc-800">{successOrder.order_number}</span>{" "}
            is confirmed. Taking you to your order…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-6 md:py-16">
        {/* Navigation & Header */}
        <div className="mb-12 space-y-6">
          <Link
            href="/products"
            className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-600"
          >
            <ArrowLeft className="h-3 w-3" />
            Continue Shopping
          </Link>
          <div className="flex items-baseline justify-between border-b border-[#F6F1E9] pb-8">
            <h1 className="text-2xl font-light tracking-tight text-zinc-900 md:text-3xl">
              Shopping Cart{" "}
              <span className="italic text-zinc-400">({itemCount} items)</span>
            </h1>
            <button
              type="button"
              disabled={loading || isEmpty}
              onClick={() => clearCart()}
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-[#77080E] disabled:opacity-30"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {loading && !isEmpty ? (
          <p className="text-sm font-light text-zinc-500">
            {m.common.loading}
          </p>
        ) : isEmpty ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="text-xl font-light tracking-tight text-zinc-800">
              Your bag is empty
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500">
              Discover our curated selection of fine jewelry and objects.
            </p>
            <Link
              href="/products"
              className="mt-10 inline-block border border-zinc-900/90 bg-zinc-900 px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-zinc-800"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
            {/* Cart items */}
            <ul className="space-y-6">
              {items.map((item) => (
                <CartLine
                  key={item.id}
                  item={item}
                  disabled={loading}
                  onQtyChange={handleQtyChange}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </ul>

            {/* Checkout sidebar */}
            <aside className="space-y-0 rounded-sm border border-[#F6F1E9] bg-white">
              {/* Step 1: Payment method */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-2">
                  <CreditCard
                    className="h-4 w-4 text-zinc-400"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-sm font-medium tracking-tight text-zinc-900">
                    Payment Method
                  </h2>
                </div>

                <div className="mt-4 space-y-2.5">
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-all",
                      paymentMethod === "razorpay"
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-[#F6F1E9] hover:border-zinc-300",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="mt-0.5 accent-zinc-900"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard
                          className="h-4 w-4 text-zinc-500"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm font-medium text-zinc-900">
                          Online Payment (Razorpay)
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-light text-zinc-400">
                        Pay securely via UPI, cards, net banking
                      </p>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-all",
                      paymentMethod === "cod"
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-[#F6F1E9] hover:border-zinc-300",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-0.5 accent-zinc-900"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck
                          className="h-4 w-4 text-zinc-500"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm font-medium text-zinc-900">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-light text-zinc-400">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 2: COD address form or Place Order */}
              <div className="border-t border-[#F6F1E9] px-8 py-6">
                {paymentMethod === "cod" && (
                  <CodAddressForm
                    address={codAddress}
                    onChange={setCodAddress}
                  />
                )}

                {paymentMethod === "razorpay" && (
                  <p className="mb-4 text-xs font-light leading-relaxed text-zinc-400">
                    Razorpay will securely collect your delivery address and
                    payment details.
                  </p>
                )}

                {checkoutError && (
                  <p className="mb-4 text-sm text-[#77080E]" role="alert">
                    {checkoutError}
                  </p>
                )}

                <button
                  type="button"
                  disabled={actionLoading || !canPlaceOrder}
                  onClick={handlePlaceOrder}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 bg-zinc-900 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-black",
                    "disabled:pointer-events-none disabled:opacity-40",
                  )}
                >
                  <Lock className="h-3.5 w-3.5" />
                  {actionLoading ? "Processing…" : "Place Order"}
                </button>
              </div>

              {/* Order summary */}
              <div className="border-t border-[#F6F1E9] px-8 py-6">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Order Summary
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">
                      {formatMoney(subtotal.amount, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Shipping</span>
                    <span className="font-medium uppercase text-zinc-900">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#F6F1E9] pb-3 text-sm text-zinc-500">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-zinc-900">
                      {formatMoney(tax.toString(), currency)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-base font-semibold text-zinc-900">
                      Total
                    </span>
                    <span className="text-base font-semibold text-zinc-900">
                      {formatMoney(total.toString(), currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-3 border-t border-[#F6F1E9] px-8 py-6">
                <TrustBadge
                  icon={RotateCcw}
                  text="Free returns within 30 days"
                />
                <TrustBadge
                  icon={ShieldCheck}
                  text="2-year warranty included"
                />
                <TrustBadge
                  icon={CheckCircle2}
                  text="Secure payment processing"
                />
              </div>
            </aside>
          </div>
        )}

        <PopularSearches
          variant="footer"
          showLogo
          limit={12}
          title="Popular Searches"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COD Address Form
// ═══════════════════════════════════════════════════════════════

function CodAddressForm({
  address,
  onChange,
}: {
  address: CodAddress;
  onChange: (addr: CodAddress) => void;
}) {
  const set = (field: keyof CodAddress, value: string) =>
    onChange({ ...address, [field]: value });

  const inputCls =
    "w-full border border-[#F6F1E9] bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-400 focus:outline-none transition-colors";

  return (
    <div className="mb-5">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400">
        Delivery Address
      </p>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            placeholder="Full name *"
            value={address.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            className={inputCls}
          />
          <input
            required
            placeholder="Phone *"
            value={address.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls}
          />
        </div>
        <input
          required
          placeholder="Address line 1 *"
          value={address.line1}
          onChange={(e) => set("line1", e.target.value)}
          className={inputCls}
        />
        <input
          placeholder="Address line 2 (optional)"
          value={address.line2}
          onChange={(e) => set("line2", e.target.value)}
          className={inputCls}
        />
        <div className="grid grid-cols-3 gap-3">
          <input
            required
            placeholder="City *"
            value={address.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputCls}
          />
          <input
            required
            placeholder="State *"
            value={address.state}
            onChange={(e) => set("state", e.target.value)}
            className={inputCls}
          />
          <input
            required
            placeholder="PIN code *"
            value={address.postal_code}
            onChange={(e) => set("postal_code", e.target.value)}
            className={inputCls}
          />
        </div>
        <input
          placeholder="Country"
          value={address.country}
          onChange={(e) => set("country", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Cart Line Item
// ═══════════════════════════════════════════════════════════════

type CartLineProps = {
  item: CartItemDTO;
  disabled: boolean;
  onQtyChange: (item: CartItemDTO, delta: number) => void;
  onRemove: () => void;
};

function CartLine({ item, disabled, onQtyChange, onRemove }: CartLineProps) {
  const product = item.product;
  const variant = item.variant;
  const imageUrl = product?.image;

  return (
    <li className="relative flex items-start border border-[#F6F1E9] bg-white p-[20px] transition-all hover:border-[#E5C16C]/30">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product?.image_alt || product?.title || "Product"}
            fill
            sizes="80px"
            className="object-contain"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="ml-10 flex-1">
        <div className="space-y-2">
          <Link
            href={`/products/${product?.handle}`}
            className="block text-lg font-medium tracking-tight text-zinc-900 transition-colors hover:text-[#77080E]"
          >
            {product?.title ?? "Product"}
          </Link>

          <div className="flex gap-16 text-sm font-light text-zinc-400">
            <p>
              Color: <span className="text-zinc-600">Gold</span>
            </p>
            <p>
              Karat: <span className="text-zinc-600">22k</span>
            </p>
            <p>
              Size: <span className="text-zinc-600">22</span>
            </p>
          </div>

          <div>
            <span className="inline-block rounded-sm bg-[#F6E9E9] px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#77080E]/70">
              TAGS
            </span>
          </div>

          <div className="pt-1">
            <div className="inline-flex items-center rounded-lg border border-zinc-100 bg-[#FDFDFD] px-2">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, -1)}
                className="flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-zinc-900 disabled:opacity-20"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-zinc-800">
                {item.quantity}
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onQtyChange(item, 1)}
                className="flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-zinc-900 disabled:opacity-20"
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-medium text-zinc-900">
          {variant?.price
            ? formatMoney(variant.price.amount, variant.price.currency)
            : "₹00.00"}
        </p>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button className="text-sm font-light text-zinc-400 transition-colors hover:text-zinc-900">
          Save for later
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="text-zinc-300 transition-colors hover:text-[#77080E]"
        >
          <Trash2 className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </li>
  );
}

// ═══════════════════════════════════════════════════════════════
// Trust Badge
// ═══════════════════════════════════════════════════════════════

function TrustBadge({
  icon: Icon,
  text,
}: {
  icon: typeof CheckCircle2;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
      <span className="text-sm font-normal text-zinc-500">{text}</span>
    </div>
  );
}
