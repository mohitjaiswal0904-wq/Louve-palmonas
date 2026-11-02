# src/hooks/

**Reserved — currently empty.** Shared React hooks used by ≥ 2 features
or by chrome.

Feature-local hooks belong in `src/features/<feature>/hooks/`. Hooks
used by a single chrome component can live beside the component.

## Rules

- Follow the Rules of Hooks.
- Must not import `server-only`, `@prisma/client`, or
  `src/lib/env/server`.
- Name: `useXxx`, in a file of the same name.
- One hook per file. Co-locate tightly-related types.

## Shape

```ts
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}
```

## Related

The pre-existing [`@/lib/nav/useAppNav`](../lib/nav/useAppNav.ts) lives
under `lib/nav/` rather than here because it is a thin shim over
`next/navigation` consumed by chrome. Future navigation-oriented hooks
can live either place; prefer `src/hooks/` once there are more than one.
