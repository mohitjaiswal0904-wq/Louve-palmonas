"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Star } from "lucide-react";

import { useAuth, useAddress } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type {
  AddressDTO,
  CreateAddressRequest,
  UpdateAddressRequest,
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
  const { user, logout, loading } = useAuth();
  const {
    addresses,
    loading: addressLoading,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  } = useAddress();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<AddressFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
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
    : user.email[0].toUpperCase();

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

  return (
    <div className="mx-auto max-w-2xl py-12">
      {/* Profile card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="items-center space-y-3 pb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {initials}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-medium tracking-tight">
              {user.profile?.display_name ?? "Louve member"}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Row label="Email" value={user.email} />
            <Row label="Verified" value={user.email_verified ? "Yes" : "No"} />
            <Row label="Status" value={user.status} />
            <Row
              label="Member since"
              value={new Date(user.created_at).toLocaleDateString()}
            />
            {user.profile?.phone && (
              <Row label="Phone" value={user.profile.phone} />
            )}
            {user.profile?.locale && (
              <Row label="Locale" value={user.profile.locale} />
            )}
            {user.profile?.time_zone && (
              <Row label="Time zone" value={user.profile.time_zone} />
            )}
          </div>
          <div className="pt-4">
            <Button variant="outline" onClick={logout} className="w-full">
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Addresses section */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-zinc-400" />
            <h2 className="text-base font-medium tracking-tight">
              My Addresses
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={openAdd}>
            <Plus className="size-3.5" data-icon="inline-start" />
            Add new
          </Button>
        </div>

        {addressLoading && addresses.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading addresses…
          </p>
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
                className="rounded-lg border border-zinc-100 p-5 dark:border-zinc-800"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
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
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {address.phone}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {address.line1}
                  {address.line2 && <>, {address.line2}</>}
                  <br />
                  {address.city}, {address.state} {address.postal_code}
                  <br />
                  {address.country}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {!address.is_default && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setDefault(address.id)}
                    >
                      <Star className="size-3" data-icon="inline-start" />
                      Set as default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => openEdit(address)}
                  >
                    <Pencil className="size-3" data-icon="inline-start" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="size-3" data-icon="inline-start" />
                    Delete
                  </Button>
                </div>
              </div>
            ),
          )}

          {!addressLoading && addresses.length === 0 && !showAddForm && (
            <div className="col-span-full rounded-lg border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
              <MapPin className="mx-auto size-5 text-zinc-300 dark:text-zinc-600" />
              <p className="mt-2 text-sm text-muted-foreground">
                No saved addresses yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Inline address form ──────────────────────────────────────────── */

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
    "w-full bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-500";

  return (
    <div className="rounded-lg border border-zinc-100 p-5 dark:border-zinc-800">
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
            className="size-3.5 rounded border-zinc-300 accent-zinc-900"
          />
          Set as default address
        </label>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          disabled={!isValid || saving}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

/* ── Row helper ───────────────────────────────────────────────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 pb-2 last:border-0 dark:border-zinc-800">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-zinc-900 dark:text-zinc-50">{value}</span>
    </div>
  );
}
