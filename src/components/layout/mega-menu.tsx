"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Match nav links to current route (supports both path-only and ?category= legacy links). */
function isCategoryActive(
  href: string,
  pathname: string,
  categoryParam: string | null,
): boolean {
  const q = href.indexOf("?");
  const pathPart = q >= 0 ? href.slice(0, q) : href;
  const queryPart = q >= 0 ? href.slice(q + 1) : "";

  if (pathname === pathPart && !queryPart) return true;
  if (pathname.startsWith(pathPart) && pathPart !== "/" && !queryPart) return true;

  if (pathname !== pathPart) return false;
  if (!queryPart) return !categoryParam;
  const want = new URLSearchParams(queryPart).get("category");
  if (!want) return !categoryParam;
  return categoryParam === want;
}

function MegaMenuInner({ isOpen, onClose }: MegaMenuProps) {
  const { navigation, common } = useMessages();
  const menuData = navigation.megaMenu;
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 bg-black/20 backdrop-blur-md transition-opacity duration-500",
          "top-[var(--site-header-offset,4rem)]",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Menu Container */}
      <div
        className={cn(
          "fixed left-0 right-0 z-50 bg-white shadow-2xl transition-opacity duration-200 ease-in-out",
          "top-[var(--site-header-offset,4rem)] max-h-[calc(100dvh-var(--site-header-offset,4rem)-env(safe-area-inset-bottom,0px))] overflow-hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "flex w-full min-h-0 flex-col bg-white",
            "max-h-[inherit] overflow-y-auto overscroll-y-contain lg:max-h-none lg:h-[min(480px,min(90vh,720px))] lg:flex-row lg:overflow-hidden",
            "px-3 pb-6 pt-3 sm:px-4 sm:pt-4 lg:pl-[46px] lg:pr-[80px] lg:pb-0 lg:pt-0",
          )}
        >
          {/* Categories: horizontal scroll phone/tablet; left column on large screens */}
          <div
            className={cn(
              "flex shrink-0 flex-col border-zinc-100 lg:w-[20%] lg:justify-center lg:border-b-0 lg:border-r lg:py-10",
              "border-b pb-3 sm:pb-4 lg:pb-0",
            )}
          >
            <nav
              className={cn(
                "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x lg:flex-col lg:space-y-2 lg:overflow-visible lg:pb-0 lg:touch-auto [&::-webkit-scrollbar]:hidden",
              )}
              aria-label={common.browse}
            >
              {menuData.categories.map((cat) => {
                const active = isCategoryActive(cat.href, pathname, categoryParam);
                return (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "shrink-0 rounded-md px-3 py-3 text-sm font-light tracking-[0.1em] transition-colors sm:px-4 lg:w-full lg:rounded-none lg:py-3 lg:pl-[46px] lg:pr-4",
                      "min-h-[44px] min-w-[44px] items-center touch-manipulation lg:min-h-0 lg:min-w-0",
                      active
                        ? "bg-gradient-to-r from-[#F6F1E9] to-transparent font-medium text-[#77080E]"
                        : "text-zinc-500 hover:text-[#77080E]",
                    )}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Gallery */}
          <div
            className={cn(
              "flex min-h-[200px] flex-1 flex-row items-stretch justify-start gap-3 overflow-x-auto overflow-y-hidden px-0 py-4 snap-x snap-mandatory sm:gap-4 sm:py-6 lg:items-center lg:justify-center lg:gap-6 lg:overflow-hidden lg:px-12 lg:py-12 lg:snap-none",
            )}
          >
            {menuData.gallery.map((item, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] h-[min(260px,42vh)] w-[40vw] shrink-0 snap-center overflow-hidden bg-zinc-50 grayscale transition-all duration-700 group hover:grayscale-0 sm:h-[min(280px,45vh)] sm:w-[34vw] lg:h-full lg:max-h-[400px] lg:w-auto lg:flex-1"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width:1024px) 40vw, 20vw"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={cn(
              "flex w-full shrink-0 items-stretch border-t border-zinc-100 pt-3 sm:pt-4 lg:w-[20%] lg:items-center lg:justify-end lg:border-l lg:border-t-0 lg:py-10 lg:pt-0",
            )}
          >
            <Link href={menuData.cta.href} onClick={onClose} className="w-full lg:w-auto">
              <Button
                variant="default"
                className="h-12 min-h-[48px] w-full touch-manipulation rounded-none bg-[#77080E] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#5A060A] hover:shadow-xl active:scale-95 lg:px-10"
              >
                {menuData.cta.label}
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#77080E]/10" />
      </div>
    </>
  );
}

export function MegaMenu(props: MegaMenuProps) {
  return (
    <Suspense fallback={null}>
      <MegaMenuInner {...props} />
    </Suspense>
  );
}
