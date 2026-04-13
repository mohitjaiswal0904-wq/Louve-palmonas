/**
 * Non-translatable environment-backed configuration.
 * Copy and URLs stay here; all customer-facing strings live under `src/lib/l10n/`.
 */

export function getPublicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
}

/**
 * Public/backend base URL (from `NEXT_PUBLIC_API_URL`).
 * Used where the value is baked at build time; defaults for local dev.
 */
export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "https://api-louve.palmonas.tech"
  );
}

/**
 * Base URL for **server-side** calls to the Go API (BFF `/app/api/*` proxy, SSR client).
 * Set `INTERNAL_API_URL` at **runtime** (e.g. Docker) when the API is not reachable at
 * `NEXT_PUBLIC_API_URL` from inside the Next container — common cases:
 * - `NEXT_PUBLIC_API_URL` was `http://localhost:8080` at build time (wrong inside Docker).
 * - Public API hostname is not reachable from the container (DNS / firewall / hairpin).
 *
 * Example: `INTERNAL_API_URL=http://172.26.9.251:8080` or `http://louve-api:8080` on a shared network.
 */
export function getServerApiBaseUrl(): string {
  const internal = process.env.INTERNAL_API_URL?.trim().replace(/\/$/, "");
  if (internal) return internal;
  return getApiBaseUrl();
}


export function getRazorpayKeyId(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
}

/** Mapbox GL token for admin session geography map (public token, URL-restricted in Mapbox). */
export function getMapboxAccessToken(): string {
  return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() ?? "";
}