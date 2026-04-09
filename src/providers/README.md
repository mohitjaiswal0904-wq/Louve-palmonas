# `src/providers/`

React **context providers** composed at the root.

## Files

| File | Role |
|------|------|
| **`app-providers.tsx`** | Wraps **`LocaleProvider`** (from **`src/state`**) + **`LayoutProvider`**; receives **`initialLocale`** / **`initialMessages`** from root **`layout.tsx`**. Uses **`key={initialLocale}`** on locale provider for clean refresh. |
| **`layout-context.tsx`** | Sidebar open state + **`toggleSidebar`** / **`setSidebarOpen`**. |

## Rules

- Do not perform **fetch** here — keep providers for UI/locale state only unless you add a dedicated data provider with a clear contract.
