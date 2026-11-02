# Documentation

Durable engineering documentation for Louve. Keep each document focused;
link between them rather than duplicating sections.

## Map

- **[architecture/](architecture/)** — how the system is organised.
- **[api/](api/)** — HTTP API conventions.
- **[database/](database/)** — PostgreSQL + Prisma rules.
- **[frontend/](frontend/)** — UI, components, design tokens.
- **[testing/](testing/)** — testing strategy and layout.
- **[security/](security/)** — implemented and recommended controls.
- **[development/](development/)** — local setup.
- **[onboarding/](onboarding/)** — the first 30 minutes for a new dev.
- **[operations/](operations/)** — build, deploy, run.
- **[migration/](migration/)** — React → Next.js migration record.
- **[decisions/](decisions/)** — Architecture Decision Records (ADRs).

## Who maintains what

Every architectural change updates the relevant document in the **same
PR**. See [`../AGENTS.md`](../AGENTS.md) for the change-to-docs mapping.

## Status labels

Documents use these labels when the state of a feature matters:

- **Implemented & verified** — code exists and has been exercised.
- **Implemented, not verified** — code exists; validation pending.
- **Planned** — intentionally not built yet.
- **Optional** — supported extension point.
- **Deprecated** — scheduled for removal.
