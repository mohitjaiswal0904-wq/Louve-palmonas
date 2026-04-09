# `src/services/`

**Service layer** — orchestrates calls to Louve backend via **`src/lib/client`**. **No React**, no `"use client"`.

## Pattern

```ts
import type { ApiClient } from "@/lib/client";

export async function fetchSomething(client: ApiClient) {
  const res = await client.get("/path");
  // parse, map errors
}
```

Handlers accept **`ApiClient`** for testability (inject mock).

## Current

- **`health.service.ts`** — example **`fetchHealthLiveJson`**.

## When adding APIs

1. Extend **`createApiClient`** only if every call needs new headers.
2. Add functions here; call from **Server Components** (`createSsrApiClient`) or **client hooks** (`createCsrApiClient`).

See **`docs/FLOW.md`**.
