# .agents/

**Reserved — not consumed by any tool configured in this repository
today.**

Some agent ecosystems look for an `.agents/` folder (or a sibling of
`AGENTS.md`) to discover project skills, system prompts, or
tool-manifest files. This project does **not** rely on that convention
yet. Nothing here is currently loaded automatically.

## What lives in this project today

- Root [`AGENTS.md`](../AGENTS.md) — concise entry point for any agent
  that reads `AGENTS.md`.
- [`.cursor/rules/*.mdc`](../.cursor/rules/) — Cursor's scoped rules.
- [`.cursor/skills/*/SKILL.md`](../.cursor/skills/) — Cursor's reusable
  workflow skills.

## If / when an agent tool adopts `.agents/`

- Add tool-specific files here following that tool's spec.
- Document the tool and the expected files in this README.
- Do **not** duplicate rules or skills — reference the canonical
  Cursor files or `AGENTS.md`. Divergent copies cause silent drift.

## Not here

- Secrets, credentials, tokens.
- Anything the model should treat as production code.
