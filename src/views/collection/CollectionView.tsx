"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";
import { CollectionPage } from "@/views/collection/CollectionPage";

export function CollectionView() {
  const { goPdp } = useAppNav();
  return (
    <AppShell>
      <CollectionPage onSelectProduct={goPdp} />
    </AppShell>
  );
}
