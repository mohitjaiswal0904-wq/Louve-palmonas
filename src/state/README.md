# `src/state/`

**Client-side shared state** via React Context — consumed through **`src/hooks`**.

## Current

- **`locale-context.tsx`** — **`LocaleProvider`**, **`useLocaleContext`**: active **`AppLocale`**, **`AppMessages`**, **`setLocale`** (cookie + refresh).

## When to add

- New context when **multiple distant components** need the same mutable client state (e.g. mini-cart preview).
- Prefer **server state** (RSC + revalidate) when possible for catalog data.

## Rules

- Do not import **`services`** directly in context files if that creates circular deps — use hooks that call services instead.
