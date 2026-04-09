# `src/features/home/`

Homepage **sections** when you compose a full marketing home (hero, collections teaser, CTA).

## Files

- **`hero.tsx`** — Brand line, tagline, value cards, CTA buttons — **`useMessages()`** for **`homeFeature`** + **`seo.brandLine`**.
- **`collections.tsx`** — Grid of **`messages.brand.collections`**.
- **`cta.tsx`** — Tagline, subtitle, price bands — all localized.

## Usage

Import from route **`page.tsx`** or a future home composition component. All exports are **`"use client"`** because they call **`useMessages()`**.

## Copy keys

Extend **`AppMessages.homeFeature`** in **`src/types/config/messages.ts`** and update **all four** locale files when changing strings.
