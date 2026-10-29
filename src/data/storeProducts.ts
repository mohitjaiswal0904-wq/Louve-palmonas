export type StoreProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  metal: string;
};

/** Curated boutique shelf — keep focused for the store popup. */
export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "twist-wave",
    name: "Twist Wave Mangalsutra",
    price: "₹2,27,725",
    image: "/assets/pdp/hero.png",
    metal: "9KT Yellow Gold",
  },
  {
    id: "golden-orbs",
    name: "Golden Orbs Necklace",
    price: "₹1,84,200",
    image: "/assets/collection/product-necklace.png",
    metal: "18KT Yellow Gold",
  },
  {
    id: "serenity-ring",
    name: "Serenity Gem Ring",
    price: "₹96,450",
    image: "/assets/collection/product-ring.png",
    metal: "14KT Rose Gold",
  },
  {
    id: "verdant-cuff",
    name: "Verdant Chain Bracelet",
    price: "₹1,12,800",
    image: "/assets/collection/product-bracelet.png",
    metal: "18KT Yellow Gold",
  },
  {
    id: "soleil-studs",
    name: "Soleil Citrine Studs",
    price: "₹64,900",
    image: "/assets/collection/product-studs.png",
    metal: "9KT Yellow Gold",
  },
  {
    id: "atelier-drop",
    name: "Atelier Drop Earrings",
    price: "₹1,48,600",
    image: "/assets/slides/s3-earrings-a.png",
    metal: "18KT White Gold",
  },
  {
    id: "nocturne-pendant",
    name: "Nocturne Pendant",
    price: "₹1,29,400",
    image: "/assets/slides/s4-pendant.png",
    metal: "14KT Yellow Gold",
  },
  {
    id: "aurelia-hoops",
    name: "Aurelia Cascade Hoops",
    price: "₹1,56,900",
    image: "/assets/slides/s3-earrings-b.png",
    metal: "18KT Yellow Gold",
  },
];
