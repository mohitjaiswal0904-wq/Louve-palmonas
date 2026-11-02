"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * useAppNav — thin shim that exposes the same callback surface the legacy
 * custom router (`useLouveRouter`) did, but implemented against the real
 * Next.js App Router.
 *
 * This exists so the existing <Header /> and other presentation components
 * can stay 100% unchanged while each view is migrated into its own route
 * segment. New code should prefer `useRouter()` / `<Link />` directly.
 */
export function useAppNav() {
  const router = useRouter();
  const search = useSearchParams();

  const push = useCallback(
    (href: string) => {
      router.push(href);
      // Match the legacy scroll-to-top behaviour.
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [router],
  );

  const goHome = useCallback(() => push("/"), [push]);
  const goCollection = useCallback(() => push("/collection"), [push]);
  const goStores = useCallback(() => push("/stores"), [push]);
  const goAccount = useCallback(() => push("/account"), [push]);

  const goPdp = useCallback(
    (productId?: string) => {
      if (!productId) {
        push("/pdp");
        return;
      }
      push(`/pdp/${encodeURIComponent(productId)}`);
    },
    [push],
  );

  const goStore = useCallback(
    (storeId: string) => {
      push(`/stores/${encodeURIComponent(storeId)}`);
    },
    [push],
  );

  return {
    router,
    search,
    goHome,
    goCollection,
    goStores,
    goAccount,
    goPdp,
    goStore,
  };
}
