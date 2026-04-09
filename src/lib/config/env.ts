/**
 * Non-translatable environment-backed configuration.
 * Copy and URLs stay here; all customer-facing strings live under `src/lib/l10n/`.
 */

export function getPublicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
}

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8080"
  );
}
