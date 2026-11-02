import "server-only";
import { PrismaClient } from "@prisma/client";

import { getServerEnv, requireDatabaseUrl } from "@/lib/env/server";

/**
 * Prisma client singleton.
 *
 * - Server-only; the `server-only` import above hard-fails any accidental
 *   client bundle inclusion.
 * - Reuses a single instance across Next.js dev hot reloads by stashing it
 *   on `globalThis`.
 * - Lazy — the client is instantiated only on first call to `getPrisma()`,
 *   so the Next.js build does not require a running database.
 */
type GlobalWithPrisma = typeof globalThis & { __louvePrisma?: PrismaClient };

const globalForPrisma = globalThis as GlobalWithPrisma;

export function getPrisma(): PrismaClient {
  if (globalForPrisma.__louvePrisma) return globalForPrisma.__louvePrisma;

  // Validate DATABASE_URL at first use rather than at import time.
  requireDatabaseUrl();
  const env = getServerEnv();

  const client = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  if (env.NODE_ENV !== "production") {
    globalForPrisma.__louvePrisma = client;
  }

  return client;
}

/**
 * Lightweight database readiness probe. Executes a trivial `SELECT 1`.
 * Returns `{ ok: true }` on success; never throws.
 */
export async function checkDatabaseConnection(): Promise<
  { ok: true } | { ok: false; reason: string }
> {
  try {
    const prisma = getPrisma();
    await prisma.$queryRawUnsafe("SELECT 1");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "unknown error",
    };
  }
}
