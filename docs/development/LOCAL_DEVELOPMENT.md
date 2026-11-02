# Local Development

## Prerequisites

- **Node.js** ≥ 20 (tested on 24.x).
- **npm** ≥ 10 (tested on 11.x).
- **PostgreSQL** ≥ 14 (optional for most work; required for
  `/api/v1/db/health` and anything that calls `getPrisma()`).
- macOS, Linux, or WSL. Native Windows is untested.

## Install

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is required until pinned React 19.2.x / TypeScript
6.x peer ranges are tidied.

## Environment

```bash
cp .env.example .env
```

Variables:

| Name | Required | Where read | Notes |
|---|---|---|---|
| `NODE_ENV` | auto | Next.js | Set to `development` by `next dev`. |
| `DATABASE_URL` | optional at build time, required at runtime for Prisma | [`src/lib/env/server.ts`](../../src/lib/env/server.ts) | PostgreSQL URL. |

Any new env var must be added to:

1. `.env.example`
2. the Zod schema in `src/lib/env/server.ts`
3. this table

## Database

Only needed when you touch `getPrisma()` or run migrations.

```bash
npm run prisma:generate          # generate Prisma Client
npm run prisma:migrate -- --name <descriptive>   # create & apply dev migration
npm run db:validate              # validate schema
npm run prisma:studio            # browse data
```

Production uses `npm run prisma:deploy`. See
[`../database/DATABASE_GUIDELINES.md`](../database/DATABASE_GUIDELINES.md).

## Run the app

```bash
npm run dev          # http://localhost:3000
```

Verify:

```bash
curl http://localhost:3000/api/v1/health
curl -i http://localhost:3000/api/v1/db/health   # 200 with DB, 503 without
```

## Build / start

```bash
npm run build        # next build
npm run start        # next start
```

## Lint / typecheck

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run lint:oxlint  # legacy oxlint
```

## Test

Not wired yet. See [`../testing/TESTING_STRATEGY.md`](../testing/TESTING_STRATEGY.md).

## Common errors

| Error | Cause | Fix |
|---|---|---|
| `DATABASE_URL is not set` on `/api/v1/db/health` | No `.env` populated | `cp .env.example .env`, set `DATABASE_URL`, restart `next dev`. |
| `Prisma Client did not initialize` | `prisma generate` not run | `npm run prisma:generate`. |
| `npm install` peer-dep conflicts | React 19 / TS 6 peer ranges | Re-run with `--legacy-peer-deps`. |
| `EACCES` under `~/.npm/_cacache` | Mixed root/user ownership of npm cache | `npm install ... --cache /tmp/npm-cache` or `sudo chown -R $(whoami) ~/.npm`. |
| `window is not defined` during build | Reading `window` at module scope | Move inside a `useEffect` or guard with `typeof window !== "undefined"`. |

## Troubleshooting

- Clear Next.js cache: `rm -rf .next` then rebuild.
- Clear Prisma cache: `rm -rf node_modules/.prisma && npm run prisma:generate`.
- Verify the port: `lsof -i :3000`.
- Logs: `npm run dev` prints request lines; failures include the stack
  in development only.
