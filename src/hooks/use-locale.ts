"use client";

import { useLocaleContext } from "@/state/locale-context";

export function useLocale() {
  const { locale, setLocale } = useLocaleContext();
  return { locale, setLocale };
}
