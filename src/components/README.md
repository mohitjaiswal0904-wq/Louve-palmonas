# `src/components/`

Reusable **React** building blocks used across routes.

## Subfolders

| Folder | Role |
|--------|------|
| **`ui/`** | shadcn-generated primitives (**Button**, **Sheet**, **DropdownMenu**, …). Add with `pnpm dlx shadcn@latest add <name>` — do not fork unless customizing globally. |
| **`layout/`** | **`SiteLayout`**, **Header**, **Footer**, **Sidebar**, **LanguageSwitcher**, header action icon map. |
| **`home/`** | Home page sections (**`HomeHero`**, **`HomeCollections`**, **`HomeCTA`**). |
| **`catalog/`** | Product listing, cards, filters, pagination. |
| **`common/`** | Cross-route pieces like **`ComingSoon`**. |
| **`seo/`** | **`createMetadata`** helper, **`WebSiteJsonLd`**. |

## Rules

- **Layout** pieces that need **`useMessages()`** or sidebar state are **client components** where marked.
- **Page-specific** UI (e.g. home blocks) lives under **`components/<area>/`**, not a separate `features/` tree.

Each subfolder has a **`README.md`**.
