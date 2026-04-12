# Deployment

## AWS Amplify

This repo ships an `amplify.yaml` configured for pnpm.

If Amplify uses an older Node runtime, set the build image/runtime in Amplify settings.

In the Amplify console, add **environment variables** for the build (same names as `.env.example`):

- `NEXT_PUBLIC_SITE_URL` — `https://louve.palmonas.tech`
- `NEXT_PUBLIC_API_URL` — `https://api-louve.palmonas.tech`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — your live key

They are inlined at **`pnpm build`** time.

## Docker

From **louve-frontend** repo root (Compose project dir = `.`):

```bash
make up        # build & start (image louve-frontend:local)
make down
make rebuild   # down, then up with rebuild
```

Optional host port: `FRONTEND_PUBLISH_PORT=3001 make up`.

**Build-time URLs:** place `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`, and optionally `NEXT_PUBLIC_RAZORPAY_KEY_ID` in a **`.env`** file in the repo root (Compose substitutes them into `deployment/docker-compose.yaml` build args), or export them before `make up`. Defaults match production (`louve.palmonas.tech` / `api-louve.palmonas.tech`).

Manual build/run:

```bash
docker build -f deployment/Dockerfile -t louve-frontend:latest \
  --build-arg NEXT_PUBLIC_SITE_URL=https://louve.palmonas.tech \
  --build-arg NEXT_PUBLIC_API_URL=https://api-louve.palmonas.tech \
  .
docker run --rm -p 3000:3000 louve-frontend:latest
```

The container runs **Next.js standalone** under **pm2-runtime** (see `deployment/ecosystem.docker.cjs`).

### 503 on `/api/v1/*` (`UPSTREAM_UNAVAILABLE`)

The browser calls the Next.js BFF (`/api/v1/...`), which **server-side** `fetch`es the Go API. A **503** with `Could not reach the Louve API` means that `fetch` failed (network), not an HTTP error from Go.

Typical causes:

1. **`NEXT_PUBLIC_API_URL` was built as `http://localhost:8080`** — inside the frontend container, `localhost` is the Next process, not the API. Rebuild with a reachable URL **or** set **`INTERNAL_API_URL`** at runtime (no rebuild needed for this var).

2. **API and frontend on the same host (Docker)** — from the `louve-frontend` container, use the host gateway or the API container IP, for example:
   - `INTERNAL_API_URL=http://172.26.9.251:8080` (host private IP),
   - or `http://host.docker.internal:8080` (Docker Desktop; on Linux you may need `--add-host=host.docker.internal:host-gateway`).

3. **Public API URL** (`https://api-louve.palmonas.tech`) **not reachable** from inside the container (DNS, TLS, firewall). Test: `docker exec louve-frontend wget -qO- https://api-louve.palmonas.tech/health/live` (or `curl`).

**Fix:** Export `INTERNAL_API_URL` before `docker compose up`, or add it under `environment` in Compose:

```bash
INTERNAL_API_URL=http://<host-ip>:8080 docker compose -f deployment/docker-compose.yaml --project-directory . up -d
```

## PM2 (VM)

On the server:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm exec pm2 start deployment/ecosystem.config.cjs
```

Redeploy / restart:

```bash
make pm2-reload
```

