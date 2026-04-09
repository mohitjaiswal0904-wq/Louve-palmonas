import type { Currency, Money } from "@/types/commerce";

import { moneyFromNumber, parseMoneyAmount, roundToCurrencyDecimals } from "./money-core";

export { CURRENCY_DECIMALS } from "./money-core";

/**
 * Static FX pivot: INR per 1 unit of each currency (placeholder values).
 * Replace with `services` + API-backed snapshot in production.
 *
 * Example: `INR_PER_UNIT.USD === 83` means 1 USD → 83 INR.
 */
export const INR_PER_UNIT: Record<Currency, number> = {
  INR: 1,
  USD: 83,
  EUR: 90,
  GBP: 105,
};

export type FxSnapshot = {
  /** ISO date the rates correspond to (for UI footnotes). */
  asOf: string;
  /** INR per 1 unit of `currency` (same shape as `INR_PER_UNIT`). */
  inrPerUnit: Record<Currency, number>;
};

export const FALLBACK_FX_SNAPSHOT: FxSnapshot = {
  asOf: "2026-04-01",
  inrPerUnit: { ...INR_PER_UNIT },
};

/**
 * Converts a scalar amount from `from` to `to` using INR as pivot.
 */
export function convertCurrencyAmount(
  amount: number,
  from: Currency,
  to: Currency,
  snapshot: FxSnapshot = FALLBACK_FX_SNAPSHOT,
): number {
  if (!Number.isFinite(amount)) return NaN;
  if (from === to) return amount;
  const { inrPerUnit } = snapshot;
  const inr = amount * inrPerUnit[from];
  return inr / inrPerUnit[to];
}

/**
 * Converts `Money` to another currency; rounds to minor units of `target`.
 */
export function convertMoney(
  money: Money,
  target: Currency,
  snapshot: FxSnapshot = FALLBACK_FX_SNAPSHOT,
): Money {
  const n = parseMoneyAmount(money.amount);
  const converted = convertCurrencyAmount(n, money.currency, target, snapshot);
  return moneyFromNumber(converted, target);
}

/**
 * Returns a human-readable approximation label (for disclaimers).
 */
export function fxRateLabel(
  from: Currency,
  to: Currency,
  snapshot: FxSnapshot = FALLBACK_FX_SNAPSHOT,
): string {
  if (from === to) return `1 ${from} = 1 ${to}`;
  const one = convertCurrencyAmount(1, from, to, snapshot);
  const rounded = roundToCurrencyDecimals(one, to);
  return `1 ${from} ≈ ${rounded} ${to}`;
}
