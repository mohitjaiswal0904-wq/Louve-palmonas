# `src/lib/live/`

**Realtime** scaffolding — WebSockets, SSE, presence, or Ably/Liveblocks-style clients **without** pulling them into the main bundle until needed.

## Today

- **`index.ts`** exports nothing (`export {}`) — placeholder comment only.

## When you implement

- Put connection factory + channel types here.
- Keep **secrets** on the server (Route Handlers or Louve backend); browser code only receives short-lived tokens if required.
