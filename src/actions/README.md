# src/actions/

**Reserved — currently empty.** Shared Server Actions.

Server Actions are a server-only mutation primitive triggered from UI
code. They are **not** a replacement for every route handler — use
them when:

- The mutation is initiated from the application's own UI.
- There is no need for a public HTTP contract.
- Progressive enhancement (works without JS) is desirable.

Use route handlers under [`../app/api/v1/`](../app/api/v1/README.md)
when:

- The endpoint is called by a non-browser client.
- The contract must be versioned.
- You need fine-grained cache control or headers.

## Where actions live

- **Feature-specific** actions live in
  `src/features/<feature>/actions/<name>.ts`. Prefer this.
- **Shared** actions — used by chrome or by ≥ 2 features — live here.

## Rules

- Every file begins with `"use server"`.
- Validate every argument with Zod before use.
- Enforce authentication and authorisation inside the action or in a
  trusted service it calls. Being a Server Action does not make it
  privileged.
- Never return raw Prisma records containing sensitive fields.
- Keep the handler thin — delegate to a service in `src/server/services/`.

## Shape

```ts
"use server";

import { z } from "zod";
import { AppError } from "@/lib/errors/app-error";

const InputSchema = z.object({ id: z.string().uuid() });

export async function doThing(formData: FormData) {
  const input = InputSchema.parse(Object.fromEntries(formData));
  // call a service, which calls repositories…
}
```
