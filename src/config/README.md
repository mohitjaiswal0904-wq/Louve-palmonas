# src/config/

**Reserved — currently empty.** Validated configuration composition.

Use this folder when configuration grows beyond flat env vars — e.g.
feature flags composed from env + remote config, or configuration
objects derived from multiple sources that need validation and a single
cache point.

## Rules

- Server env lives in [`../lib/env/server.ts`](../lib/env/server.ts),
  not here.
- Client-visible config must be safe to ship to the browser.
- Validate every value with Zod before export.
- Never ship a `_PUBLIC` env var that contains a secret.

## Example (planned)

```ts
import { z } from "zod";
import { getServerEnv } from "@/lib/env/server";    // if server-side
export const siteConfig = {
  name: "LOUVE",
  defaultLocale: "en",
  // …
};
```

If `siteConfig` is client-safe (no secrets), it can live here even
without `server-only`.
