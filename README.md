# LOUVE

Louve editorial jewellery experience. **Next.js 16 (App Router)** +
**Prisma 6** + **PostgreSQL**. Originally a Vite + React 19 SPA; the
migration is complete — see
[`docs/migration/REACT_TO_NEXT_MIGRATION.md`](docs/migration/REACT_TO_NEXT_MIGRATION.md).

## Start reading here

- 🧭 [`AGENTS.md`](AGENTS.md) — rules for humans and AI agents.
- 🏗️ [`docs/architecture/SYSTEM_ARCHITECTURE.md`](docs/architecture/SYSTEM_ARCHITECTURE.md)
- 📂 [`docs/architecture/FOLDER_STRUCTURE.md`](docs/architecture/FOLDER_STRUCTURE.md)
- 🧱 [`docs/architecture/DEPENDENCY_RULES.md`](docs/architecture/DEPENDENCY_RULES.md)
- 🎨 [`docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](docs/frontend/UI_AND_COMPONENT_GUIDELINES.md)
- 🔌 [`docs/api/API_CONVENTIONS.md`](docs/api/API_CONVENTIONS.md)
- 🗄️ [`docs/database/DATABASE_GUIDELINES.md`](docs/database/DATABASE_GUIDELINES.md)
- 🧪 [`docs/testing/TESTING_STRATEGY.md`](docs/testing/TESTING_STRATEGY.md)
- 🔐 [`docs/security/SECURITY_GUIDELINES.md`](docs/security/SECURITY_GUIDELINES.md)
- 🛠️ [`docs/development/LOCAL_DEVELOPMENT.md`](docs/development/LOCAL_DEVELOPMENT.md)
- 🚀 [`docs/onboarding/DEVELOPER_ONBOARDING.md`](docs/onboarding/DEVELOPER_ONBOARDING.md)
- 📜 [`docs/architecture/CODING_STANDARDS.md`](docs/architecture/CODING_STANDARDS.md)
- 📝 [`docs/decisions/README.md`](docs/decisions/README.md)
- 🤖 [`.cursor/rules/`](.cursor/rules/), [`.cursor/skills/`](.cursor/skills/)

## Prerequisites

- Node.js ≥ 20 (developed on 24).
- npm ≥ 10.
- Optional: PostgreSQL ≥ 14 for `/api/v1/db/health` and future
  features.

## Install

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is required until React 19.2.x / TypeScript 6.x
peer ranges are tidied.

## Environment

```bash
cp .env.example .env
# then edit DATABASE_URL
```

See [`docs/development/LOCAL_DEVELOPMENT.md`](docs/development/LOCAL_DEVELOPMENT.md)
for the full table of env vars.

## Development

```bash
npm run dev            # http://localhost:3000
```

## Build / start

```bash
npm run build
npm run start
npm run typecheck      # tsc --noEmit
npm run lint           # next lint
npm run lint:oxlint    # legacy oxlint
```

## Database

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init    # once DATABASE_URL is set
npm run prisma:deploy                    # production
npm run prisma:studio
npm run db:validate
```

## API

- `GET /api/v1/health` — liveness.
- `GET /api/v1/db/health` — DB readiness (503 until `DATABASE_URL` is
  configured).

Full conventions: [`docs/api/API_CONVENTIONS.md`](docs/api/API_CONVENTIONS.md).

## Troubleshooting

See [`docs/development/LOCAL_DEVELOPMENT.md`](docs/development/LOCAL_DEVELOPMENT.md).
