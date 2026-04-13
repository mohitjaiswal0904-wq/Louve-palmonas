"use client";

import { usePathname } from "next/navigation";

import { Footer } from "./footer";
import { PopularSearchesSection } from "./popular-searches-section";

/**
 * PDP and products index render `PopularSearchesSection` inside the page column; skip the layout
 * copy on those routes to avoid duplicates.
 */
const PRODUCT_DETAIL_PATH = /^\/products\/[^/]+\/?$/;
const PRODUCTS_INDEX_PATH = /^\/products\/?$/;

export function SiteLayoutFooter() {
  const pathname = usePathname() ?? "";
  const hidePopularSearches =
    PRODUCT_DETAIL_PATH.test(pathname) || PRODUCTS_INDEX_PATH.test(pathname);

  return (
    <>
      {!hidePopularSearches && <PopularSearchesSection />}
      <Footer />
    </>
  );
}
