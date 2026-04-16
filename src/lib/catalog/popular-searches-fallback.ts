import type { PopularSearchCategoryDTO } from "@/types";

/**
 * Shown when `GET /api/v1/catalog/popular-searches` is missing, errors, or returns no rows.
 * Remove or narrow this once the API always returns merchandising data.
 */
export const POPULAR_SEARCHES_FALLBACK: PopularSearchCategoryDTO[] = [
  {
    categoryName: "For Women",
    links: [
      { label: "Demi-Fine Jewellery", query: "Demi-Fine Jewellery" },
      { label: "Rings For Women", query: "Rings For Women" },
      { label: "Earrings For Women", query: "Earrings For Women" },
      { label: "Bracelet For Women", query: "Bracelet For Women" },
      { label: "Pendants For Women", query: "Pendants For Women" },
      { label: "Necklaces For Women", query: "Necklaces For Women" },
    ],
  },
  {
    categoryName: "For Men",
    links: [
      { label: "Rings For Men", query: "Rings For Men" },
      { label: "Pendant For Men", query: "Pendant For Men" },
      { label: "Chain For Men", query: "Chain For Men" },
    ],
  },
  {
    categoryName: "Mangalsutra",
    links: [
      { label: "Gold Mangalsutra", query: "Gold Mangalsutra" },
      { label: "Diamond Mangalsutra", query: "Diamond Mangalsutra" },
      { label: "Infinity Mangalsutra", query: "Infinity Mangalsutra" },
    ],
  },
  {
    categoryName: "Pendants",
    links: [
      { label: "Gold Pendants", query: "Gold Pendants" },
      { label: "Diamond Pendants", query: "Diamond Pendants" },
      { label: "Solitaire Pendants", query: "Solitaire Pendants" },
      { label: "Evil Eye Pendants", query: "Evil Eye Pendants" },
    ],
  },
  {
    categoryName: "Bracelets",
    links: [
      { label: "Gold Bracelets", query: "Gold Bracelets" },
      { label: "Diamond Bracelets", query: "Diamond Bracelets" },
      { label: "Pearl Bracelets", query: "Pearl Bracelets" },
      { label: "Evil Eye Bracelets", query: "Evil Eye Bracelets" },
      { label: "Chain Bracelets", query: "Chain Bracelets" },
      { label: "Stone Bracelets", query: "Stone Bracelets" },
      { label: "Cuff Bracelets", query: "Cuff Bracelets" },
    ],
  },
  {
    categoryName: "Necklace",
    links: [
      { label: "Gold Necklace", query: "Gold Necklace" },
      { label: "Diamond Necklace", query: "Diamond Necklace" },
      { label: "Pearl Necklace", query: "Pearl Necklace" },
      { label: "Necklaces For Women", query: "Necklaces For Women" },
      { label: "Evil Eye Necklace", query: "Evil Eye Necklace" },
      { label: "Name Necklace", query: "Name Necklace" },
      { label: "Emerald Necklace", query: "Emerald Necklace" },
    ],
  },
  {
    categoryName: "Rings",
    links: [
      { label: "Diamond Rings", query: "Diamond Rings" },
      { label: "Gold Rings", query: "Gold Rings" },
      { label: "Silver Rings", query: "Silver Rings" },
      { label: "Solitaire Rings", query: "Solitaire Rings" },
      { label: "Gemstone Rings", query: "Gemstone Rings" },
      { label: "Mens Rings", query: "Mens Rings" },
      { label: "Engagement Ring", query: "Engagement Ring" },
      { label: "Couple Ring", query: "Couple Ring" },
      { label: "Wedding Ring", query: "Wedding Ring" },
      { label: "Statement Ring", query: "Statement Ring" },
      { label: "Emerald Ring", query: "Emerald Ring" },
    ],
  },
];
