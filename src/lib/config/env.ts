/**
 * Non-translatable environment-backed configuration.
 * Copy and URLs stay here; all customer-facing strings live under `src/lib/l10n/`.
 */

export function getPublicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
}

/** Backend API base. Set `NEXT_PUBLIC_API_URL` in production (see `.env.example`). */
export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8080"
  );
}


export function getRazorpayKeyId(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
}