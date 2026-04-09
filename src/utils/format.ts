import type { AppLocale } from "@/types/config";
import type { Money } from "@/types/commerce";

import { CURRENCY_DECIMALS, parseMoneyAmount } from "./money-core";
import { resolveIntlLocale } from "./locale";

export type FormatMoneyOptions = {
  locale: AppLocale | string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  /** Force currency display (default: from money.currency) */
  currency?: Money["currency"];
};

/**
 * Locale-aware money formatting (symbol + grouping) using `Intl.NumberFormat`.
 */
export function formatMoney(money: Money, options: FormatMoneyOptions): string {
  const locale = resolveIntlLocale(options.locale);
  const currency = options.currency ?? money.currency;
  const digits = CURRENCY_DECIMALS[currency];
  const min =
    options.minimumFractionDigits ?? digits;
  const max = options.maximumFractionDigits ?? digits;
  const n = parseMoneyAmount(money.amount);
  if (!Number.isFinite(n)) return money.amount;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(n);
}

export function formatNumber(
  value: number,
  locale: AppLocale | string,
  options?: Intl.NumberFormatOptions,
): string {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat(resolveIntlLocale(locale), options).format(value);
}

export function formatInteger(
  value: number,
  locale: AppLocale | string,
): string {
  return formatNumber(value, locale, {
    maximumFractionDigits: 0,
  });
}

export function formatPercent(
  value: number,
  locale: AppLocale | string,
  options?: Intl.NumberFormatOptions,
): string {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat(resolveIntlLocale(locale), {
    style: "percent",
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export function formatDate(
  input: Date | number | string,
  locale: AppLocale | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(resolveIntlLocale(locale), options).format(d);
}

export function formatTime(
  input: Date | number | string,
  locale: AppLocale | string,
  options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  },
): string {
  return formatDate(input, locale, options);
}

const UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
  { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
  { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
  { unit: "day", ms: 1000 * 60 * 60 * 24 },
  { unit: "hour", ms: 1000 * 60 * 60 },
  { unit: "minute", ms: 1000 * 60 },
  { unit: "second", ms: 1000 },
];

/**
 * Locale-aware relative time ("2 days ago", "in 3 hours") via `Intl.RelativeTimeFormat`.
 */
export function formatRelativeTime(
  date: Date,
  locale: AppLocale | string,
  now: Date = new Date(),
): string {
  const diffMs = date.getTime() - now.getTime();
  const abs = Math.abs(diffMs);
  const rtl = new Intl.RelativeTimeFormat(resolveIntlLocale(locale), {
    numeric: "auto",
  });

  for (const { unit, ms } of UNITS) {
    if (abs >= ms || unit === "second") {
      const v = Math.round(diffMs / ms);
      return rtl.format(v, unit);
    }
  }
  return rtl.format(0, "second");
}

/**
 * @deprecated Use `formatRelativeTime(date, locale)` for locale-aware strings.
 * English-only shorthand kept for quick call sites.
 */
export function formatRelativeTimeEn(date: Date, now: Date = new Date()): string {
  return formatRelativeTime(date, "en", now);
}
