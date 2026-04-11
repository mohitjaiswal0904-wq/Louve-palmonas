"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { createCsrApiClient } from "@/lib/client";
import * as authService from "@/services/auth.service";
import type {
  SendOTPRequest,
  VerifyOTPRequest,
  UpdateProfileRequest,
  UserResponse,
} from "@/types";

export type AuthStateValue = {
  user: UserResponse | null;
  loading: boolean;
  isNewUser: boolean;
  sendOTP: (data: SendOTPRequest) => Promise<void>;
  verifyOTP: (data: VerifyOTPRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  clearNewUser: () => void;
};

const AuthStateContext = createContext<AuthStateValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();
  const client = useMemo(() => createCsrApiClient(), []);
  const didInit = useRef(false);

  const refreshUser = useCallback(async () => {
    try {
      const res = await authService.getMe(client);
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, [client]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    let cancelled = false;
    authService.getMe(client).then((res) => {
      if (cancelled) return;
      setUser(res.success && res.data ? res.data : null);
    }).catch(() => {
      if (!cancelled) setUser(null);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [client]);

  const sendOTP = useCallback(
    async (data: SendOTPRequest) => {
      await authService.sendOTP(client, data);
    },
    [client],
  );

  const verifyOTP = useCallback(
    async (data: VerifyOTPRequest) => {
      const res = await authService.verifyOTP(client, data);
      if (res.success && res.data) {
        setUser(res.data.user);
        if (res.data.is_new_user) {
          setIsNewUser(true);
        } else {
          router.push("/");
          router.refresh();
        }
      }
    },
    [client, router],
  );

  const logoutFn = useCallback(async () => {
    await authService.logout(client);
    setUser(null);
    setIsNewUser(false);
    router.push("/");
    router.refresh();
  }, [client, router]);

  const updateProfileFn = useCallback(
    async (data: UpdateProfileRequest) => {
      const res = await authService.updateProfile(client, data);
      if (res.success && res.data) {
        setUser(res.data);
      }
      setIsNewUser(false);
      router.push("/");
      router.refresh();
    },
    [client, router],
  );

  const clearNewUser = useCallback(() => {
    setIsNewUser(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isNewUser,
      sendOTP,
      verifyOTP,
      logout: logoutFn,
      refreshUser,
      updateProfile: updateProfileFn,
      clearNewUser,
    }),
    [user, loading, isNewUser, sendOTP, verifyOTP, logoutFn, refreshUser, updateProfileFn, clearNewUser],
  );

  return (
    <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>
  );
}

export function useAuthState(): AuthStateValue {
  const ctx = useContext(AuthStateContext);
  if (!ctx) throw new Error("useAuthState must be used inside <AuthProvider>");
  return ctx;
}
