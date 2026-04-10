"use client";

import { useAuthState } from "@/state/auth.state";

/** Auth session and actions; state calls `auth.service` via CSR client. */
export function useAuth() {
  return useAuthState();
}
