# LOUVE

Product experience built from the Louve Website Figma design (home → collection → PDP).

## Run locally

```bash
npm install
npm run dev
```

## Stack

- React + TypeScript (Vite)
- Plain CSS (design tokens aligned to Figma)

## Project structure

```
src/
  app/                 # view routing helpers
  components/
    layout/            # Header, nav overlay, footer sections
    ui/                # shared presentational pieces
  data/                # static content & product catalog
  lib/                 # small pure utilities
  pages/
    home/              # homepage + styles
    collection/        # PLP + styles
    pdp/               # product detail + styles
  styles/              # fonts, tokens, shared chrome, responsive
```

Views: `/` (home), `/?view=collection`, `/?view=pdp`.
