"use client";

import { useAuthContext } from "@/state/auth-context";

/**
 * Thin facade over the auth context.
 * Components should use this hook for all auth needs.
 */
export function useAuth() {
  return useAuthContext();
}
