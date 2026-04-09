# `src/features/catalog/`

**Product listing and product detail** shared UI — PLP filters, product cards, gallery, add-to-cart hooks — will live here as the catalog API is wired.

## Today

Reserved structure; the storefront still uses route-level **`ComingSoon`** pages under **`src/app/(public)/products/`**.

## Planned

- **`ProductCard`**, **`ProductGrid`**, **`FacetFilters`** — consume data from **Server Components** or hooks that call **`services/`** + **`createCsrApiClient`**.
- Keep **money** display using **`formatMoney`** from **`src/utils/format.ts`** with **`useLocale().locale`**.

## Related types

- **`src/types/commerce.ts`** — `Product`, `Money`, `Collection`.
