export const NAV_CATEGORIES = [
  { id: "rings", label: "Rings", image: "/assets/menu/rings.png" },
  { id: "earrings", label: "Earrings", image: "/assets/menu/earrings.png" },
  { id: "pendants", label: "Pendants", image: "/assets/slides/s6-col.png" },
  {
    id: "bracelets",
    label: "Bracelets",
    image: "/assets/slides/s5-detail-a.png",
  },
  {
    id: "engagement-rings",
    label: "Engagement Rings",
    image: "/assets/slides/s1-hero.png",
  },
  {
    id: "gemstones",
    label: "Gemstones",
    image: "/assets/slides/s3-earrings-d.png",
  },
] as const;

export type NavCategoryId = (typeof NAV_CATEGORIES)[number]["id"];
