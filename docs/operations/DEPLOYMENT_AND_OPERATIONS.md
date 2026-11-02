# Deployment & Operations

> **Status:** No deployment provider is configured. The contract below
> is what any host must satisfy. When a provider is chosen, document
> the specifics here.

## Build / runtime requirements

- Build: `npm ci --legacy-peer-deps && npm run prisma:generate && npm run build`.
- Runtime: `npm run start` (Next.js production server, Node ≥ 20).
- Container image size target: < 500 MB stripped.
- Memory floor: 512 MB; comfortable at 1 GB.

The application is **not** a static export. It requires a Node runtime
to serve route handlers (`/api/v1/*`) and to prerender/stream dynamic
segments.

## Environment variables

Required at runtime:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes (if anything calls Prisma) | PostgreSQL connection string. |
| `NODE_ENV` | yes | `production`. |

The `.env.example` file is the source of truth for the list.

## Database deployment

- Managed PostgreSQL recommended (RDS, Supabase, Neon, Fly Postgres,
  etc.) — any 14+ instance works.
- Create a dedicated application role with the least privileges
  required.
- Store the connection string in the host's secret manager, never in
  the repository.
- Enable automated backups before applying any migration.

## Migration procedure

```
1. Verify backup is current.
2. Build & test the new application version.
3. Run: npm run prisma:deploy
4. Switch the application to the new build.
5. Verify /api/v1/db/health returns 200.
```

Never run `prisma migrate dev` or `prisma db push` in production.

For breaking schema changes, use additive-then-removal rollout — see
[`../database/DATABASE_GUIDELINES.md`](../database/DATABASE_GUIDELINES.md).

## Health checks

- Liveness: `GET /api/v1/health` → `200`.
- Readiness: `GET /api/v1/db/health` → `200` when DB is reachable, `503`
  otherwise.

Configure the load balancer liveness probe against `/api/v1/health` and
readiness against `/api/v1/db/health`.

## Logging & monitoring

- Not wired. Application logs today go to stdout via `console.error`
  (dev only). Production hosts should capture stdout and ship it to a
  log pipeline.
- Choose and document an observability provider (Datadog, Grafana,
  Sentry, …) before launching anything public.

## Rollback

- Keep the previous image for immediate rollback.
- Database migrations should be forward-compatible — the previous
  release must still work against the newly migrated schema.
- If a migration is destructive, do not deploy without a tested
  rollback procedure.

## Troubleshooting

| Symptom | Likely cause | Where to look |
|---|---|---|
| `/api/v1/db/health` returns 503 in production | `DATABASE_URL` missing, invalid, or network blocked | Env config, VPC/security group |
| Build fails with `window is not defined` | New code reads `window` at module scope | Convert to effect/guard |
| Hydration mismatch warnings | Server-rendered output differs from client | Avoid `Date.now()` / `Math.random()` / `typeof window` branches in render |
| Prisma client not initialised | Missing `prisma generate` in build pipeline | Add `npm run prisma:generate` before `npm run build` |

## Not configured

- CI pipeline.
- Observability.
- Image registry.
- CDN in front of Next.js.
- Secret manager integration.
- Backup / restore drills.

Each of the above is a planned task. Do not describe them as live until
they actually are.
