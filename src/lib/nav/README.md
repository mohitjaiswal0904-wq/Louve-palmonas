# src/lib/nav/

Client navigation helpers.

- `useAppNav.ts` — a thin shim over `next/navigation` exposing the
  callback shape the legacy `<Header />` already expects
  (`goHome`, `goCollection`, `goPdp(id?)`, `goStores`, `goStore(id)`,
  `goAccount`).

## Rules

- Client-only (`"use client"`).
- No server-only imports.
- Prefer `useRouter()` / `<Link />` directly for new code; keep this
  shim for chrome that pre-dates the Next.js migration.
