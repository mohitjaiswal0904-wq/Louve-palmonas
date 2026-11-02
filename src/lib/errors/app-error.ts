/**
 * Shared, framework-agnostic error model.
 *
 * API route handlers should throw (or return) these errors; the shared
 * HTTP responder (`src/lib/http/response.ts`) maps them to safe JSON
 * responses with appropriate status codes. Never embed stack traces,
 * SQL, or environment details in the `message`.
 */

export type AppErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

const STATUS_FOR_CODE: Record<AppErrorCode, number> = {
  BAD_REQUEST: 400,
  VALIDATION_ERROR: 422,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  SERVICE_UNAVAILABLE: 503,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: number;
  readonly details: unknown;

  constructor(code: AppErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = STATUS_FOR_CODE[code];
    this.details = details ?? null;
  }
}
