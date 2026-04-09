export type SidebarNavLink = {
  key: string;
  label: string;
  href?: string;
  /** Nested navigation (opens another panel on hover). */
  children?: SidebarNavLink[];
};

export const sidebarNav: SidebarNavLink[] = [
  { key: "home", label: "Home", href: "/" },
  {
    key: "collections",
    label: "Collections",
    children: [
      { key: "collections-all", label: "All collections", href: "/collections" },
      {
        key: "collections-core",
        label: "Core Gold Essentials",
        href: "/collections#core-gold-essentials",
      },
      {
        key: "collections-diamond",
        label: "Diamond Staples",
        href: "/collections#diamond-staples",
      },
      {
        key: "collections-occasion",
        label: "Occasion Pieces",
        href: "/collections#occasion-pieces",
      },
      {
        key: "collections-signature",
        label: "Signature Louve Designs",
        href: "/collections#signature-louve-designs",
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    children: [
      { key: "products-all", label: "All products", href: "/products" },
      {
        key: "products-category",
        label: "Categories",
        children: [
          { key: "products-rings", label: "Rings", href: "/products?category=rings" },
          { key: "products-earrings", label: "Earrings", href: "/products?category=earrings" },
          {
            key: "products-necklaces",
            label: "Necklaces",
            href: "/products?category=necklaces",
          },
        ],
      },
      {
        key: "products-sample",
        label: "Sample product (placeholder)",
        href: "/products/sample-product",
      },
    ],
  },
  { key: "about", label: "About", href: "/about" },
  { key: "stores", label: "Stores", href: "/stores" },
  { key: "contact", label: "Contact", href: "/contact" },
  { key: "shipping", label: "Shipping", href: "/shipping" },
];
