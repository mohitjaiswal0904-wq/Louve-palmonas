export type View = "home" | "collection" | "pdp" | "stores" | "store" | "account";

export type NavigateOptions = {
  storeId?: string | null;
  productId?: string | null;
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
  if (q === "account" || q === "login") return "account";
  if (q === "store") return "store";
  return "home";
}

export function pathForView(
  view: View,
  storeId?: string | null,
  options?: { collection?: boolean; productId?: string | null },
): string {
  if (view === "collection") return "/?view=collection";
  if (view === "pdp") {
    const params = new URLSearchParams({ view: "pdp" });
    if (options?.productId) params.set("product", options.productId);
    return `/?${params.toString()}`;
  }
  if (view === "stores") return "/?view=stores";
  if (view === "account") return "/?view=account";
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

export function productIdFromLocation(): string | null {
  return new URLSearchParams(window.location.search).get("product");
}

export function storeCollectionFromLocation(): boolean {
  return new URLSearchParams(window.location.search).get("collection") === "1";
}
