"use client";

import { useLocaleContext } from "@/state/locale-context";

/** UI copy for the active locale (from l10n). */
export function useMessages() {
  return useLocaleContext().messages;
}
