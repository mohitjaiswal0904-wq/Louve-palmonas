# src/components/navigation/

**Reserved — currently empty.**

Home for navigation-specific UI that isn't the main `Header` or the
mega-menu `NavOverlay`. Example candidates: `Breadcrumbs`,
`SideNav`, `TabNav`, `Stepper`.

The existing `Header` and `NavOverlay` live in [`../layout/`](../layout/README.md)
because they are part of the shared chrome. New navigation widgets that
are reused across routes but not part of chrome belong here.

## Rules

- Same rules as [`../README.md`](../README.md).
- Prefer `next/link` + `next/navigation`; the thin
  [`@/lib/nav/useAppNav`](../../lib/nav/useAppNav.ts) shim is available
  when the legacy callback contract is needed.
