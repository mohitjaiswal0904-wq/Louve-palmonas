import type { ApiClient } from "@/lib/client";
import type { ApiResponse } from "@/types";
import type { BackendHealthData, HealthLiveResponse } from "@/types/health";

export async function healthCheckLive(
  client: ApiClient,
): Promise<ApiResponse<HealthLiveResponse>> {
  return client.get("/api/v1/health/live");
}

export type HealthFetchResult =
  | { kind: "ok"; httpStatus: number; data: BackendHealthData }
  | { kind: "down"; httpStatus: number; data: BackendHealthData; message?: string }
  | { kind: "error"; message: string; httpStatus?: number };

/**
 * Full backend health. On HTTP 503 the API still returns component payload under `error.details.health`.
 */
export async function fetchBackendHealth(client: ApiClient): Promise<HealthFetchResult> {
  try {
    const res = await client.get<ApiResponse<BackendHealthData>>("/api/v1/health");
    if (res.success && res.data) {
      return { kind: "ok", httpStatus: 200, data: res.data };
    }
    return { kind: "error", message: res.error?.message ?? "Unexpected health response" };
  } catch (e: unknown) {
    const err = e as {
      message?: string;
      status?: number;
      details?: { health?: BackendHealthData };
    };
    if (err.details?.health) {
      return {
        kind: "down",
        httpStatus: err.status ?? 503,
        data: err.details.health,
        message: err.message,
      };
    }
    return {
      kind: "error",
      message: err.message ?? "Failed to load backend health",
      httpStatus: err.status,
    };
  }
}
