import type { AppLocale } from "@/types/config";

/** Header language switcher options (native labels). */
export const LANGUAGE_OPTIONS: { locale: AppLocale; nativeLabel: string }[] = [
  { locale: "en", nativeLabel: "English" },
  { locale: "hi", nativeLabel: "हिन्दी" },
  { locale: "fr", nativeLabel: "Français" },
  { locale: "es", nativeLabel: "Español" },
  { locale: "de", nativeLabel: "Deutsch" },
  { locale: "pt", nativeLabel: "Português" },
  { locale: "zh", nativeLabel: "中文" },
  { locale: "ar", nativeLabel: "العربية" },
  { locale: "ja", nativeLabel: "日本語" },
  { locale: "ko", nativeLabel: "한국어" },
];
