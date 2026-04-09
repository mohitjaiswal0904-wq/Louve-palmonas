"use client";

import type { ReactNode } from "react";
import { LayoutProvider } from "./layout-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
