import type { ApiClient } from "@/lib/client";

/**
 * Example service: calls the backend using an SSR or CSR client from the client layer.
 */
export async function fetchHealthLiveJson(client: ApiClient): Promise<unknown> {
  const res = await client.get("/health/live");
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json();
}
