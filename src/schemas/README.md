# src/schemas/

**Reserved — currently empty.** Shared Zod schemas used across layers.

## What belongs here

- Shared request / query parameter schemas (`PaginationSchema`,
  `CursorSchema`, `UuidSchema`).
- Reusable identifier schemas (`SlugSchema`, `IsoDateSchema`).
- Common response envelope schemas.

## What does not belong here

- Feature-specific validation → the feature's `schemas/`.
- Database schema definitions — those live in `prisma/schema.prisma`.
- Server env schema — that lives in [`../lib/env/server.ts`](../lib/env/server.ts)
  because it imports `server-only`.

## Rules

- Client-safe. No `server-only`, no Prisma.
- Always export the inferred TypeScript type alongside:
  ```ts
  export const PaginationSchema = z.object({
    cursor: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(20),
  });
  export type Pagination = z.infer<typeof PaginationSchema>;
  ```
- Name schemas `<Thing>Schema`.
- Keep schemas small and composable; prefer composition
  (`z.object({...}).merge(PaginationSchema)`) over duplication.
