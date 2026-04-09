import type { AppLocale } from "@/types/config";

/** Header language switcher options (native labels). */
export const LANGUAGE_OPTIONS: { locale: AppLocale; nativeLabel: string }[] = [
  { locale: "en", nativeLabel: "English" },
  { locale: "hi", nativeLabel: "हिन्दी" },
  { locale: "fr", nativeLabel: "Français" },
  { locale: "es", nativeLabel: "Español" },
];
