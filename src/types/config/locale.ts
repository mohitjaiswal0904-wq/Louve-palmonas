export const APP_LOCALES = ["en", "hi", "fr", "es", "de", "pt", "zh", "ar", "ja", "ko"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_COOKIE = "LOUVE_LOCALE";

/** Folder names under `src/lib/l10n/`. */
export const LOCALE_TO_FOLDER: Record<AppLocale, string> = {
  en: "English",
  hi: "Hindi",
  fr: "French",
  es: "Spanish",
  de: "German",
  pt: "Portuguese",
  zh: "Chinese",
  ar: "Arabic",
  ja: "Japanese",
  ko: "Korean",
};

export function isLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && APP_LOCALES.includes(value as AppLocale);
}

export function localeHtmlLang(locale: AppLocale): string {
  const map: Record<AppLocale, string> = {
    en: "en",
    hi: "hi",
    fr: "fr",
    es: "es",
    de: "de",
    pt: "pt",
    zh: "zh-Hans",
    ar: "ar",
    ja: "ja",
    ko: "ko",
  };
  return map[locale];
}
