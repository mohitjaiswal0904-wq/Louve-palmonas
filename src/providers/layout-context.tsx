"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LayoutContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  const value = useMemo(
    () => ({ sidebarOpen, setSidebarOpen, toggleSidebar }),
    [sidebarOpen, toggleSidebar],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayoutContext() {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayoutContext must be used within LayoutProvider");
  }
  return ctx;
}
