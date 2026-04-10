"use client";

import { useHealthState } from "@/state/health.state";

/** Health probe; state calls `health.service`. */
export function useHealth() {
  return useHealthState();
}
