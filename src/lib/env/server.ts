import "server-only";
import { z } from "zod";

/**
 * Server-only environment schema.
 *
 * Never import this file from a Client Component. Values are validated once
 * at module load and cached. Missing or malformed variables throw with a
 * concise, non-sensitive message.
 */
const ServerEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  // Prisma / PostgreSQL connection string. Optional at build time so the
  // Next.js build does not require a live database; mandatory at runtime
  // whenever any Prisma call executes (`getPrisma()` enforces this).
  DATABASE_URL: z.string().url().optional(),
});

type ServerEnv = z.infer<typeof ServerEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = ServerEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid server environment: ${issues}`);
  }
  cached = parsed.data;
  return cached;
}

export function requireDatabaseUrl(): string {
  const env = getServerEnv();
  if (!env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and configure a PostgreSQL connection string.",
    );
  }
  return env.DATABASE_URL;
}
