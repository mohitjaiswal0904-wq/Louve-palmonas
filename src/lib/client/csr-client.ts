"use client";

import { createApiClient } from "./create-api-client";

/**
 * Browser-only API client that talks to Next.js API routes (BFF layer).
 * Auth tokens live in HTTP-only cookies, so credentials: "include" sends them automatically.
 */
export function createCsrApiClient() {
  return createApiClient({
    baseUrl: "",
    fetchImpl: (input, init) =>
      fetch(input, {
        ...init,
        credentials: "include",
      }),
  });
}
