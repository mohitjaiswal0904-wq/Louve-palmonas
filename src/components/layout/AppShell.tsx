"use client";

import { useEffect, type ReactNode } from "react";

import { Header, type HeaderScrolledFill } from "@/components/layout/Header";
import { PopularSearches } from "@/components/layout/PopularSearches";
import { useAppNav } from "@/lib/nav/useAppNav";
import { ensureDemoAccount } from "@/lib/account";

type AppShellProps = {
  children: ReactNode;
  /** When true, hides the global PopularSearches footer (used by the 3D store view). */
  immersive?: boolean;
  /** Mirrors the legacy Header prop. */
  scrolledFill?: HeaderScrolledFill;
  /** Mirrors the legacy Header prop. */
  hideOnScrollDown?: boolean;
};

/**
 * AppShell — standard chrome (Header + PopularSearches) shared by every
 * view segment. Mirrors the structure the legacy `<App />` rendered so that
 * CSS cascading, header scroll behaviour, and the footer treatment are
 * identical to the pre-migration experience.
 */
export function AppShell({
  children,
  immersive = false,
  scrolledFill = "white",
  hideOnScrollDown = false,
}: AppShellProps) {
  const { goHome, goCollection, goPdp, goAccount } = useAppNav();

  useEffect(() => {
    void ensureDemoAccount();
  }, []);

  return (
    <div className={`page${immersive ? " page--store" : ""}`}>
      <Header
        onGoHome={goHome}
        onExploreCollection={goCollection}
        onOpenProduct={goPdp}
        onOpenAccount={goAccount}
        scrolledFill={scrolledFill}
        hideOnScrollDown={hideOnScrollDown}
      />
      {children}
      {immersive ? null : <PopularSearches />}
    </div>
  );
}
