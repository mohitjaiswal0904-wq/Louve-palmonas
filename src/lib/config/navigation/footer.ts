export type FooterSection = {
  title: string;
  links: { key: string; label: string; href: string }[];
};

export const footerNav: FooterSection[] = [
  {
    title: "Company",
    links: [
      { key: "about", label: "About", href: "/about" },
      { key: "stores", label: "Stores", href: "/stores" },
      { key: "products", label: "Products", href: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { key: "contact", label: "Contact", href: "/contact" },
      { key: "shipping", label: "Shipping", href: "/shipping" },
      { key: "help", label: "Help", href: "/help" },
    ],
  },
];
