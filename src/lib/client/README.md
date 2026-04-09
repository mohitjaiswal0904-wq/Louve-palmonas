# API clients

- **`createSsrApiClient()`** — import only from Server Components, Route Handlers, or Server Actions (`server-only`).
- **`createCsrApiClient()`** — use from `"use client"` modules (e.g. hooks that run after user gestures).

Base URL comes from **`NEXT_PUBLIC_API_URL`**, with the same default as `src/lib/config/env.ts`.

Services in `src/services` should accept an **`ApiClient`** rather than constructing their own `fetch` calls ad hoc.
