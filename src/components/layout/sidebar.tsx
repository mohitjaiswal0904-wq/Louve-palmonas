"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { useLayoutContext } from "@/providers/layout-context";
import { cn } from "@/lib/utils";
import { sidebarNav, type SidebarNavLink } from "@/lib/config/navigation";
import { useMediaQuery } from "@/hooks";

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // activePath is a stack of keys, one per opened panel level.
  const [activePath, setActivePath] = useState<string[]>([]);
  const closeTimer = useRef<number | null>(null);

  const panels = useMemo(() => {
    const out: SidebarNavLink[][] = [sidebarNav];
    let level = sidebarNav;
    for (const key of activePath) {
      const next = level.find((i) => i.key === key)?.children;
      if (!next || next.length === 0) break;
      out.push(next);
      level = next;
    }
    return out;
  }, [activePath]);

  const mobilePanel = useMemo(() => {
    let level = sidebarNav;
    for (const key of activePath) {
      const next = level.find((i) => i.key === key)?.children;
      if (!next || next.length === 0) break;
      level = next;
    }
    return level;
  }, [activePath]);

  const setHoverKey = (levelIndex: number, key: string) => {
    setActivePath((prev) => {
      const next = prev.slice(0, levelIndex);
      next[levelIndex] = key;
      return next;
    });
  };

  const openChildPanel = (levelIndex: number, item: SidebarNavLink) => {
    if (!item.children?.length) return;
    setActivePath((prev) => {
      const next = prev.slice(0, levelIndex);
      next[levelIndex] = item.key;
      return next;
    });
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleCloseFlyouts = () => {
    if (!isDesktop) return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setActivePath([]);
    }, 120);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          "fixed inset-0 z-20 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200 ease-out motion-reduce:transition-none",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => {
          setSidebarOpen(false);
          setActivePath([]);
        }}
      />

      {isDesktop ? (
        // Desktop: multi-panel navigation (panel 0 + flyouts).
        <div
          className={cn(
            "fixed left-0 top-0 z-30 flex h-dvh items-stretch",
            "transition-transform duration-300 ease-out motion-reduce:transition-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseFlyouts}
        >
          {panels.map((panelItems, idx) => (
            <aside
              key={idx}
              className={cn(
                "h-dvh border-r bg-background shadow-2xl",
                idx === 0 ? "w-[300px]" : "w-[320px]",
              )}
              aria-label={idx === 0 ? "Sidebar" : "Sidebar submenu"}
            >
              <div className="flex h-16 w-full items-center gap-3 border-b px-4">
                {idx === 0 ? (
                  <>
                    <Image src="/icon.png" alt="Louve" width={26} height={26} priority />
                    <div className="text-sm font-light tracking-[0.22em]">LOUVE</div>
                    <button
                      type="button"
                      aria-label="Close sidebar"
                      className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => {
                        setSidebarOpen(false);
                        setActivePath([]);
                      }}
                    >
                      <X className="size-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Browse
                  </div>
                )}
              </div>

              <div className="flex h-[calc(100dvh-4rem)] flex-col">
                <nav className="flex flex-col gap-1 p-3">
                  {panelItems.map((item) => {
                    const hasChildren = !!item.children?.length;
                    const active = activePath[idx] === item.key;

                    if (hasChildren) {
                      return (
                        <button
                          key={item.key}
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm tracking-wide transition-colors",
                            active
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                          onMouseEnter={() => setHoverKey(idx, item.key)}
                          onFocus={() => setHoverKey(idx, item.key)}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="size-4 opacity-70" />
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.key}
                        href={item.href ?? "/"}
                        className="rounded-lg px-4 py-3 text-sm tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onMouseEnter={() => setActivePath((p) => p.slice(0, idx))}
                        onFocus={() => setActivePath((p) => p.slice(0, idx))}
                        onClick={() => {
                          setSidebarOpen(false);
                          setActivePath([]);
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {idx === 0 ? (
                  <div className="mt-auto p-4 text-xs text-muted-foreground">
                    <div className="uppercase tracking-[0.22em]">
                      From the house of Palmonas
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          ))}
        </div>
      ) : (
        // Mobile: single-panel “push” navigation (tap to drill in).
        <aside
          className={cn(
            "fixed left-0 top-0 z-30 h-dvh w-[88vw] max-w-[360px] border-r bg-background shadow-2xl",
            "transition-transform duration-300 ease-out motion-reduce:transition-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Sidebar"
        >
          <div className="flex h-16 w-full items-center gap-3 border-b px-4">
            {activePath.length > 0 ? (
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                onClick={() => setActivePath((p) => p.slice(0, -1))}
                aria-label="Back"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
            ) : (
              <>
                <Image src="/icon.png" alt="Louve" width={26} height={26} priority />
                <div className="text-sm font-light tracking-[0.22em]">LOUVE</div>
              </>
            )}
            <button
              type="button"
              aria-label="Close sidebar"
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                setSidebarOpen(false);
                setActivePath([]);
              }}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex h-[calc(100dvh-4rem)] flex-col">
            <nav className="flex flex-col gap-1 p-3">
              {mobilePanel.map((item) => {
                const hasChildren = !!item.children?.length;
                if (hasChildren) {
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      onClick={() => openChildPanel(activePath.length, item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="size-4 opacity-70" />
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.key}
                    href={item.href ?? "/"}
                    className="rounded-lg px-4 py-3 text-sm tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => {
                      setSidebarOpen(false);
                      setActivePath([]);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto p-4 text-xs text-muted-foreground">
              <div className="uppercase tracking-[0.22em]">From the house of Palmonas</div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
