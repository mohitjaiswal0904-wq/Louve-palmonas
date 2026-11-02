# src/server/services/

**Reserved — currently empty.** Server-side application / domain
services.

## Rules

- Every file starts with `import "server-only";`.
- A service owns business operations for a bounded context (e.g.
  `wishlist/service.ts`).
- Composes one or more repositories.
- Enforces invariants (authorisation, state transitions, uniqueness).
- Returns DTOs; never leaks Prisma types.
- Throws `AppError` for expected failures.

## Shape

```ts
import "server-only";
import { AppError } from "@/lib/errors/app-error";
import { userRepository } from "@/server/repositories/user";

export const userService = {
  async get(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError("NOT_FOUND", "User not found.");
    return user;
  },
};
```

## When to use

- Route handler needs to orchestrate ≥ 2 repository calls, or must
  enforce an invariant, or must stay testable in isolation.

A trivial endpoint can call a repository directly — do not create a
service that only forwards its single argument.
