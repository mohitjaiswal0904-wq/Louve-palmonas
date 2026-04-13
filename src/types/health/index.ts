/** Louve API `GET /api/v1/health/live` */
export type HealthLiveResponse = {
  status: string;
  timestamp: string;
};

/** Root filesystem usage (optional; Unix backends only). */
export type HealthDiskInfo = {
  path: string;
  totalBytes: number;
  freeBytes: number;
  usedBytes: number;
  usedPercent: number;
};

export type HealthSystemInfo = {
  hostname: string;
  goVersion: string;
  os: string;
  arch: string;
  numCpu: number;
  goroutines: number;
  memoryAlloc: string;
  memoryTotal: string;
  memorySys: string;
  memoryAllocBytes?: number;
  memoryTotalAllocBytes?: number;
  memorySysBytes?: number;
  gcCycles: number;
  disk?: HealthDiskInfo | null;
};

export type HealthComponentStatus = "up" | "down" | "degraded";

export type HealthComponentHealth = {
  status: HealthComponentStatus;
  latency?: string;
  details?: Record<string, unknown>;
  error?: string;
};

/** Payload inside `ApiResponse.data` for full health. */
export type BackendHealthData = {
  status: HealthComponentStatus;
  timestamp: string;
  uptime: string;
  version: string;
  env: string;
  components: Record<string, HealthComponentHealth>;
  system: HealthSystemInfo;
};

/** Next.js app route `GET /api/health`. */
export type FrontendHealthData = {
  status: string;
  timestamp: string;
  node?: string;
  environment?: string;
};

/** @deprecated use HealthLiveResponse */
export type HealthLiveResult = unknown;
