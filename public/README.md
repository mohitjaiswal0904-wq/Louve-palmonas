# public/

Static files served by Next.js at `/`. **Everything here is publicly
reachable.** Do not place secrets, server implementation files, or
unredacted user data in this folder.

## Layout

```
public/
├── assets/           # Images, icons, illustrations, 3D textures
├── fonts/            # Self-hosted WOFF2 font files (loaded via @font-face)
└── (favicon, robots.txt, …)
```

URL ↔ path:

- `public/assets/pdp/hero.png` → `/assets/pdp/hero.png`
- `public/fonts/neue-haas-500-normal.woff2` → `/fonts/neue-haas-500-normal.woff2`

Never prefix with `/public/` — the folder name is stripped.

## Allowed

- Images (PNG, JPG, WebP, AVIF).
- Icons (SVG).
- Fonts (WOFF2).
- Videos, PDFs, static JSON intended for public download.
- `favicon.ico`, `robots.txt`, `sitemap.xml` (unless using Next.js
  metadata routes).

## Not allowed

- Secrets, credentials, `.env*` files.
- Server source code.
- Prisma clients, database dumps.
- User uploads that require authorisation.
- Backups, logs, tarballs.
- Node modules.

## Importing

Do **not** `import "@/public/..."` from TypeScript. Reference by URL
instead:

```tsx
<img src="/assets/pdp/hero.png" alt="…" />
```

If you need to inline an SVG as a component, store the SVG under
`src/components/ui/icons/` instead of `public/`.

## Adding assets

1. Pick the correct subfolder under `public/assets/<feature>/`
   (feature-grouped, see [`assets/README.md`](assets/README.md)).
2. Use descriptive, lowercase, hyphenated filenames
   (`banner-hero.png`, not `IMG_0427.PNG`).
3. Optimise before committing (TinyPNG / Squoosh / SVGO).
4. Update the component or `src/data/*` module that references the new
   URL.
5. Verify in `npm run dev`.

## Related

- [`../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md)
- [`../docs/architecture/FOLDER_STRUCTURE.md`](../docs/architecture/FOLDER_STRUCTURE.md)
