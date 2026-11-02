# .agents/skills/

**Reserved.** Mirror location for third-party agent tools that discover
skills in `.agents/skills/`.

The canonical skills live under
[`../../.cursor/skills/`](../../.cursor/skills/). If a new tool
requires a skill in `.agents/skills/`, add a thin wrapper that:

1. Follows that tool's required format.
2. Links to the canonical `SKILL.md` in `.cursor/skills/`.
3. Does **not** duplicate the procedure. Pointing-and-linking avoids
   drift.

Nothing here today.
