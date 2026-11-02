# .cursor/

Cursor-specific project configuration.

## Layout

```
.cursor/
├── settings.json       # IDE settings (currently: enable Figma plugin)
├── rules/              # Scoped project rules (.mdc)
└── skills/             # Reusable multi-step workflows (SKILL.md)
```

## Rules vs. skills

- **Rules** (`.mdc`) are always-on or glob-scoped guidance applied by
  Cursor whenever a matching file is in context.
- **Skills** (`SKILL.md`) are procedures invoked when the user asks for
  a specific workflow (e.g. "add an API endpoint").

Both link back to canonical documentation under [`../docs/`](../docs/)
and to the root [`../AGENTS.md`](../AGENTS.md). Do not duplicate the
canonical rules — reference them.

## Discovery

- `.cursor/rules/*.mdc` is discovered by Cursor automatically.
- Skills are discovered by Cursor's skill tooling (see
  [`skills/README.md`](skills/README.md)).
- Agents that look for `AGENTS.md` read [`../AGENTS.md`](../AGENTS.md)
  at the repo root.
- An empty [`../.agents/`](../.agents/README.md) folder is reserved for
  future tooling that discovers project skills there; it does **not**
  mirror these files today.
