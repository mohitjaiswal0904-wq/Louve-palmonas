"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { createCsrApiClient } from "@/lib/client";
import * as healthService from "@/services/health.service";
import type { ApiResponse } from "@/types";
import type { HealthLiveResponse } from "@/types/health";

export type HealthStateValue = {
  checkLive: () => Promise<ApiResponse<HealthLiveResponse>>;
};

const HealthStateContext = createContext<HealthStateValue | null>(null);

export function HealthProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createCsrApiClient(), []);

  const value = useMemo<HealthStateValue>(
    () => ({
      checkLive: () => healthService.healthCheckLive(client),
    }),
    [client],
  );

  return (
    <HealthStateContext.Provider value={value}>{children}</HealthStateContext.Provider>
  );
}

export function useHealthState(): HealthStateValue {
  const ctx = useContext(HealthStateContext);
  if (!ctx) {
    throw new Error("useHealthState must be used within <HealthProvider>");
  }
  return ctx;
}
