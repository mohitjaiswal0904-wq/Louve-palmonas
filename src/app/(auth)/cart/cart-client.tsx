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
  MapPin,
  CreditCard,
  Truck,
  ChevronRight,
} from "lucide-react";

import {
  useAuth,
  useCart,
  useMessages,
  useOrder,
  useAddress,
  usePayment,
} from "@/hooks";
import { cn } from "@/lib/utils";
import type {
  CartItemDTO,
  OrderDTO,
  AddressDTO,
  CreateAddressRequest,
  PayOrderResponse,
} from "@/types";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: () => void) => void;
    };
  }
}

type CheckoutStep = 1 | 2 | 3;
type PaymentMethod = "razorpay" | "cod";

const STEP_LABELS = ["Address", "Payment", "Review"] as const;
const TAX_RATE = 0.08;

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
  const {
    addresses,
    loading: addrLoading,
    defaultAddress,
    fetchAddresses,
    createAddress,
  } = useAddress();
  const { payOrder, verifyRazorpay } = usePayment();

  const [step, setStep] = useState<CheckoutStep>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<OrderDTO | null>(null);
  const razorpayLoaded = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (defaultAddress && !selectedAddressId) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [defaultAddress, selectedAddressId]);

  useEffect(() => {
    if (addresses.length === 0 && !addrLoading) {
      setShowAddressForm(true);
    }
  }, [addresses.length, addrLoading]);

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

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) ?? null,
    [addresses, selectedAddressId],
  );

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

  const canAdvance = (s: CheckoutStep): boolean => {
    if (s === 1) return selectedAddressId !== null;
    if (s === 2) return !!paymentMethod;
    return false;
  };

  const handleNext = () => {
    if (step < 3 && canAdvance(step)) setStep((step + 1) as CheckoutStep);
  };

  const handlePlaceOrder = useCallback(async () => {
    if (!selectedAddressId) return;
    setCheckoutError(null);
    setActionLoading(true);

    try {
      const createRes = await order.createOrder({
        payment_method: paymentMethod,
        address_id: selectedAddressId,
      });

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

      // Razorpay flow
      await loadRazorpayScript();

      const options: Record<string, unknown> = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseFloat(payData.payment.amount) * 100,
        currency: payData.payment.currency,
        name: "Louve",
        description: `Order ${createdOrder.order_number}`,
        order_id: payData.razorpay_order_id,
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
            setCheckoutError("Payment verification failed. Please contact support.");
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
    } catch {
      setCheckoutError("Something went wrong. Please try again.");
      setActionLoading(false);
    }
  }, [
    selectedAddressId,
    paymentMethod,
    order,
    payOrder,
    verifyRazorpay,
    refreshCart,
    loadRazorpayScript,
    router,
    user,
  ]);

  const handleAddressCreated = useCallback(
    async (data: CreateAddressRequest) => {
      setActionLoading(true);
      try {
        await createAddress(data);
        await fetchAddresses();
        setShowAddressForm(false);
      } catch {
        setCheckoutError("Could not save address.");
      } finally {
        setActionLoading(false);
      }
    },
    [createAddress, fetchAddresses],
  );

  // After fetchAddresses, auto-select the newest address if none selected
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const def = addresses.find((a) => a.is_default);
      setSelectedAddressId(def?.id ?? addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

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

  // ── Success overlay ──
  if (successOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-md">
        <div className="relative w-full max-w-md border border-zinc-200/80 bg-zinc-50/95 p-10 text-center shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300/80">
            <CheckCircle2 className="h-7 w-7 text-zinc-800" strokeWidth={1.5} />
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
            {/* ── Cart items ── */}
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

            {/* ── Checkout sidebar ── */}
            <aside className="space-y-0 rounded-sm border border-[#F6F1E9] bg-white">
              {/* Progress indicator */}
              <div className="flex items-center justify-between border-b border-[#F6F1E9] px-8 py-5">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = (i + 1) as CheckoutStep;
                  const isActive = step === stepNum;
                  const isDone = step > stepNum;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (isDone) setStep(stepNum);
                      }}
                      disabled={!isDone}
                      className={cn(
                        "flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
                        isActive && "text-zinc-900",
                        isDone &&
                          "cursor-pointer text-zinc-400 hover:text-zinc-600",
                        !isActive && !isDone && "text-zinc-300",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold",
                          isActive &&
                            "bg-zinc-900 text-white",
                          isDone &&
                            "bg-zinc-200 text-zinc-600",
                          !isActive &&
                            !isDone &&
                            "bg-zinc-100 text-zinc-300",
                        )}
                      >
                        {isDone ? "✓" : stepNum}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                      {i < STEP_LABELS.length - 1 && (
                        <ChevronRight className="ml-1 h-3 w-3 text-zinc-200" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Step content */}
              <div className="min-h-[260px] px-8 py-6">
                {step === 1 && (
                  <StepAddress
                    addresses={addresses}
                    loading={addrLoading}
                    selectedId={selectedAddressId}
                    onSelect={setSelectedAddressId}
                    showForm={showAddressForm}
                    onToggleForm={() => setShowAddressForm((v) => !v)}
                    onCreateAddress={handleAddressCreated}
                    formLoading={actionLoading}
                  />
                )}

                {step === 2 && (
                  <StepPayment
                    method={paymentMethod}
                    onChange={setPaymentMethod}
                  />
                )}

                {step === 3 && (
                  <StepReview
                    address={selectedAddress}
                    method={paymentMethod}
                    itemCount={itemCount}
                    total={formatMoney(total.toString(), currency)}
                  />
                )}

                {checkoutError && (
                  <p
                    className="mt-4 text-sm text-[#77080E]"
                    role="alert"
                  >
                    {checkoutError}
                  </p>
                )}

                {/* Step navigation */}
                <div className="mt-6 flex items-center gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((step - 1) as CheckoutStep)}
                      className="border border-zinc-200 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={!canAdvance(step)}
                      onClick={handleNext}
                      className={cn(
                        "ml-auto flex items-center gap-2 bg-zinc-900 px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black",
                        "disabled:opacity-30 disabled:pointer-events-none",
                      )}
                    >
                      Continue
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={handlePlaceOrder}
                      className={cn(
                        "ml-auto flex w-full items-center justify-center gap-2 bg-zinc-900 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-black",
                        "disabled:opacity-40 disabled:pointer-events-none",
                      )}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      {actionLoading ? "Processing…" : "Place Order"}
                    </button>
                  )}
                </div>
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
                <TrustBadge icon={RotateCcw} text="Free returns within 30 days" />
                <TrustBadge icon={ShieldCheck} text="2-year warranty included" />
                <TrustBadge icon={CheckCircle2} text="Secure payment processing" />
              </div>
            </aside>
          </div>
        )}

        {/* SEO Footer */}
        <div className="mt-40 space-y-12">
          <div className="flex h-12 w-12 items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Louve"
              width={48}
              height={20}
              className="opacity-40"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-lg font-light tracking-wide text-zinc-900">
              Popular Searches
            </h3>
            <div className="space-y-6">
              <SEOSection
                label="For Women"
                links="Demi-Fine Jewellery | Rings For Women | Earrings For Women | Bracelet For Women | Pendants For Women | Necklaces For Women"
              />
              <SEOSection
                label="For Men"
                links="Rings For Men | Pendant For Men | Chain For Men"
              />
              <SEOSection
                label="Mangalsutra"
                links="Gold Mangalsutra | Diamond Mangalsutra | Infinity Mangalsutra"
              />
              <SEOSection
                label="Pendants"
                links="Gold Pendants | Diamond Pendants | Solitaire Pendants | Evil Eye Pendants"
              />
              <SEOSection
                label="Bracelets"
                links="Gold Bracelets | Diamond Bracelets | Pearl Bracelets | Evil Eye Bracelets | Chain Bracelets | Stone Bracelets | Cuff Bracelets"
              />
              <SEOSection
                label="Necklace"
                links="Gold Necklace | Diamond Necklace | Pearl Necklace | Necklaces For Women | Evil Eye Necklace | Name Necklace | Emerald Necklace"
              />
              <SEOSection
                label="Rings"
                links="Diamond Rings | Gold Rings | Silver Rings | Solitaire Rings | Gemstone Rings | Mens Rings | Engagement Ring | Couple Ring | Wedding Ring | Statement Ring | Emerald Ring"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Step 1 — Address Selection
