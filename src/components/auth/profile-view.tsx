"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  Heart,
  MapPin,
  Package,
  Pencil,
  Phone,
  Plus,
  Shield,
  Star,
  Trash2,
  User,
} from "lucide-react";

import { useAddress, useAuth, useCart, useMessages, useOrder } from "@/hooks";
import { createCsrApiClient } from "@/lib/client";
import * as authService from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  AddressDTO,
  CreateAddressRequest,
  UpdateAddressRequest,
  UpdateProfileRequest,
} from "@/types";

type AddressFormData = {
  label: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

const emptyForm: AddressFormData = {
  label: "",
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

function formFromAddress(a: AddressDTO): AddressFormData {
  return {
    label: a.label ?? "",
    full_name: a.full_name,
    phone: a.phone,
    line1: a.line1,
    line2: a.line2 ?? "",
    city: a.city,
    state: a.state,
    postal_code: a.postal_code,
    country: a.country,
    is_default: a.is_default,
  };
}

export function ProfileView() {
  const m = useMessages();
  const { user, logout, loading, refreshUser } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { getOrderCount } = useOrder();
  const {
    addresses,
    loading: addressLoading,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  } = useAddress();

  const client = useMemo(() => createCsrApiClient(), []);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<AddressFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.profile?.display_name ?? "");
    setEmail(user.email ?? "");
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await getOrderCount();
        if (!cancelled && res.success && res.data) {
          setOrderTotal(res.data.count);
        }
      } catch {
        if (!cancelled) setOrderTotal(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getOrderCount, user]);

  const saveProfile = useCallback(async () => {
    if (!user) return;
    setProfileSaving(true);
    setProfileNotice(null);
    try {
      const payload: UpdateProfileRequest = {
        display_name: displayName.trim() || undefined,
        email: email.trim() || undefined,
      };
      const res = await authService.updateProfile(client, payload);
      if (res.success && res.data) {
        await refreshUser();
        setProfileNotice({ type: "ok", text: "Profile updated." });
        setProfileEditOpen(false);
      } else {
        setProfileNotice({
          type: "err",
          text: res.message ?? "Could not update profile.",
        });
      }
    } catch (e) {
      setProfileNotice({
        type: "err",
        text: e instanceof Error ? e.message : "Could not update profile.",
      });
    } finally {
      setProfileSaving(false);
    }
  }, [user, client, displayName, email, refreshUser]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">{m.common.loading}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Not authenticated.</p>
      </div>
    );
  }

  const initials = user.profile?.display_name
    ? user.profile.display_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.phone
      ? user.phone.slice(-2)
      : "L";

  const memberSince = new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowAddForm(true);
  }

  function openEdit(address: AddressDTO) {
    setShowAddForm(false);
    setForm(formFromAddress(address));
    setEditingId(address.id);
  }

  function cancelForm() {
    setShowAddForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateField<K extends keyof AddressFormData>(
    key: K,
    value: AddressFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId !== null) {
        const payload: UpdateAddressRequest = {
          ...(form.label ? { label: form.label } : {}),
          full_name: form.full_name,
          phone: form.phone,
          line1: form.line1,
          ...(form.line2 ? { line2: form.line2 } : {}),
          city: form.city,
          state: form.state,
          postal_code: form.postal_code,
          country: form.country,
          is_default: form.is_default,
        };
        await updateAddress(editingId, payload);
      } else {
        const payload: CreateAddressRequest = {
          ...(form.label ? { label: form.label } : {}),
          full_name: form.full_name,
          phone: form.phone,
          line1: form.line1,
          ...(form.line2 ? { line2: form.line2 } : {}),
          city: form.city,
          state: form.state,
          postal_code: form.postal_code,
          country: form.country,
          is_default: form.is_default,
        };
        await createAddress(payload);
      }
      cancelForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    await deleteAddress(id);
    if (editingId === id) cancelForm();
  }

  const isFormValid =
    form.full_name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.line1.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state.trim() !== "" &&
    form.postal_code.trim() !== "";

  const isAdmin = user.role?.toLowerCase() === "admin";

  return (
    <div className="mx-auto w-full max-w-4xl px-3 pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-6 sm:px-4 md:px-6 md:py-8 lg:px-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 to-zinc-100/80 p-6 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/80 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-2xl font-semibold text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900 sm:h-24 sm:w-24">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                {user.profile?.display_name ?? "Louve member"}
              </h1>
              {isAdmin && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  Admin
                </span>
              )}
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                Verified
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-3.5 shrink-0" aria-hidden />
              {user.phone}
            </p>
            {user.email ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{user.email}</p>
            ) : null}
            <p className="mt-2 text-xs text-zinc-500">Member since {memberSince}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 touch-manipulation sm:self-start"
            onClick={() => {
              setProfileNotice(null);
              setProfileEditOpen((v) => !v);
            }}
          >
            <Pencil className="mr-2 size-3.5" />
            Edit profile
          </Button>
        </div>

        {profileEditOpen && (
          <div className="mt-6 space-y-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-700">
            {profileNotice && (
              <p
                className={cn(
                  "text-sm",
                  profileNotice.type === "ok"
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-red-700 dark:text-red-300",
                )}
                role="status"
              >
                {profileNotice.text}
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Display name
                </span>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 sm:min-h-0"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 sm:min-h-0"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                disabled={profileSaving}
                className="min-h-[44px] touch-manipulation sm:min-h-9"
                onClick={() => void saveProfile()}
              >
                {profileSaving ? "Saving…" : "Save changes"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-h-[44px] touch-manipulation sm:min-h-9"
                onClick={() => {
                  setProfileEditOpen(false);
                  setDisplayName(user.profile?.display_name ?? "");
                  setEmail(user.email ?? "");
                  setProfileNotice(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Package className="size-5 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div>
              <p className="text-2xl font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                {orderTotal === null ? "—" : orderTotal}
              </p>
              <p className="text-xs text-muted-foreground">Total orders</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <MapPin className="size-5 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div>
              <p className="text-2xl font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                {addresses.length}
              </p>
              <p className="text-xs text-muted-foreground">Saved addresses</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Heart className="size-5 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div>
              <p className="text-2xl font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                {cartCount}
              </p>
              <p className="text-xs text-muted-foreground">Items in bag</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shortcuts */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/account/orders"
          className="flex min-h-[48px] min-w-[140px] shrink-0 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 touch-manipulation sm:min-w-0"
        >
          Orders
          <ChevronRight className="size-4 opacity-50" />
        </Link>
        <Link
          href="/cart"
          className="flex min-h-[48px] min-w-[140px] shrink-0 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 touch-manipulation sm:min-w-0"
        >
          Cart
          <ChevronRight className="size-4 opacity-50" />
        </Link>
        {isAdmin && (
          <Link
            href="/dashboard"
            className="flex min-h-[48px] min-w-[140px] shrink-0 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 touch-manipulation sm:min-w-0"
          >
            Dashboard
            <ChevronRight className="size-4 opacity-50" />
          </Link>
        )}
        <Link
          href="/help"
          className="flex min-h-[48px] min-w-[140px] shrink-0 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 touch-manipulation sm:min-w-0"
        >
          Help
          <ChevronRight className="size-4 opacity-50" />
        </Link>
      </div>

      {/* Account details */}
      <Card className="mt-8 border-zinc-200/80 shadow-sm dark:border-zinc-800">
        <CardHeader className="pb-2">
          <h2 className="text-base font-medium tracking-tight">Account details</h2>
          <p className="text-sm text-muted-foreground">
            Information we use for orders and sign-in. Phone is your primary login.
          </p>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800">
          <DetailRow icon={Phone} label="Phone" value={user.phone} mono />
          <DetailRow
            icon={User}
            label="Display name"
            value={user.profile?.display_name ?? "—"}
          />
          <DetailRow icon={CreditCard} label="Email" value={user.email ?? "Not set"} />
          <DetailRow label="Account status" value={user.status} />
          <DetailRow label="Role" value={user.role} />
          <DetailRow label="User ID" value={`#${user.id}`} mono />
        </CardContent>
      </Card>

      {/* Preferences & security */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-zinc-400" />
              <h2 className="text-base font-medium tracking-tight">Preferences</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <PrefRow label="Language / locale" value={user.profile?.locale ?? "Default (browser)"} />
            <PrefRow label="Time zone" value={user.profile?.time_zone ?? "—"} />
            <p className="text-xs text-muted-foreground">
              Locale preferences sync when you change the language in the site header.
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-zinc-400" />
              <h2 className="text-base font-medium tracking-tight">Security</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">Phone OTP login</p>
                <p className="text-muted-foreground">
                  Your number is verified. We send a one-time code when you sign in.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 size-4 shrink-0 text-zinc-400" />
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">Order updates</p>
                <p className="text-muted-foreground">
                  Confirmation and shipping emails use your account email when provided.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Addresses */}
      <div className="mt-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-zinc-400" />
            <h2 className="text-base font-medium tracking-tight">Delivery addresses</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="min-h-[44px] w-full touch-manipulation sm:min-h-9 sm:w-auto"
            onClick={openAdd}
          >
            <Plus className="size-3.5 sm:mr-1" />
            Add new
          </Button>
        </div>

        {addressLoading && addresses.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading addresses…</p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {showAddForm && (
            <AddressFormCard
              form={form}
              saving={saving}
              isValid={isFormValid}
              title="New address"
              onField={updateField}
              onSave={handleSave}
              onCancel={cancelForm}
            />
          )}

          {addresses.map((address) =>
            editingId === address.id ? (
              <AddressFormCard
                key={address.id}
                form={form}
                saving={saving}
                isValid={isFormValid}
                title="Edit address"
                onField={updateField}
                onSave={handleSave}
                onCancel={cancelForm}
              />
            ) : (
              <div
                key={address.id}
                className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800 sm:p-5"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {address.label && (
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {address.label}
                      </span>
                    )}
                    {address.is_default && (
                      <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white dark:bg-zinc-100 dark:text-zinc-900">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {address.full_name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{address.phone}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {address.line1}
                  {address.line2 && <>, {address.line2}</>}
                  <br />
                  {address.city}, {address.state} {address.postal_code}
                  <br />
                  {address.country}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {!address.is_default && (
                    <Button
                      variant="outline"
                      size="xs"
                      className="min-h-[40px] touch-manipulation"
                      onClick={() => setDefault(address.id)}
                    >
                      <Star className="size-3 sm:mr-1" />
                      Set default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="xs"
                    className="min-h-[40px] touch-manipulation"
                    onClick={() => openEdit(address)}
                  >
                    <Pencil className="size-3 sm:mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    className="min-h-[40px] touch-manipulation"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="size-3 sm:mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ),
          )}

          {!addressLoading && addresses.length === 0 && !showAddForm && (
            <div className="col-span-full rounded-lg border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
              <MapPin className="mx-auto size-5 text-zinc-300 dark:text-zinc-600" />
              <p className="mt-2 text-sm text-muted-foreground">No saved addresses yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <Button
          variant="outline"
          onClick={logout}
          className="h-12 w-full touch-manipulation sm:w-auto sm:px-10"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon?: typeof Phone;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {Icon && <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />}
        {label}
      </span>
      <span
        className={cn(
          "text-sm text-zinc-900 dark:text-zinc-50 sm:text-right",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function PrefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}

function AddressFormCard({
  form,
  saving,
  isValid,
  title,
  onField,
  onSave,
  onCancel,
}: {
  form: AddressFormData;
  saving: boolean;
  isValid: boolean;
  title: string;
  onField: <K extends keyof AddressFormData>(
    key: K,
    value: AddressFormData[K],
  ) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const inputCls =
    "w-full min-h-[44px] rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-500 sm:min-h-0";

  return (
    <div className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800 sm:p-5">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="grid gap-3">
        <input
          className={inputCls}
          placeholder="Label (e.g. Home, Office)"
          value={form.label}
          onChange={(e) => onField("label", e.target.value)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            placeholder="Full name *"
            value={form.full_name}
            onChange={(e) => onField("full_name", e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="Phone *"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => onField("phone", e.target.value)}
          />
        </div>
        <input
          className={inputCls}
          placeholder="Address line 1 *"
          value={form.line1}
          onChange={(e) => onField("line1", e.target.value)}
        />
        <input
          className={inputCls}
          placeholder="Address line 2"
          value={form.line2}
          onChange={(e) => onField("line2", e.target.value)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            placeholder="City *"
            value={form.city}
            onChange={(e) => onField("city", e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="State *"
            value={form.state}
            onChange={(e) => onField("state", e.target.value)}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            placeholder="Postal code *"
            inputMode="numeric"
            value={form.postal_code}
            onChange={(e) => onField("postal_code", e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="Country"
            value={form.country}
            onChange={(e) => onField("country", e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={form.is_default}
            onChange={(e) => onField("is_default", e.target.checked)}
            className="size-4 rounded border-zinc-300 accent-zinc-900"
          />
          Set as default address
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="default"
          size="sm"
          className="min-h-[44px] touch-manipulation sm:min-h-9"
          onClick={onSave}
          disabled={!isValid || saving}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="min-h-[44px] touch-manipulation sm:min-h-9"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
