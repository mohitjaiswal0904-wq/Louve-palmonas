"use client";

import { useLocaleState } from "@/state/locale.state";

export function useLocale() {
  const { locale, setLocale } = useLocaleState();
  return { locale, setLocale };
}
