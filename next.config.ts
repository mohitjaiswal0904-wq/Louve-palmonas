import type { NextConfig } from "next";

/**
 * Louve — Next.js configuration.
 *
 * Notes:
 * - `reactStrictMode` mirrors the StrictMode wrapper used by the Vite entry.
 * - We keep assets in /public (shared with the legacy Vite build) so no URL
 *   paths need to change during migration.
 * - typedRoutes is left off while migration is in progress; the legacy custom
 *   router (`src/router/*`) still uses URL query params for navigation.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Allow Next's <Image> if we opt into it per-component later. Local assets
    // under /public work with any configuration. Remote patterns intentionally
    // empty until a real CDN is introduced.
    remotePatterns: [],
  },
  experimental: {
    // Keep R3F / three.js happy on the server by not aggressively tree-shaking
    // packages the migrated client components depend on.
    optimizePackageImports: ["three"],
  },
  async redirects() {
    // Preserve external compatibility with the legacy single-URL,
    // query-string router. Any inbound link that still uses
    // `/?view=…` is redirected to the real App Router segment.
    return [
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "collection" }],
        destination: "/collection",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "plp" }],
        destination: "/collection",
        permanent: false,
      },
      {
        source: "/",
        has: [
          { type: "query", key: "view", value: "pdp" },
          { type: "query", key: "product", value: "(?<pid>.*)" },
        ],
        destination: "/pdp/:pid",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "pdp" }],
        destination: "/pdp",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "product" }],
        destination: "/pdp",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "stores" }],
        destination: "/stores",
        permanent: false,
      },
      {
        source: "/",
        has: [
          { type: "query", key: "view", value: "store" },
          { type: "query", key: "store", value: "(?<sid>.*)" },
        ],
        destination: "/stores/:sid",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "store" }],
        destination: "/stores",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "account" }],
        destination: "/account",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "query", key: "view", value: "login" }],
        destination: "/account",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
