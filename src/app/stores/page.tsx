import type { Metadata } from "next";

import { StoreListView } from "@/views/store/StoreListView";

export const metadata: Metadata = {
  title: "Stores — LOUVE",
};

export default function StoresRoute() {
  return <StoreListView />;
}
