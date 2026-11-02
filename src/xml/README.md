# src/xml/

**Reserved — no XML workload today.** Documented so that if XML
functionality is introduced it has one authoritative home.

## Scope

If / when XML is used, this folder owns:

- **Parsing** incoming XML (external feeds, inbound integrations).
- **Serialising** outgoing XML (partner exports, product feeds, OPDS,
  CDA, etc.).
- **Schemas / validation** (XSD or Zod-shaped post-parse schemas).
- **Transformers** between XML and the domain model.
- **Types** describing XML documents consumed or produced.
- **Utilities** (namespace helpers, XPath-ish selectors).

## Suggested layout (introduce only what is used)

```
src/xml/
├── parsers/        # fromXml.ts, from<Format>.ts
├── serializers/    # toXml.ts, to<Format>.ts
├── schemas/        # Zod schemas validating post-parse shape
├── transformers/   # XML <-> domain mapping
├── types/          # XML document TS types
└── utils/          # namespace, selector, escape helpers
```

Do not create empty subfolders. Add each folder only when it has a
real file.

## Rules

- Each parser / serialiser is a pure function. Side effects (fetching,
  reading files) happen at the caller.
- Validate immediately after parsing: `rawXml → parse() → ZodSchema.parse()`
  before using the result in business code.
- Use an actively maintained XML library (e.g. `fast-xml-parser`); do
  not hand-roll a parser.
- Prefer streaming only when input size justifies it.

## Not this folder

- **Sitemap / robots:** use Next.js's built-in metadata routes
  (`src/app/sitemap.ts`, `src/app/robots.ts`). Not XML in the
  application-logic sense.
- **SVG assets:** SVG is XML but assets live in [`../../public/assets/`](../../public/assets/).

## Policy on introducing XML

A new XML workload must be introduced with:

1. A real external contract (not a speculative future use).
2. A linked integration spec in `docs/`.
3. Minimal implementation with tests.
4. An update to this README listing the actual files.
