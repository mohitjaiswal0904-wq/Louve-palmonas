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
            "max-h-[inherit] overflow-y-auto overscroll-y-contain",
            "md:max-xl:max-h-none md:max-xl:h-[min(480px,min(90vh,720px))] md:max-xl:overflow-hidden",
            "xl:max-h-none xl:h-[min(480px,min(90vh,720px))] xl:overflow-hidden",
            "md:max-xl:flex-row",
            "xl:flex-row",
            "px-3 pb-6 pt-3 sm:px-4 sm:pt-4 md:max-xl:pb-0 md:max-xl:pt-0 xl:pb-0 xl:pt-0",
            "md:max-xl:px-8 md:max-xl:pt-6",
            "xl:pl-[46px] xl:pr-[80px]",
          )}
        >
          {/* Categories: horizontal scroll phone; left column md–xl (iPad + iPad Pro) and xl+ (desktop) */}
          <div
            className={cn(
              "flex shrink-0 flex-col border-zinc-100",
              "border-b pb-3 sm:pb-4",
              "md:max-xl:w-[28%] md:max-xl:justify-start md:max-xl:border-b-0 md:max-xl:border-r md:max-xl:py-8",
              "xl:w-[20%] xl:justify-center xl:border-b-0 xl:border-r xl:py-10",
            )}
          >
            <nav
              className={cn(
                "flex gap-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x [&::-webkit-scrollbar]:hidden",
                "max-md:overflow-x-auto",
                "md:flex-col md:gap-2 md:space-y-2 md:overflow-visible md:pb-0 md:touch-auto",
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
                      "shrink-0 whitespace-nowrap px-6 py-4 text-[15.43px] font-[400] tracking-tight transition-colors",
                      active ? "bg-[#F6F1E9] text-[#1F1F1F]" : "text-[#1F1F1F] hover:text-[#1F1F1F]",
                      "md:rounded-md md:px-3 md:py-3 md:text-sm md:font-light md:tracking-[0.1em] md:px-4",
                      "md:min-h-[44px] md:min-w-[44px] md:items-center md:touch-manipulation",
                      active
                        ? "md:bg-gradient-to-r md:from-[#F6F1E9] md:to-transparent md:font-medium md:text-[#77080E]"
                        : "md:text-zinc-500 md:hover:text-[#77080E]",
                      active &&
                        "md:max-xl:!bg-[#F6F1E9] md:max-xl:text-[#1F1F1F]",
                      "md:max-xl:w-full md:max-xl:rounded-md md:max-xl:px-4 md:max-xl:py-3",
                      "xl:w-full xl:rounded-none xl:py-3 xl:pl-[46px] xl:pr-4 xl:min-h-0 xl:min-w-0",
                    )}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Gallery + CTA: stacked on mobile; md–xl = iPad + iPad Pro row; xl:contents = desktop 3-column */}
          <div
            className={cn(
              "flex min-h-0 w-full min-w-0 flex-col",
              "md:max-xl:flex-1 md:max-xl:min-h-0",
              "xl:contents",
            )}
          >
            {/* Gallery */}
            <div
              className={cn(
                "grid grid-cols-3 gap-4 px-0 py-6",
                "md:max-xl:grid md:max-xl:flex-none md:max-xl:grid-cols-3 md:max-xl:gap-3 md:max-xl:overflow-visible md:max-xl:px-0 md:max-xl:py-4",
                "xl:flex xl:flex-1 xl:flex-row xl:items-center xl:justify-center xl:gap-6 xl:overflow-hidden xl:px-12 xl:py-12 xl:snap-none",
              )}
            >
              {menuData.gallery.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 grayscale transition-all duration-700 hover:grayscale-0",
                    "md:max-xl:aspect-[3/4] md:max-xl:h-auto md:max-xl:max-h-[min(320px,36vh)] md:max-xl:w-full md:max-xl:min-h-0",
                    "xl:h-full xl:max-h-[400px] xl:w-auto xl:flex-1",
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
                "flex w-full shrink-0 items-stretch justify-center pt-4",
                "md:max-xl:w-full md:max-xl:justify-center md:max-xl:border-0 md:max-xl:border-t md:max-xl:border-zinc-100 md:max-xl:pt-5",
                "xl:w-[20%] xl:shrink-0 xl:items-center xl:justify-end xl:border-l xl:border-t-0 xl:border-zinc-100 xl:py-10 xl:pt-0",
              )}
            >
              <Link
                href={menuData.cta.href}
                onClick={onClose}
                className={cn(
                  "inline-flex w-auto justify-center",
                  "md:flex md:w-full",
                  "md:max-xl:justify-center",
                  "xl:block xl:w-auto",
                )}
              >
                <Button
                  variant="default"
                  className={cn(
                    "h-12 min-h-[48px] w-auto max-w-[220px] touch-manipulation rounded-none bg-[#710B11] px-6 text-[14px] font-medium tracking-normal text-white transition-all hover:bg-[#5A060A] hover:shadow-xl active:scale-95",
                    "md:max-xl:max-w-[220px] md:max-xl:px-8 md:max-xl:text-[10px] md:max-xl:font-bold md:max-xl:uppercase md:max-xl:tracking-[0.2em]",
                    "xl:max-w-none xl:w-full xl:px-10",
                  )}
                >
                  {menuData.cta.label}
                </Button>
              </Link>
            </div>
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
