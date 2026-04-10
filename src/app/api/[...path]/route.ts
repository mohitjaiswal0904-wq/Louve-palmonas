import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { getApiBaseUrl } from "@/lib/config/env";
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/lib/config/auth";
import type { ApiResponse, AuthResponse } from "@/types";

const AUTH_TOKEN_PATHS = new Set([
  "/api/v1/auth/login",
  "/api/v1/auth/signup",
  "/api/v1/auth/refresh",
]);

const LOGOUT_PATHS = new Set([
  "/api/v1/auth/logout",
  "/api/v1/auth/logout-all",
]);

const isSecure = process.env.NODE_ENV === "production";

function upstreamUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "UPSTREAM_UNAVAILABLE",
        message:
          "Could not reach the Louve API. Start the backend (e.g. make run-api) or set NEXT_PUBLIC_API_URL.",
      },
      timestamp: new Date().toISOString(),
    },
    { status: 503, headers: { "Content-Type": "application/json" } },
  );
}

async function fetchBackend(url: string, init: RequestInit): Promise<Response | null> {
  try {
    return await fetch(url, { ...init, cache: "no-store" });
  } catch {
    return null;
  }
}

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const backendPath = `/api/${path.join("/")}`;
  // Forward ?query=params — required for catalog filters, search `q`, pagination, etc.
  const search = req.nextUrl.search;
  const backendUrl = `${getApiBaseUrl()}${backendPath}${search}`;
  const store = await cookies();
  const accessToken = store.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = store.get(REFRESH_TOKEN_COOKIE)?.value;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const contentType = req.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const forwardedFor = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

  const body = req.method !== "GET" && req.method !== "HEAD"
    ? await req.text()
    : undefined;

  let res = await fetchBackend(backendUrl, {
    method: req.method,
    headers,
    body,
  });
  if (!res) {
    return upstreamUnavailableResponse();
  }

  if (res.status === 401 && refreshToken && !backendPath.includes("/auth/refresh")) {
    const refreshRes = await fetchBackend(`${getApiBaseUrl()}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshRes) {
      return upstreamUnavailableResponse();
    }

    if (refreshRes.ok) {
      const refreshJson: ApiResponse<AuthResponse> = await refreshRes.json();
      if (refreshJson.success && refreshJson.data) {
        store.set(ACCESS_TOKEN_COOKIE, refreshJson.data.access_token, {
          httpOnly: true, secure: isSecure, sameSite: "lax", path: "/", maxAge: ACCESS_TOKEN_MAX_AGE,
        });
        store.set(REFRESH_TOKEN_COOKIE, refreshJson.data.refresh_token, {
          httpOnly: true, secure: isSecure, sameSite: "lax", path: "/", maxAge: REFRESH_TOKEN_MAX_AGE,
        });

        headers["Authorization"] = `Bearer ${refreshJson.data.access_token}`;
        const retry = await fetchBackend(backendUrl, { method: req.method, headers, body });
        if (!retry) {
          return upstreamUnavailableResponse();
        }
        res = retry;
      }
    } else {
      store.delete(ACCESS_TOKEN_COOKIE);
      store.delete(REFRESH_TOKEN_COOKIE);
    }
  }

  const text = await res.text();

  if (AUTH_TOKEN_PATHS.has(backendPath) && res.ok) {
    const json: ApiResponse<AuthResponse> = JSON.parse(text);
    if (json.success && json.data) {
      store.set(ACCESS_TOKEN_COOKIE, json.data.access_token, {
        httpOnly: true, secure: isSecure, sameSite: "lax", path: "/", maxAge: ACCESS_TOKEN_MAX_AGE,
      });
      store.set(REFRESH_TOKEN_COOKIE, json.data.refresh_token, {
        httpOnly: true, secure: isSecure, sameSite: "lax", path: "/", maxAge: REFRESH_TOKEN_MAX_AGE,
      });

      const safeData = { ...json.data, access_token: undefined, refresh_token: undefined };
      return NextResponse.json(
        { success: true, data: safeData, message: json.message, timestamp: json.timestamp },
        { status: res.status },
      );
    }
  }

  if (LOGOUT_PATHS.has(backendPath)) {
    store.delete(ACCESS_TOKEN_COOKIE);
    store.delete(REFRESH_TOKEN_COOKIE);
  }

  return new NextResponse(text || null, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
