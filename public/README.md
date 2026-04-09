# `public/`

**Static assets** served from the site root (`/favicon.ico`, `/icon.png`, images, fonts if not using `next/font`).

## Current

- **`icon.png`** — Louve mark used in sidebar/header contexts.

## Conventions

- Prefer **`next/image`** with explicit **width/height** for LCP images.
- Optimize large assets before commit; use CDN in production if files grow.
- **Do not** put secrets or private user data here — everything is public.

## Adding files

Reference as **`/filename.ext`** from components. For localized PDFs or legal docs, consider versioning filenames when copy changes.
