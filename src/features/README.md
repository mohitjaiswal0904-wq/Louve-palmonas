# `src/features/`

**Feature-sized** UI modules — larger than a single dumb component, smaller than a whole route tree. Compose **hooks**, **services** (via hooks or server parents), and **components** here.

## Current

| Folder | Role |
|--------|------|
| **`home/`** | Hero, collections grid, CTA blocks — all **`useMessages()`** + **`homeFeature`** / **`brand`** keys. |
| **`catalog/`** | Placeholder for PLP/PDP shared UI when catalog API exists. |

## When to use `features/` vs `components/`

- **`components/`** — generic, reused everywhere (buttons, layout chrome).
- **`features/`** — Louve-specific product flows (catalog filters, mini-cart preview) that bundle multiple files.

Each feature folder should have a **`README.md`**.
