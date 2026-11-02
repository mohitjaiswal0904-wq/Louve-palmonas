# Rendering Strategy

## Defaults

- **Server Components by default.** `src/app/**/page.tsx` and
  `src/app/layout.tsx` are Server Components.
- **Client boundaries live in `*View.tsx`** under `src/views/<name>/`
  and in `src/components/layout/AppShell.tsx`.
- **Prerender when possible.** Each route's `page.tsx` is static unless
  it accepts a dynamic segment that must be read at request time.

## Per-route rendering today

```
○ /                     prerendered
○ /collection           prerendered
○ /pdp                  prerendered (fallback, no id)
ƒ /pdp/[productId]      dynamic (segment)
○ /stores               prerendered
ƒ /stores/[storeId]     dynamic (segment)
○ /account              prerendered
ƒ /api/v1/health        dynamic (never cached)
ƒ /api/v1/db/health     dynamic (never cached)
```

If you add a new route, pick the strategy explicitly:

- **Static (`○`)** — content independent of the request. Keep the page
  as a Server Component with no `dynamic` export.
- **Dynamic (`ƒ`)** — depends on request (headers, cookies, dynamic
  segments, uncached fetches). Either rely on an inherently dynamic
  input (segment / cookies) or add `export const dynamic = "force-dynamic"`.
- **ISR** — `export const revalidate = <seconds>`. Only when a specific
  cache horizon is understood and acceptable.

## Caching

- Route handlers that depend on live state use
  `export const dynamic = "force-dynamic"` (see
  `src/app/api/v1/*/route.ts`).
- Do **not** disable caching globally. Decide per route.
- Use `fetch(..., { next: { revalidate } })` or `{ cache: "no-store" }`
  intentionally; the default `cache: "force-cache"` is fine for truly
  static upstreams.

## Client components (`"use client"`)

Add `"use client"` only when the component actually uses any of:

- `useState`, `useEffect`, `useReducer`, `useRef`
- Event handlers (`onClick`, …)
- Browser APIs (`window`, `document`, `localStorage`, `navigator`,
  `IntersectionObserver`, canvas, R3F / three.js)
- Context consumption of a client-defined context

**Push the boundary down.** Prefer having a Server Component page that
mounts a small `<View />` client component, rather than marking the
whole tree client-side.

## Browser-only code & SSR safety

- Any code that reads `window` must be inside a client component and
  usually inside `useEffect` or a `typeof window !== "undefined"`
  guard. See the pattern in
  [`src/views/store/StoreView.tsx`](../../src/views/store/StoreView.tsx).
- three.js / `@react-three/fiber` must be loaded via `lazy()` inside a
  client component (`src/views/store/StoreView.tsx`).
- Never read `document` or `localStorage` at module scope. Wrap in a
  function and call it from an effect.

## Hydration mismatches

Avoid:

- Server-rendering values derived from `Date.now()` or `Math.random()`.
- Branching on `typeof window` to produce different JSX on the server
  vs. the client.
- Using localStorage-derived state during the initial render pass.

For local-only state (session, wishlist), the pattern is:

```tsx
const [value, setValue] = useState<Snapshot>(() => defaultSnapshot());
useEffect(() => { setValue(readFromStorage()); }, []);
```

Server renders the default; client hydrates the real value in an effect.

## Loading & error boundaries

- Route-level fallback: `src/app/loading.tsx`.
- Route-level error boundary: `src/app/error.tsx` (client component).
- Not found: `src/app/not-found.tsx`.

Introduce segment-level `loading.tsx` or `error.tsx` only when a
specific view needs a different experience; do not add them by default.

## Metadata

Each page exports `metadata` or `generateMetadata` from its Server
Component. Keep titles consistent (`"<Thing> — LOUVE"`).

## Changing this strategy

Any new rendering pattern (ISR, streaming, PPR, parallel routes,
intercepting routes) must be documented here before being adopted
across the codebase.
