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
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
  UserResponse,
} from "@/types";

export type AuthStateValue = {
  user: UserResponse | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
};

const AuthStateContext = createContext<AuthStateValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
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

  const login = useCallback(
    async (data: LoginRequest) => {
      const res = await authService.login(client, data);
      if (res.success && res.data) {
        setUser(res.data.user);
        router.push("/");
        router.refresh();
      }
    },
    [client, router],
  );

  const signup = useCallback(
    async (data: SignupRequest) => {
      const res = await authService.signup(client, data);
      if (res.success && res.data) {
        setUser(res.data.user);
        router.push("/");
        router.refresh();
      }
    },
    [client, router],
  );

  const logoutFn = useCallback(async () => {
    await authService.logout(client);
    setUser(null);
    router.push("/");
    router.refresh();
  }, [client, router]);

  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      await authService.forgotPassword(client, data);
    },
    [client],
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      await authService.resetPassword(client, data);
    },
    [client],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout: logoutFn,
      refreshUser,
      forgotPassword,
      resetPassword,
    }),
    [user, loading, login, signup, logoutFn, refreshUser, forgotPassword, resetPassword],
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
