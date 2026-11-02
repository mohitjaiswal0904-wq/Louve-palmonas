import type { Metadata } from "next";

import { CollectionView } from "@/views/collection/CollectionView";

export const metadata: Metadata = {
  title: "Collection — LOUVE",
};

export default function CollectionRoute() {
  return <CollectionView />;
}