// ═══════════════════════════════════════════════════════════════

type StepAddressProps = {
  addresses: AddressDTO[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
  showForm: boolean;
  onToggleForm: () => void;
  onCreateAddress: (data: CreateAddressRequest) => Promise<void>;
  formLoading: boolean;
};

function StepAddress({
  addresses,
  loading,
  selectedId,
  onSelect,
  showForm,
  onToggleForm,
  onCreateAddress,
  formLoading,
}: StepAddressProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
        <h2 className="text-sm font-medium tracking-tight text-zinc-900">
          Delivery Address
        </h2>
      </div>

      {loading ? (
        <p className="mt-4 text-xs font-light text-zinc-400">
          Loading addresses…
        </p>
      ) : (
        <>
          {addresses.length > 0 && (
            <div className="mt-4 space-y-2.5">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-all",
                    selectedId === addr.id
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-[#F6F1E9] hover:border-zinc-300",
                  )}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedId === addr.id}
                    onChange={() => onSelect(addr.id)}
                    className="mt-0.5 accent-zinc-900"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900">
                      {addr.full_name}
                      {addr.is_default && (
                        <span className="ml-2 text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs font-light leading-relaxed text-zinc-500">
                      {addr.line1}
                      {addr.line2 ? `, ${addr.line2}` : ""}
                      <br />
                      {addr.city}, {addr.state} {addr.postal_code}
                    </p>
                    <p className="mt-0.5 text-xs font-light text-zinc-400">
                      {addr.phone}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {!showForm && (
            <button
              type="button"
              onClick={onToggleForm}
              className="mt-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <Plus className="h-3 w-3" />
              Add new address
            </button>
          )}

          {showForm && (
            <div className="mt-4">
              <AddressForm
                onSubmit={onCreateAddress}
                onCancel={
                  addresses.length > 0 ? onToggleForm : undefined
                }
                loading={formLoading}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Inline Address Form
// ═══════════════════════════════════════════════════════════════

function AddressForm({
  onSubmit,
  onCancel,
  loading,
}: {
  onSubmit: (data: CreateAddressRequest) => Promise<void>;
  onCancel?: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<CreateAddressRequest>({
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  const set = (field: keyof CreateAddressRequest, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputCls =
    "w-full border border-[#F6F1E9] bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-400 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400">
        New Address
      </p>
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
          className={inputCls}
        />
        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={inputCls}
        />
      </div>
      <input
        required
        placeholder="Address line 1"
        value={form.line1}
        onChange={(e) => set("line1", e.target.value)}
        className={inputCls}
      />
      <input
        placeholder="Address line 2 (optional)"
        value={form.line2 ?? ""}
        onChange={(e) => set("line2", e.target.value)}
        className={inputCls}
      />
      <div className="grid grid-cols-3 gap-3">
        <input
          required
          placeholder="City"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          className={inputCls}
        />
        <input
          required
          placeholder="State"
          value={form.state}
          onChange={(e) => set("state", e.target.value)}
          className={inputCls}
        />
        <input
          required
          placeholder="PIN code"
          value={form.postal_code}
          onChange={(e) => set("postal_code", e.target.value)}
          className={inputCls}
        />
      </div>
      <input
        placeholder="Country"
        value={form.country ?? "India"}
        onChange={(e) => set("country", e.target.value)}
        className={inputCls}
      />
      <label className="flex items-center gap-2 text-xs text-zinc-500">
        <input
          type="checkbox"
          checked={form.is_default ?? false}
          onChange={(e) => set("is_default", e.target.checked)}
          className="accent-zinc-900"
        />
        Set as default address
      </label>
      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-900 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black disabled:opacity-40"
        >
          {loading ? "Saving…" : "Save Address"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400 hover:text-zinc-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
// Step 2 — Payment Method
// ═══════════════════════════════════════════════════════════════

function StepPayment({
  method,
  onChange,
}: {
  method: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  const options: { value: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
    {
      value: "razorpay",
      label: "Razorpay",
      desc: "Pay securely via UPI, cards, net banking",
      icon: CreditCard,
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      desc: "Pay when your order arrives",
      icon: Truck,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
        <h2 className="text-sm font-medium tracking-tight text-zinc-900">
          Payment Method
        </h2>
      </div>
      <div className="mt-4 space-y-2.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-all",
              method === opt.value
                ? "border-zinc-900 bg-zinc-50"
                : "border-[#F6F1E9] hover:border-zinc-300",
            )}
          >
            <input
              type="radio"
              name="payment"
              checked={method === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 accent-zinc-900"
            />
            <div>
              <div className="flex items-center gap-2">
                <opt.icon className="h-4 w-4 text-zinc-500" strokeWidth={1.5} />
                <span className="text-sm font-medium text-zinc-900">
                  {opt.label}
                </span>
              </div>
              <p className="mt-0.5 text-xs font-light text-zinc-400">
                {opt.desc}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Step 3 — Review
// ═══════════════════════════════════════════════════════════════

function StepReview({
  address,
  method,
  itemCount,
  total,
}: {
  address: AddressDTO | null;
  method: PaymentMethod;
  itemCount: number;
  total: string;
}) {
  return (
    <div>
      <h2 className="text-sm font-medium tracking-tight text-zinc-900">
        Review Your Order
      </h2>

      <div className="mt-4 space-y-4">
        {/* Address summary */}
        <div className="rounded-sm border border-[#F6F1E9] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
            Shipping to
          </p>
          {address ? (
            <div className="mt-1.5">
              <p className="text-sm font-medium text-zinc-900">
                {address.full_name}
              </p>
              <p className="text-xs font-light leading-relaxed text-zinc-500">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
                <br />
                {address.city}, {address.state} {address.postal_code}
              </p>
            </div>
          ) : (
            <p className="mt-1 text-xs text-zinc-400">No address selected</p>
          )}
        </div>

        {/* Payment summary */}
        <div className="rounded-sm border border-[#F6F1E9] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
            Payment
          </p>
          <p className="mt-1.5 text-sm font-medium text-zinc-900">
            {method === "razorpay"
              ? "Razorpay (Online Payment)"
              : "Cash on Delivery"}
          </p>
        </div>

        {/* Quick totals */}
        <div className="rounded-sm border border-[#F6F1E9] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
            Order
          </p>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xs font-light text-zinc-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="text-sm font-semibold text-zinc-900">{total}</span>
          </div>
        </div>
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
      {/* Product Image */}
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

      {/* Product Details */}
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

          {/* Quantity Selector */}
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

      {/* Price */}
      <div className="text-right">
        <p className="text-lg font-medium text-zinc-900">
          {variant?.price
            ? formatMoney(variant.price.amount, variant.price.currency)
            : "₹00.00"}
        </p>
      </div>

      {/* Actions */}
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
// Shared Components & Utilities
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

function SEOSection({ label, links }: { label: string; links: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {label}
      </p>
      <p className="text-[10px] leading-relaxed text-zinc-400/80">{links}</p>
    </div>
  );
}

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
