export type GoldTone = {
  id: string;
  name: string;
  line: string;
  swatch: string;
  wash: string;
  filter: string;
  /** Colour for the metal name label */
  nameColor: string;
};

/** Louve metal temperaments for the homepage gold dial. */
export const GOLD_TONES: GoldTone[] = [
  {
    id: "rose-bloom",
    name: "Rose Bloom",
    line: "A flush of warmth — intimate, never loud.",
    swatch: "linear-gradient(160deg, #f0d0c4, #b87a6a)",
    wash: "rgba(212, 150, 140, 0.26)",
    filter: "sepia(0.38) saturate(1.2) hue-rotate(-28deg) brightness(1.02)",
    nameColor: "#b76e6a",
  },
  {
    id: "solar-flare",
    name: "Solar Flare",
    line: "High polish — gold that holds the room.",
    swatch: "linear-gradient(160deg, #ffe28a, #d4a010)",
    wash: "rgba(240, 200, 60, 0.32)",
    filter: "sepia(0.52) saturate(1.55) hue-rotate(8deg) brightness(1.15)",
    nameColor: "#c9a227",
  },
  {
    id: "arctic-white",
    name: "Arctic White",
    line: "Cool white gold for diamond-clear lines.",
    swatch: "linear-gradient(160deg, #f4f6f8, #a8b0bc)",
    wash: "rgba(180, 195, 215, 0.34)",
    filter: "grayscale(0.55) brightness(1.18) contrast(1.05) saturate(0.35)",
    nameColor: "#8a929c",
  },
];

export const GOLD_GALLERY = [
  {
    src: "/assets/collection/product-necklace.png",
    alt: "Gold necklace",
  },
  {
    src: "/assets/slides/s3-earrings-a.png",
    alt: "Gold earrings",
  },
  {
    src: "/assets/collection/product-bracelet.png",
    alt: "Gold bracelet",
  },
] as const;
