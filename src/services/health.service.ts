import type { ApiClient } from "@/lib/client";

/**
 * Example service: calls the backend health endpoint.
 */
export async function healthCheck(client: ApiClient): Promise<unknown> {
  return client.get("/health/live");
}
