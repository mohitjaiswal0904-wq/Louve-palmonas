# `src/app/(auth)/`

Routes that will require **authentication** once auth is implemented (cart, wishlist, account). The **`(auth)`** group name does **not** prefix the path — URLs are `/account`, `/cart`, `/wishlist`.

## Current pages

- **`account/page.tsx`**
- **`cart/page.tsx`**
- **`wishlist/page.tsx`**

All are localized “coming soon” placeholders with proper **`generateMetadata`**.

## Layout

- **`layout.tsx`** — uses **`SiteLayout`** like public pages; add auth checks or different chrome here later (e.g. simplified header).

## Future

- Middleware or server layout that redirects unauthenticated users to **`/auth/login`** with `returnUrl`.
- Do **not** duplicate API calls here — use **`services/`** + **`lib/client`**.
