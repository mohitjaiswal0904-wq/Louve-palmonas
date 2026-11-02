# src/components/common/

**Reserved — currently empty.**

Home for generic reusable widgets that don't fit `ui/` (primitives) or
`layout/` (chrome). Example candidates when they land: `Pagination`,
`EmptyState`, `Breadcrumb`, `Modal`, `Tooltip`.

## Rules

- Same rules as [`../README.md`](../README.md).
- No feature knowledge, no business logic.
- Promote from `src/features/<f>/components/` only when a widget is
  used by **≥ 2** features or chrome.

Do not add a file here just to populate the folder.
