# Architecture

Canonical architecture documentation for Louve.

| Document | Purpose |
|---|---|
| [`SYSTEM_ARCHITECTURE.md`](SYSTEM_ARCHITECTURE.md) | High-level system view, stack, data flow. |
| [`FOLDER_STRUCTURE.md`](FOLDER_STRUCTURE.md) | Every architectural folder, its responsibility, and allowed imports. |
| [`DEPENDENCY_RULES.md`](DEPENDENCY_RULES.md) | What may import what. |
| [`RENDERING_STRATEGY.md`](RENDERING_STRATEGY.md) | Server vs. Client components, caching, hydration. |
| [`CODING_STANDARDS.md`](CODING_STANDARDS.md) | TypeScript, naming, imports, errors. |
| [`ARCHITECTURE_DECISIONS.md`](ARCHITECTURE_DECISIONS.md) | Rolling log of significant decisions. Full ADRs live in [`../decisions/`](../decisions/). |
| [`ARCHITECTURE_AUDIT.md`](ARCHITECTURE_AUDIT.md) | Snapshot audit used to drive the Phase-2 standardisation. |

When the architecture changes, update the corresponding document in the
same change. See [`../../AGENTS.md`](../../AGENTS.md).
