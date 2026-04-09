# `src/components/`

Reusable **React** building blocks used across routes.

## Subfolders

| Folder | Role |
|--------|------|
| **`ui/`** | shadcn-generated primitives (**Button**, **Sheet**, **DropdownMenu**, …). Add with `pnpm dlx shadcn@latest add <name>` — do not fork unless customizing globally. |
| **`layout/`** | **`SiteLayout`**, **Header**, **Footer**, **Sidebar**, **LanguageSwitcher**, header action icon map. |
| **`common/`** | Cross-route pieces like **`ComingSoon`**. |
| **`seo/`** | **`createMetadata`** helper, **`WebSiteJsonLd`**. |

## Rules

- **Layout** pieces that need **`useMessages()`** or sidebar state are **client components** where marked.
- Feature-specific UI that spans multiple routes can live under **`src/features/<name>/`** instead of bloating **`layout/`**.

Each subfolder has a **`README.md`**.
