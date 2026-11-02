# public/assets/

Static assets referenced by the UI. **Feature-grouped**, not
kind-grouped — this matches the way the Louve editorial design is
authored (per campaign / per section) and is the convention the data
modules in `src/data/*` reference.

## Layout

```
public/assets/
├── collection/              # Collection page product + lifestyle imagery
├── menu/                    # Nav overlay thumbnails
├── pdp/                     # PDP hero, gallery, USP icons, metal swatches
├── slides/                  # Home page banner slides
│   └── feature/             # Multi-image feature grid (atelier section)
├── icon-*.svg               # Shared chrome icons (cart, heart, menu, search, user)
├── logo.png
├── louve-wolf.png
└── star.svg                 # (favicon)
```

Fonts are **not** here — they live in [`../fonts/`](../fonts/) so the
`@font-face` rules in `src/styles/fonts.css` stay simple.

## Naming conventions

- Lowercase, hyphen-separated: `banner-hero.png`.
- Numbered variants use `-a`, `-b`, `-c` or a trailing `-01`:
  `slide-01.png`, `s2-full.png`.
- Icons prefixed with `icon-`.
- USP icons prefixed with `usp-`.

## URL conventions

- Public URL = path with `public/` stripped: `/assets/pdp/hero.png`.
- Always reference assets by URL from TypeScript / JSX. Never
  `import "@/public/..."`.
- Pre-load critical imagery via the `<link rel="preload" as="image">`
  Next.js injects — just set the `src` on the component and let the
  renderer handle preloads.

## When to add a subfolder

Add a new subfolder when a product surface (new page, new campaign)
groups ≥ 3 assets logically. Smaller sets can live at the appropriate
feature folder root (`collection/`, `pdp/`).

**Don't** re-organise existing assets by kind (`images/`, `icons/`) —
it would churn every reference in `src/data/*` without a benefit. This
was explicitly discussed in
[`../../docs/architecture/ARCHITECTURE_DECISIONS.md`](../../docs/architecture/ARCHITECTURE_DECISIONS.md).

## Optimisation

- PNG / JPG: Squoosh or TinyPNG, aim < 300 KB per hero image.
- SVG: SVGO defaults are fine. Keep IDs stable if the SVG is referenced
  via fragment URLs.
- WebP / AVIF: welcome; add the fallback `src` only if the component
  needs it.

## Not allowed here

- Server source code, Prisma types, environment files, user uploads,
  anything requiring authentication. See [`../README.md`](../README.md).
