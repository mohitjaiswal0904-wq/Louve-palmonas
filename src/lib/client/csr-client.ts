"use client";

import { getApiBaseUrl } from "@/lib/config/env";
import { createApiClient } from "./create-api-client";

/**
 * Browser-only API client (e.g. called from hooks after user interaction).
 * Sends cookies if the API is same-site; extend with auth headers when you add auth.
 */
export function createCsrApiClient() {
  return createApiClient({
    baseUrl: getApiBaseUrl(),
    fetchImpl: (input, init) =>
      fetch(input, {
        ...init,
        credentials: "include",
      }),
  });
}
