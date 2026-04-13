/** Query key on `/auth/login` — after sign-in we send the user back here (same-origin paths only). */
export const RETURN_URL_QUERY_KEY = "returnUrl";

const AUTH_PREFIXES = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"];

/**
 * Allows only same-origin relative paths to prevent open redirects.
 * Rejects protocol-relative URLs, `://`, and auth entry routes (avoid loops).
 */
export function sanitizeReturnPath(input: string | null | undefined): string | undefined {
  if (input == null || typeof input !== "string") return undefined;
  const trimmed = input.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return undefined;
  if (trimmed.includes("://")) return undefined;
  const lower = trimmed.split("?")[0]?.toLowerCase() ?? "";
  if (AUTH_PREFIXES.some((p) => lower === p || lower.startsWith(`${p}/`))) return undefined;
  return trimmed.length > 2048 ? trimmed.slice(0, 2048) : trimmed;
}

export function buildLoginHref(returnPath?: string): string {
  const safe = sanitizeReturnPath(returnPath);
  if (!safe) return "/auth/login";
  return `/auth/login?${RETURN_URL_QUERY_KEY}=${encodeURIComponent(safe)}`;
}

/** Current browser location path + query (client-only). */
export function getCurrentLocationPath(): string {
  if (typeof window === "undefined") return "/";
  const { pathname, search } = window.location;
  return `${pathname}${search}`;
}

/** Reads `returnUrl` from the login page URL (client). */
export function peekReturnUrlFromWindow(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = new URLSearchParams(window.location.search).get(RETURN_URL_QUERY_KEY);
  return sanitizeReturnPath(raw);
}
