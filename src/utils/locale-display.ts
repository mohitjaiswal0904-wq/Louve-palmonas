import type { AppLocale } from "@/types/config";
import { localeHtmlLang } from "@/types/config";

import { appLocaleToBcp47, resolveIntlLocale } from "./locale";

/**
 * Language name suitable for UI lists (native or localized), e.g. "English", "français".
 */
export function displayLanguageName(
  language: AppLocale,
  displayLocale: AppLocale | string,
  displayType: "standard" | "dialect" = "standard",
): string {
  const intl = new Intl.DisplayNames([resolveIntlLocale(displayLocale)], {
    type: "language",
    languageDisplay: displayType,
  });
  return intl.of(localeHtmlLang(language)) ?? language;
}

/**
 * Currency name for tooltips / accessibility (localized).
 */
export function displayCurrencyName(
  currencyCode: string,
  displayLocale: AppLocale | string,
): string {
  const intl = new Intl.DisplayNames([resolveIntlLocale(displayLocale)], {
    type: "currency",
  });
  return intl.of(currencyCode) ?? currencyCode;
}

/**
 * Region / country name (when you have ISO 3166-1 alpha-2 codes).
 */
export function displayRegionName(
  regionCode: string,
  displayLocale: AppLocale | string,
): string {
  const intl = new Intl.DisplayNames([resolveIntlLocale(displayLocale)], {
    type: "region",
  });
  return intl.of(regionCode.toUpperCase()) ?? regionCode;
}

/**
 * Lists plural rules index for a key (advanced; useful with message catalogs).
 */
export function pluralRulesForLocale(locale: AppLocale): Intl.PluralRules {
  return new Intl.PluralRules(appLocaleToBcp47(locale));
}

/**
 * Chooses a branch key for simple ICU-style plural buckets: `zero | one | two | few | many | other`.
 */
export function selectPluralCategory(
  n: number,
  locale: AppLocale,
): ReturnType<Intl.PluralRules["select"]> {
  return pluralRulesForLocale(locale).select(n);
}
