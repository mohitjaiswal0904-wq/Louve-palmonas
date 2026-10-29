const IMG = {
  necklace: "/assets/collection/product-necklace.png",
  ring: "/assets/collection/product-ring.png",
  bracelet: "/assets/collection/product-bracelet.png",
  studs: "/assets/collection/product-studs.png",
  feature: "/assets/collection/feature-detail.png",
  lifestyle: "/assets/collection/lifestyle.png",
  pendant: "/assets/slides/s4-pendant.png",
  earringsA: "/assets/slides/s3-earrings-a.png",
  earringsB: "/assets/slides/s3-earrings-b.png",
  earringsC: "/assets/slides/s3-earrings-c.png",
  gallery1: "/assets/pdp/gallery-1.png",
  gallery2: "/assets/pdp/gallery-2.png",
  gallery3: "/assets/pdp/gallery-3.png",
  hero: "/assets/pdp/hero.png",
} as const;

export const COLLECTION = {
  images: IMG,
  pageSize: 16,
  intro: {
    title: "Golden Orbs",
    copy: "Sculpted spheres in warm gold — a quiet statement for every day and every ritual.",
  },
  feature: {
    title: "Golden Orbs",
    copy: "Hand-finished orbs on a fluid chain, made to catch light without asking for attention.",
    cta: "See All Designs",
  },
} as const;

export type CollectionProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
};

export type FeatureTile = {
  type: "feature";
  id: string;
};

export type LifestyleTile = {
  type: "lifestyle";
  id: string;
};

export type ProductTile = {
  type: "product";
  id: string;
  product: CollectionProduct;
};

export type CollectionTile = ProductTile | FeatureTile | LifestyleTile;

