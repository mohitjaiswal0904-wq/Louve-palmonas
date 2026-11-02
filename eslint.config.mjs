// Minimal flat ESLint config with TypeScript support.
//
// The project historically uses oxlint (`.oxlintrc.json`,
// `npm run lint:oxlint`) for fast linting. This flat config provides a
// lightweight ESLint pass that understands TypeScript / JSX so editor
// integrations and `npm run lint` keep working without the full
// Next.js preset (currently brittle on React 19.2 / Next 16 + ESLint 9
// FlatCompat).
//
// When the ecosystem settles, replace with `next/core-web-vitals` +
// `next/typescript`.
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "prisma/generated/**",
      "next-env.d.ts",
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Match the existing TypeScript compiler strictness; keep the
      // lint pass focused on obvious bugs rather than style churn.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
