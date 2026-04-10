# `src/components/home/`

**Louve home page** sections: hero, collection cards, and CTA band. All are **client** components and use **`useMessages()`** for copy.

| File | Export | Role |
|------|--------|------|
| **`hero.tsx`** | **`HomeHero`** | Brand line, headline, pillars grid |
| **`collections.tsx`** | **`HomeCollections`** | Collection cards from `m.brand.collections` |
| **`cta.tsx`** | **`HomeCTA`** | Tagline, buttons, price tiers |
| **`index.tsx`** | Re-exports | Barrel for `@/components/home` |

The route composes these in **`src/app/(public)/page.tsx`**.
