# src/data/

Hand-authored static content shipped with the application.

## Files

- `home.ts` — home-page editorial sections.
- `navCategories.ts` — nav overlay categories.
- `popularSearches.ts` — footer link lists.
- `product.ts`, `pdpProduct.ts` — the pre-migration single PDP product.
- `collection.ts` — collection grid data.
- `storeProducts.ts`, `stores.ts` — store list + per-store product data.
- `assets.ts` — centralised asset-URL constants.
- `expertConsult.ts` — expert consult modal content.
- `goldTones.ts` — gold temperament swatches (used by the home-page
  Gold Dial section).

## Rules

- Pure TS modules, no React, no Prisma, no `window`.
- URL references use the public URL (`/assets/...`), never a TS import
  of `public/`.
- Content that is editorially owned (copy, images, prices in future)
  stays here until a CMS or DB replaces it. When that happens, move
  this folder into the owning feature or server service.

## Not here

- Fetched data — call a service.
- Env values.
- Feature-specific content — put inside the feature's `data/`.

## When to add a file

- A new editorial surface needs structured content and the content fits
  comfortably as a TypeScript literal.
- The content is small enough to ship in the bundle and does not change
  often.

Larger / mutable content should move to the database behind a
repository + service.
