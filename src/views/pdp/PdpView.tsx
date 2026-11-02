"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";
import { PdpPage } from "@/views/pdp/PdpPage";

type PdpViewProps = {
  productId: string | null;
};

export function PdpView({ productId }: PdpViewProps) {
  const { goStores } = useAppNav();
  return (
    <AppShell scrolledFill="pdp" hideOnScrollDown>
      <PdpPage productId={productId} onVisitStore={goStores} />
    </AppShell>
  );
}
