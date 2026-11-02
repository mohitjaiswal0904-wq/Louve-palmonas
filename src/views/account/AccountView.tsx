"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";
import { AccountPage } from "@/views/account/AccountPage";

export function AccountView() {
  const { goPdp } = useAppNav();
  return (
    <AppShell>
      <AccountPage onOpenProduct={goPdp} />
    </AppShell>
  );
}