export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: "golden-orbs",
    name: "Golden Orbs Necklace",
    price: "₹1,84,200",
    image: IMG.necklace,
    alt: "Gold necklace with sculpted orbs",
  },
  {
    id: "serenity-ring",
    name: "Serenity Gem Ring",
    price: "₹96,450",
    image: IMG.ring,
    alt: "Lavender gemstone ring",
  },
  {
    id: "verdant-cuff",
    name: "Verdant Chain Bracelet",
    price: "₹1,12,800",
    image: IMG.bracelet,
    alt: "Gold chain bracelet with green gem",
  },
  {
    id: "soleil-studs",
    name: "Soleil Citrine Studs",
    price: "₹64,900",
    image: IMG.studs,
    alt: "Citrine stud earrings",
  },
  {
    id: "twist-wave",
    name: "Twist Wave Mangalsutra",
    price: "₹2,27,725",
    image: IMG.hero,
    alt: "Twist wave mangalsutra",
  },
  {
    id: "atelier-drop",
    name: "Atelier Drop Earrings",
    price: "₹1,48,600",
    image: IMG.earringsA,
    alt: "Drop earrings in yellow gold",
  },
  {
    id: "nocturne-pendant",
    name: "Nocturne Pendant",
    price: "₹1,29,400",
    image: IMG.pendant,
    alt: "Gold pendant on fine chain",
  },
  {
    id: "aurelia-hoops",
    name: "Aurelia Cascade Hoops",
    price: "₹1,56,900",
    image: IMG.earringsB,
    alt: "Cascade gold hoop earrings",
  },
  {
    id: "mirror-wave",
    name: "Mirror Wave Necklace",
    price: "₹2,04,500",
    image: IMG.gallery1,
    alt: "Mirror wave gold necklace",
  },
  {
    id: "luminescence",
    name: "Luminescence Ear Cuffs",
    price: "₹88,250",
    image: IMG.gallery2,
    alt: "Gold ear cuffs",
  },
  {
    id: "obsidian-link",
    name: "Obsidian Link Chain",
    price: "₹1,67,300",
    image: IMG.gallery3,
    alt: "Link chain necklace",
  },
  {
    id: "petal-studs",
    name: "Petal Diamond Studs",
    price: "₹72,400",
    image: IMG.earringsC,
    alt: "Petal diamond stud earrings",
  },
  {
    id: "rivulet-collar",
    name: "Rivulet Collar",
    price: "₹2,18,900",
    image: IMG.necklace,
    alt: "Gold rivulet collar necklace",
  },
  {
    id: "heritage-band",
    name: "Heritage Signet Band",
    price: "₹84,600",
    image: IMG.ring,
    alt: "Gold signet band",
  },
  {
    id: "dawn-chime",
    name: "Dawn Chime Earrings",
    price: "₹1,02,150",
    image: IMG.earringsA,
    alt: "Chime drop earrings",
  },
  {
    id: "sable-strand",
    name: "Sable Strand Mangalsutra",
    price: "₹1,95,400",
    image: IMG.hero,
    alt: "Sable strand mangalsutra",
  },
  {
    id: "ivory-coil",
    name: "Ivory Coil Bracelet",
    price: "₹1,08,350",
    image: IMG.bracelet,
    alt: "Coil bracelet in rose gold",
  },
  {
    id: "noir-orb",
    name: "Noir Orb Necklace",
    price: "₹1,76,600",
    image: IMG.necklace,
    alt: "Noir orb necklace",
  },
  {
    id: "violet-solitaire",
    name: "Violet Solitaire Ring",
    price: "₹1,14,900",
    image: IMG.ring,
    alt: "Violet solitaire ring",
  },
  {
    id: "citrine-halo",
    name: "Citrine Halo Studs",
    price: "₹69,750",
    image: IMG.studs,
    alt: "Citrine halo stud earrings",
  },
  {
    id: "celeste-drop",
    name: "Celeste Drop Earrings",
    price: "₹1,39,800",
    image: IMG.earringsB,
    alt: "Celeste drop earrings",
  },
  {
    id: "gilded-arc",
    name: "Gilded Arc Bracelet",
    price: "₹1,18,750",
    image: IMG.bracelet,
    alt: "Gilded arc bracelet",
  },
  {
    id: "lumen-brooch",
    name: "Lumen Brooch Pendant",
    price: "₹1,24,800",
    image: IMG.pendant,
    alt: "Lumen brooch pendant",
  },
  {
    id: "atelier-frame",
    name: "Atelier Frame Ring",
    price: "₹91,200",
    image: IMG.ring,
    alt: "Atelier frame ring",
  },
  {
    id: "solar-line",
    name: "Solar Line Necklace",
    price: "₹1,62,400",
    image: IMG.gallery1,
    alt: "Solar line necklace",
  },
  {
    id: "whisper-hoops",
    name: "Whisper Thin Hoops",
    price: "₹58,900",
    image: IMG.earringsC,
    alt: "Thin gold hoops",
  },
  {
    id: "ember-cuff",
    name: "Ember Open Cuff",
    price: "₹1,21,300",
    image: IMG.bracelet,
    alt: "Open gold cuff bracelet",
  },
  {
    id: "pearl-orbit",
    name: "Pearl Orbit Studs",
    price: "₹76,800",
    image: IMG.studs,
    alt: "Pearl orbit stud earrings",
  },
  {
    id: "cascade-collar",
    name: "Cascade Collar",
    price: "₹2,35,000",
    image: IMG.necklace,
    alt: "Cascade gold collar",
  },
  {
    id: "moonlit-band",
    name: "Moonlit Stack Band",
    price: "₹79,450",
    image: IMG.ring,
    alt: "Moonlit stackable band",
  },
  {
    id: "aurora-drops",
    name: "Aurora Drop Earrings",
    price: "₹1,33,600",
    image: IMG.earringsA,
    alt: "Aurora drop earrings",
  },
  {
    id: "ink-bead",
    name: "Ink Bead Mangalsutra",
    price: "₹2,08,900",
    image: IMG.hero,
    alt: "Ink bead mangalsutra",
  },
  {
    id: "flare-pendant",
    name: "Flare Disc Pendant",
    price: "₹98,200",
    image: IMG.pendant,
    alt: "Flare disc pendant",
  },
  {
    id: "silk-link",
    name: "Silk Link Bracelet",
    price: "₹1,05,700",
    image: IMG.bracelet,
    alt: "Silk link bracelet",
  },
  {
    id: "halo-ring",
    name: "Halo Embrace Ring",
    price: "₹1,42,500",
    image: IMG.ring,
    alt: "Halo embrace ring",
  },
  {
    id: "starlight-studs",
    name: "Starlight Studs",
    price: "₹67,300",
    image: IMG.studs,
    alt: "Starlight stud earrings",
  },
];

/** Build one page of tiles. Page 1 includes editorial feature + lifestyle inserts. */
export function getCollectionPageTiles(page: number): CollectionTile[] {
  const size = COLLECTION.pageSize;
  const start = (page - 1) * size;
  const slice = COLLECTION_PRODUCTS.slice(start, start + size);

  const products: ProductTile[] = slice.map((product) => ({
    type: "product",
    id: product.id,
    product,
  }));

  if (page !== 1 || products.length === 0) return products;

  // Insert feature after first row (3 cards), lifestyle mid-page
  const tiles: CollectionTile[] = [...products];
  tiles.splice(3, 0, { type: "feature", id: "feature" });
  if (tiles.length >= 10) {
    tiles.splice(10, 0, { type: "lifestyle", id: "lifestyle" });
  } else {
    tiles.push({ type: "lifestyle", id: "lifestyle" });
  }
  return tiles;
}

export function getCollectionPageCount(): number {
  return Math.max(1, Math.ceil(COLLECTION_PRODUCTS.length / COLLECTION.pageSize));
}
