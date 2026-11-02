import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError, type AppErrorCode } from "@/lib/errors/app-error";

/**
 * Standard envelope used by Louve's own JSON APIs (`/api/v1/*`).
 * External/upstream responses are forwarded verbatim and MUST NOT be
 * re-wrapped in this shape.
 */
export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta: Record<string, unknown> | null;
};

export type ApiError = {
  success: false;
  error: {
    code: AppErrorCode;
    message: string;
    details: unknown;
  };
};

export function ok<T>(
  data: T,
  init?: { status?: number; meta?: Record<string, unknown> | null },
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json<ApiSuccess<T>>(
    { success: true, data, meta: init?.meta ?? null },
    { status: init?.status ?? 200 },
  );
}

export function fail(
  code: AppErrorCode,
  message: string,
  init?: { status?: number; details?: unknown },
): NextResponse<ApiError> {
  const status = init?.status ?? new AppError(code, message).status;
  return NextResponse.json<ApiError>(
    {
      success: false,
      error: { code, message, details: init?.details ?? null },
    },
    { status },
  );
}

/**
 * Normalises any error raised inside a route handler into the standard
 * error envelope. Hides internal messages for truly unexpected errors.
 */
export function toErrorResponse(error: unknown): NextResponse<ApiError> {
  if (error instanceof AppError) {
    return fail(error.code, error.message, {
      status: error.status,
      details: error.details,
    });
  }
  if (error instanceof ZodError) {
    return fail("VALIDATION_ERROR", "The request contains invalid data.", {
      details: error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }
  // Unknown error — never leak internals.
  if (process.env.NODE_ENV !== "production") {
     
    console.error("[api] unhandled error:", error);
  }
  return fail("INTERNAL_ERROR", "An unexpected error occurred.");
}
