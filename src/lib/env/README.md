# src/lib/env/

Server-only environment configuration.

- `server.ts` — Zod schema + `getServerEnv()` + `requireDatabaseUrl()`.

## Rules

- Every file here imports `server-only`. Importing from a Client
  Component breaks the build.
- Add every new env var to **both** this schema **and** `.env.example`.
- Never log env values. `requireDatabaseUrl()` throws a message that
  does not include the value itself.
- Prefer `.optional()` + an explicit `requireXxx()` helper over
  marking fields required at module load — this keeps the Next.js build
  independent of runtime secrets.
