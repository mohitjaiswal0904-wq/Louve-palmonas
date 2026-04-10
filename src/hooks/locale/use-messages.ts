"use client";

import { useLocaleState } from "@/state/locale.state";

export function useMessages() {
  return useLocaleState().messages;
}
