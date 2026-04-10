"use client";

import { Languages } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLocale, useMessages } from "@/hooks";
import { LANGUAGE_OPTIONS } from "@/lib/config/languages";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const m = useMessages();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={m.common.language}
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "shrink-0")}
      >
        <Languages className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LANGUAGE_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.locale}
            onClick={() => void setLocale(opt.locale)}
            data-state={locale === opt.locale ? "active" : undefined}
            className={locale === opt.locale ? "font-medium" : undefined}
          >
            {opt.nativeLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
