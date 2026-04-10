/** ISO-style codes we expect from catalog/checkout APIs (extend as needed). */
export type Currency = "INR" | "USD" | "EUR" | "GBP";

export type Money = {
  /** Decimal amount as string (API-safe); e.g. "1299.50" */
  amount: string;
  currency: Currency;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: Money;
};
