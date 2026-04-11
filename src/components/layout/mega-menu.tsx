"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useMessages } from "@/hooks";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const { navigation } = useMessages();
  const menuData = navigation.megaMenu;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 bg-black/20 backdrop-blur-md transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu Container */}
      <div
        className={cn(
          "fixed left-0 right-0 top-16 z-50 bg-white shadow-2xl transition-opacity duration-200 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex h-[480px] w-full flex-row bg-white pl-[46px] pr-[80px]">
          {/* Left Column: Categories */}
          <div className="flex w-[20%] flex-col justify-center border-r border-zinc-50 py-10">
            <nav className="flex flex-col space-y-2">
              {menuData.categories.map((cat, idx) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={onClose}
                  style={idx === 0 ? {
                    background: "linear-gradient(to right, #F6F1E9, #FFFFFF00)"
                  } : undefined}
                  className={cn(
                    "w-full py-3 pl-[46px] text-sm font-light tracking-[0.1em] transition-colors hover:text-[#77080E]",
                    idx === 0
                      ? "font-medium text-zinc-900"
                      : "text-zinc-500"
                  )}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center Column: Gallery */}
          <div className="flex flex-1 items-center justify-center gap-6 px-12 py-12">
            {menuData.gallery.map((item, i) => (
              <div key={i} className="relative aspect-[3/4] h-full overflow-hidden bg-zinc-50 grayscale hover:grayscale-0 transition-all duration-700 group">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="20vw"
                />
              </div>
            ))}
          </div>

          {/* Right Column: Explore More */}
          <div className="flex w-[20%] items-center justify-end border-l border-zinc-50">
            <Link href={menuData.cta.href} onClick={onClose}>
              <Button
                variant="default"
                className="h-12 rounded-none bg-[#77080E] px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#5A060A] hover:shadow-xl active:scale-95"
              >
                {menuData.cta.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="h-0.5 w-full bg-[#77080E]/10" />
      </div>
    </>
  );
}
