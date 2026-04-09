# `src/components/common/`

Small **cross-route** UI pieces that are not full layout chrome.

## Current

- **`ComingSoon`** — title + body props (callers pass localized strings from **`getMessages()`** or parents).

## When to add here

- Shared cards, empty states, or banners used on many marketing pages.
- If a block is **one feature only**, prefer **`src/features/<name>/`**.
