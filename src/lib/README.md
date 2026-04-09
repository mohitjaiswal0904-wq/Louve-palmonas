# `src/lib/`

**Shared libraries** that are not React components — clients, env, localization bundles, and the shadcn **`cn`** helper.

## Subfolders

| Path | Role |
|------|------|
| **`client/`** | **`createSsrApiClient`** (server-only), **`createCsrApiClient`**, **`createApiClient`**. |
| **`config/`** | **`env.ts`** (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`), **`languages.ts`** (header dropdown). |
| **`l10n/`** | **`English`**, **`Hindi`**, **`French`**, **`Spanish`** message files; **`get-messages.ts`**, **`server.ts`**, **`build-page-metadata.ts`**. |
| **`live/`** | Scaffold for WebSocket/SSE realtime — **`export {}`** until implemented. |
| **`utils.ts`** | **`cn()`** for Tailwind class merging (re-export pattern for shadcn). |

## Import alias

Use **`@/lib/...`** from `tsconfig` paths.

Each subfolder includes a **`README.md`** where non-obvious.
