"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";
import { StoreListPage } from "@/views/store/StoreListPage";

export function StoreListView() {
  const { goStore, goPdp } = useAppNav();
  return (
    <AppShell>
      <StoreListPage onSelectStore={goStore} onBack={() => goPdp()} />
    </AppShell>
  );
}
