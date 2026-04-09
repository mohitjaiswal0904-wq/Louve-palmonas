import type { Currency, Money } from "@/types/commerce";

/** ISO 4217 minor units (fraction digits) for formatting and rounding. */
export const CURRENCY_DECIMALS: Record<Currency, number> = {
  INR: 2,
  USD: 2,
  EUR: 2,
  GBP: 2,
};

export function parseMoneyAmount(amount: string): number {
  const n = Number.parseFloat(amount.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function roundToCurrencyDecimals(value: number, currency: Currency): number {
  const d = CURRENCY_DECIMALS[currency];
  const m = 10 ** d;
  const n = Math.round((value + Number.EPSILON) * m) / m;
  return Object.is(n, -0) ? 0 : n;
}

export function moneyFromNumber(amount: number, currency: Currency): Money {
  const d = CURRENCY_DECIMALS[currency];
  const rounded = roundToCurrencyDecimals(amount, currency);
  return {
    amount: rounded.toFixed(d),
    currency,
  };
}

export function addMoney(a: Money, b: Money): Money | null {
  if (a.currency !== b.currency) return null;
  const sum =
    parseMoneyAmount(a.amount) + parseMoneyAmount(b.amount);
  if (!Number.isFinite(sum)) return null;
  return moneyFromNumber(sum, a.currency);
}

export function subtractMoney(a: Money, b: Money): Money | null {
  if (a.currency !== b.currency) return null;
  const diff = parseMoneyAmount(a.amount) - parseMoneyAmount(b.amount);
  if (!Number.isFinite(diff)) return null;
  return moneyFromNumber(diff, a.currency);
}
