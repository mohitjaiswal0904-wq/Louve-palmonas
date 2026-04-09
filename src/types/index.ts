export type Currency = "INR";

export interface Money {
  currency: Currency;
  amount: number;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  title: string;
  subtitle?: string;
  price: Money;
  imageUrl?: string;
}
