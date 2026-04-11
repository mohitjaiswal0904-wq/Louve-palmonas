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
import * as addressService from "@/services/address.service";
import { useAuthState } from "./auth.state";
import type {
  AddressDTO,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "@/types";

export type AddressStateValue = {
  addresses: AddressDTO[];
  defaultAddress: AddressDTO | null;
  loading: boolean;
  fetchAddresses: () => Promise<void>;
  createAddress: (data: CreateAddressRequest) => Promise<void>;
  updateAddress: (id: number, data: UpdateAddressRequest) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  setDefault: (id: number) => Promise<void>;
};

const AddressStateContext = createContext<AddressStateValue | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);
  const { user } = useAuthState();
  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<AddressDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    if (!user) {
      setAddresses([]);
      setDefaultAddress(null);
      return;
    }
    setLoading(true);
    try {
      const res = await addressService.listAddresses(client);
      if (res.success && res.data) {
        const list = res.data as AddressDTO[];
        setAddresses(list);
        setDefaultAddress(list.find((a) => a.is_default) ?? null);
      }
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  }, [client, user]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const createAddr = useCallback(
    async (data: CreateAddressRequest) => {
      await addressService.createAddress(client, data);
      await fetchAddresses();
    },
    [client, fetchAddresses],
  );

  const updateAddr = useCallback(
    async (id: number, data: UpdateAddressRequest) => {
      await addressService.updateAddress(client, id, data);
      await fetchAddresses();
    },
    [client, fetchAddresses],
  );

  const deleteAddr = useCallback(
    async (id: number) => {
      await addressService.deleteAddress(client, id);
      await fetchAddresses();
    },
    [client, fetchAddresses],
  );

  const setDefault = useCallback(
    async (id: number) => {
      await addressService.setDefaultAddress(client, id);
      await fetchAddresses();
    },
    [client, fetchAddresses],
  );

  const value = useMemo<AddressStateValue>(
    () => ({
      addresses,
      defaultAddress,
      loading,
      fetchAddresses,
      createAddress: createAddr,
      updateAddress: updateAddr,
      deleteAddress: deleteAddr,
      setDefault,
    }),
    [addresses, defaultAddress, loading, fetchAddresses, createAddr, updateAddr, deleteAddr, setDefault],
  );

  return (
    <AddressStateContext.Provider value={value}>{children}</AddressStateContext.Provider>
  );
}

export function useAddressState(): AddressStateValue {
  const ctx = useContext(AddressStateContext);
  if (!ctx) throw new Error("useAddressState must be used within <AddressProvider>");
  return ctx;
}
