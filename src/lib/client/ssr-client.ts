import "server-only";

import { cookies } from "next/headers";

import { getServerApiBaseUrl } from "@/lib/config/env";
import { createApiClient } from "./create-api-client";

/**
 * Server-only client that talks directly to the Go backend,
 * forwarding the access token from the HTTP-only cookie.
 */
export async function createSsrApiClient() {
  const store = await cookies();
  const accessToken = store.get("louve_access_token")?.value;

  return createApiClient({
    baseUrl: getServerApiBaseUrl(),
    fetchImpl: (input, init) =>
      fetch(input, {
        ...init,
        cache: "no-store",
      }),
    defaultHeaders: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
}
