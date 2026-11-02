# src/services/

**Reserved — currently empty.** Browser-safe service abstractions.

## When to put a file here

- A **browser-safe** HTTP client that calls `/api/v1/...` (e.g.
  `wishlistClient.ts`).
- A thin wrapper around an **external, client-facing** SDK (analytics,
  feature flags consumed in the browser).
- Shared orchestration that is legitimately client-side and used by
  multiple features.

## When **not** to put a file here

- Server-side business logic → [`../server/services/`](../server/services/README.md).
- Prisma access → [`../server/repositories/`](../server/repositories/README.md).
- Feature-only client code → the feature's own `services/`.
- Any wrapper that would simply duplicate an existing server service.

## Rules

- No `server-only` imports, no `@prisma/client`, no `src/lib/env/server`.
- Validate upstream responses before using them (Zod).
- Prefer `fetch` + typed Zod responses over ad-hoc any-typed bodies.
- Each service is a focused module; no `managers/` or `factories/`
  catchalls.

## Shape

```ts
// example (not yet implemented)
export async function fetchHealth(): Promise<{ status: "ok" }> {
  const res = await fetch("/api/v1/health", { cache: "no-store" });
  if (!res.ok) throw new Error(`health ${res.status}`);
  const json = HealthResponseSchema.parse(await res.json());
  return json.data;
}
```
