# src/server/repositories/

**Reserved — currently empty.** One repository per aggregate (not per
table).

## Rules

- Every file starts with `import "server-only";`.
- One repository = one aggregate root (e.g. `userRepository.ts`,
  `wishlistRepository.ts`).
- Repositories own all Prisma access for their aggregate.
- Return DTOs (plain TS objects), not raw Prisma records.
- No business logic — that lives in `services/`.
- No HTTP concerns — that lives in route handlers.

## Shape

```ts
import "server-only";
import { getPrisma } from "@/server/db/prisma";
import type { User } from "@/server/services/user/types";   // feature-local DTO

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    const row = await getPrisma().user.findUnique({ where: { id } });
    return row ? toUser(row) : null;
  },
  // …
};
```

The `toUser` mapper lives next to the repository or in the owning
service module.
