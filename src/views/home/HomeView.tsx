"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAppNav } from "@/lib/nav/useAppNav";
import { HomePage } from "@/views/home/HomePage";

export function HomeView() {
  const { goCollection } = useAppNav();
  return (
    <AppShell>
      <HomePage onExplore={goCollection} />
    </AppShell>
  );
}
