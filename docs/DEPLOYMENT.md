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

