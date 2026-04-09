import "server-only";

import { getApiBaseUrl } from "@/lib/config/env";
import { createApiClient } from "./create-api-client";

/**
 * Server Components, Route Handlers, and Server Actions should use this client
 * so all backend calls stay on the server.
 */
export function createSsrApiClient() {
  return createApiClient({
    baseUrl: getApiBaseUrl(),
    fetchImpl: (input, init) =>
      fetch(input, {
        ...init,
        cache: "no-store",
      }),
  });
}
