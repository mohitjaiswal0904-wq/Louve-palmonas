# .cursor/skills/

Reusable multi-step workflows. Each skill lives in its own folder with
a `SKILL.md`.

## Skills

| Skill | Trigger |
|---|---|
| [`architecture-maintenance`](architecture-maintenance/SKILL.md) | "audit the architecture", "fix architectural drift", "where does this file go?" |
| [`feature-development`](feature-development/SKILL.md) | "add a feature", "scaffold a new feature module" |
| [`api-development`](api-development/SKILL.md) | "add an API endpoint", "add a route handler", "add a Server Action" |
| [`database-changes`](database-changes/SKILL.md) | "add a Prisma model", "change the schema", "write a migration" |
| [`ui-preserving-refactors`](ui-preserving-refactors/SKILL.md) | "refactor this component", "move / rename UI without breaking it" |

## Each skill contains

- Name + description + trigger conditions.
- When to use / when not to use.
- Required inputs.
- Step-by-step procedure.
- Architecture constraints that apply.
- Validation checklist.
- Documentation updates required.
- Expected final report format.

Create a new skill only when there is a real recurring workflow — do
not add skills to populate the folder.
