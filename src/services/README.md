# `src/services/`

**Service layer** — orchestrates calls to the Louve API via **`src/lib/client`**. **No React**, no `"use client"`.

## Pattern

```ts
import type { ApiClient } from "@/lib/client";

export async function fetchSomething(client: ApiClient) {
  const res = await client.get("/path");
  // parse, map errors
}
```

Handlers accept **`ApiClient`** for testability (inject mock).

## Who calls services

- **`src/state/*.state.tsx`** — browser flows: one **`createCsrApiClient()`** per provider, methods delegate here.
- **Server Components / route handlers** — **`createSsrApiClient()`** when fetching on the server.

Client **pages and components** should use **`@/hooks`** (`useCatalog`, `useSearch`, …), not import this folder directly.

## Current modules

- **`auth.service.ts`**, **`catalog.service.ts`**, **`search.service.ts`**, **`health.service.ts`**

See **`docs/FLOW.md`** and **`src/state/README.md`**.
