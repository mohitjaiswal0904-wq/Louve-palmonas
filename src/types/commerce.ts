export type Currency = "INR" | "USD";

export type Money = {
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
