"use client";

import { useCatalogState } from "@/state/catalog.state";

/** Catalog API facades; state calls `catalog.service`. */
export function useCatalog() {
  return useCatalogState();
}
