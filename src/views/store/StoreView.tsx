"use client";

import { lazy, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";

const StorePage = lazy(() =>
  import("@/views/store/StorePage").then((m) => ({ default: m.StorePage })),
);

type StoreViewProps = {
  storeId: string;
};

export function StoreView({ storeId }: StoreViewProps) {
  const router = useRouter();
  const search = useSearchParams();
  const { goStores, goPdp } = useAppNav();

  const collectionOpen = search.get("collection") === "1";

  const syncCollection = useCallback(
    (open: boolean) => {
      const params = new URLSearchParams(search.toString());
      if (open) params.set("collection", "1");
      else params.delete("collection");
      const qs = params.toString();
      // Use `replace` so toggling the panel does not pollute history.
      router.replace(`/stores/${encodeURIComponent(storeId)}${qs ? `?${qs}` : ""}`);
    },
    [router, search, storeId],
  );

  return (
    <AppShell immersive>
      <Suspense fallback={<div className="store-page" aria-busy="true" />}>
        <StorePage
          storeId={storeId}
          collectionOpen={collectionOpen}
          onCollectionOpenChange={syncCollection}
          onBackToStores={goStores}
          onSelectProduct={(id?: string) => goPdp(id)}
        />
      </Suspense>
    </AppShell>
  );
}
