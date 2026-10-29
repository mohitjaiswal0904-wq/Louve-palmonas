export type View = "home" | "collection" | "pdp" | "stores" | "store";

export type NavigateOptions = {
  storeId?: string | null;
  /** Keep the store glass collection panel open */
  collection?: boolean;
  replace?: boolean;
};

export function viewFromLocation(): View {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("view");
  if (q === "collection" || q === "plp") return "collection";
  if (q === "pdp" || q === "product") return "pdp";
  if (q === "stores") return "stores";
  if (q === "store") return "store";
  return "home";
}

export function pathForView(
  view: View,
  storeId?: string | null,
  options?: { collection?: boolean },
): string {
  if (view === "collection") return "/?view=collection";
  if (view === "pdp") return "/?view=pdp";
  if (view === "stores") return "/?view=stores";
  if (view === "store") {
    const params = new URLSearchParams({ view: "store" });
    if (storeId) params.set("store", storeId);
    if (options?.collection) params.set("collection", "1");
    return `/?${params.toString()}`;
  }
  return "/";
}

export function storeIdFromLocation(): string | null {
  return new URLSearchParams(window.location.search).get("store");
}

export function storeCollectionFromLocation(): boolean {
  return new URLSearchParams(window.location.search).get("collection") === "1";
}
