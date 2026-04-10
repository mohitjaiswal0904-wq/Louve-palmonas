import type { AppLocale } from "@/types/config";
import { localeHtmlLang } from "@/types/config";

/**
 * BCP 47 tags for `Intl` formatters. Tuned for Louve (India-first brand, multi-language UI).
 */
export const APP_LOCALE_TO_BCP47: Record<AppLocale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
  pt: "pt-BR",
  zh: "zh-CN",
  ar: "ar",
  ja: "ja-JP",
  ko: "ko-KR",
};

export function appLocaleToBcp47(locale: AppLocale): string {
  return APP_LOCALE_TO_BCP47[locale];
}

/**
 * Resolves a locale passed from UI (`AppLocale`) or an explicit BCP 47 string for `Intl`.
 */
export function resolveIntlLocale(locale: AppLocale | string): string {
  if (
    locale === "en" ||
    locale === "hi" ||
    locale === "fr" ||
    locale === "es" ||
    locale === "de" ||
    locale === "pt" ||
    locale === "zh" ||
    locale === "ar" ||
    locale === "ja" ||
    locale === "ko"
  ) {
    return APP_LOCALE_TO_BCP47[locale];
  }
  return locale;
}

/** Short HTML / attribute language tag (`lang`); differs from BCP 47 region. */
export function appLocaleToHtmlLang(locale: AppLocale): string {
  return localeHtmlLang(locale);
}
