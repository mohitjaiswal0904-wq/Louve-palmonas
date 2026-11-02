import type { Metadata } from "next";

import { StoreView } from "@/views/store/StoreView";

type StoreRouteProps = {
  params: Promise<{ storeId: string }>;
};

export async function generateMetadata({ params }: StoreRouteProps): Promise<Metadata> {
  const { storeId } = await params;
  return {
    title: `${storeId} store — LOUVE`,
  };
}

/**
 * `/stores/[storeId]` — the immersive 3D store experience. The optional
 * `?collection=1` query opens the overlaid glass collection panel; this is
 * read inside the client view via `useSearchParams()`.
 */
export default async function StoreRoute({ params }: StoreRouteProps) {
  const { storeId } = await params;
  return <StoreView storeId={storeId} />;
}
