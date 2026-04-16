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
                // Mobile: flat horizontal list (matches reference)
                "flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x [&::-webkit-scrollbar]:hidden",
                // iPad/desktop: keep existing behavior
                "md:gap-2 md:pb-1",
                "lg:flex-col lg:space-y-2 lg:overflow-visible lg:pb-0 lg:touch-auto",
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
                      // Mobile: flat tabs
                      "shrink-0 whitespace-nowrap px-6 py-4 text-[15.43px] font-[400] tracking-tight transition-colors",
                      active ? "bg-[#F6F1E9] text-[#1F1F1F]" : "text-[#1F1F1F] hover:text-[#1F1F1F]",

                      // iPad: keep existing pill styles
                      "md:rounded-md md:px-3 md:py-3 md:text-sm md:font-light md:tracking-[0.1em] sm:md:px-4",
                      "md:min-h-[44px] md:min-w-[44px] md:items-center md:touch-manipulation",
                      active
                        ? "md:bg-gradient-to-r md:from-[#F6F1E9] md:to-transparent md:font-medium md:text-[#77080E]"
                        : "md:text-zinc-500 md:hover:text-[#77080E]",

                      // Desktop: existing left-column styles
                      "lg:w-full lg:rounded-none lg:py-3 lg:pl-[46px] lg:pr-4 lg:min-h-0 lg:min-w-0",
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
              // Mobile: 3-column grid like reference
              "grid grid-cols-3 gap-4 px-0 py-6",
              // iPad: keep current horizontal carousel
              "md:flex md:min-h-[200px] md:flex-1 md:flex-row md:items-stretch md:justify-start md:gap-3 md:overflow-x-auto md:overflow-y-hidden md:py-4 md:snap-x md:snap-mandatory sm:md:gap-4 sm:md:py-6",
              // Desktop
              "lg:items-center lg:justify-center lg:gap-6 lg:overflow-hidden lg:px-12 lg:py-12 lg:snap-none",
            )}
          >
            {menuData.gallery.map((item, i) => (
              <div
                key={i}
                className={cn(
                  // Mobile grid cell
                  "group relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 grayscale transition-all duration-700 hover:grayscale-0",
                  // iPad carousel cell (existing)
                  "md:h-[min(260px,42vh)] md:w-[40vw] md:shrink-0 md:snap-center sm:md:h-[min(280px,45vh)] sm:md:w-[34vw]",
                  // Desktop sizing (existing)
                  "lg:h-full lg:max-h-[400px] lg:w-auto lg:flex-1",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 767px) 33vw, (max-width:1024px) 40vw, 20vw"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={cn(
              // Mobile: centered button under grid
              "flex w-full shrink-0 items-stretch justify-center pt-4",
              // iPad/desktop: keep existing right panel
              "md:border-t md:border-zinc-100 md:pt-3 sm:md:pt-4",
              "lg:w-[20%] lg:items-center lg:justify-end lg:border-l lg:border-t-0 lg:py-10 lg:pt-0",
            )}
          >
            <Link
              href={menuData.cta.href}
              onClick={onClose}
              className="flex w-full justify-center md:block md:w-full lg:w-auto"
            >
              <Button
                variant="default"
                className={cn(
                  // Mobile: match reference button sizing
                  "h-12 min-h-[48px] w-full max-w-[220px] touch-manipulation rounded-none bg-[#77080E] px-6 text-[14px] font-medium tracking-normal text-white transition-all hover:bg-[#5A060A] hover:shadow-xl active:scale-95",
                  // iPad/desktop: existing styling
                  "md:max-w-none md:w-full md:px-6 md:text-[10px] md:font-bold md:uppercase md:tracking-[0.2em] lg:px-10",
                )}
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
