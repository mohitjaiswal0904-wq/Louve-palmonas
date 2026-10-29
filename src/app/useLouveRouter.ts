import { useCallback, useEffect, useState } from "react";
import {
  pathForView,
  productIdFromLocation,
  storeCollectionFromLocation,
  storeIdFromLocation,
  viewFromLocation,
  type NavigateOptions,
  type View,
} from "./navigation";
import { clearStoreSession } from "../pages/store/storeSession";

export function useLouveRouter() {
  const [view, setView] = useState<View>(() => viewFromLocation());
  const [storeId, setStoreId] = useState<string | null>(() =>
    storeIdFromLocation(),
  );
  const [storeCollectionOpen, setStoreCollectionOpen] = useState(() =>
    storeCollectionFromLocation(),
  );
  const [productId, setProductId] = useState<string | null>(() =>
    productIdFromLocation(),
  );

  const navigate = useCallback(
    (next: View, options?: NavigateOptions) => {
      const nextStoreId =
        next === "store"
          ? (options?.storeId ?? storeId)
          : next === "stores"
            ? null
            : storeId;

      setView(next);
      if (next === "pdp") {
        setProductId(options?.productId ?? productId);
      }
      if (next === "store") {
        setStoreId(nextStoreId ?? null);
        setStoreCollectionOpen(!!options?.collection);
      } else if (next === "stores") {
        setStoreId(null);
        setStoreCollectionOpen(false);
        clearStoreSession();
      } else if (next !== "pdp") {
        setStoreCollectionOpen(false);
      }

      const id = next === "store" ? nextStoreId : null;
      const nextPath = pathForView(next, id, {
        collection: next === "store" ? !!options?.collection : false,
        productId:
          next === "pdp" ? (options?.productId ?? productId) : null,
      });
      const current = `${window.location.pathname}${window.location.search}`;
      if (current !== nextPath) {
        const target = `${nextPath}${window.location.hash}`;
        if (options?.replace) {
          window.history.replaceState(null, "", target);
        } else {
          window.history.pushState(null, "", target);
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [storeId, productId],
  );

  useEffect(() => {
    const onPop = () => {
      setView(viewFromLocation());
      setStoreId(storeIdFromLocation());
      setStoreCollectionOpen(storeCollectionFromLocation());
      setProductId(productIdFromLocation());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goHome = useCallback(() => navigate("home"), [navigate]);
  const goCollection = useCallback(() => navigate("collection"), [navigate]);
  const goPdp = useCallback(
    (id?: string) => navigate("pdp", { productId: id ?? productId }),
    [navigate, productId],
  );
  const goStores = useCallback(() => navigate("stores"), [navigate]);
  const goAccount = useCallback(() => navigate("account"), [navigate]);
  const goStore = useCallback(
    (id: string) => navigate("store", { storeId: id, collection: false }),
    [navigate],
  );

  const goPdpFromStoreCollection = useCallback(
    (id?: string) => {
      const storePath = pathForView("store", storeId, { collection: true });
      const current = `${window.location.pathname}${window.location.search}`;
      if (current !== storePath) {
        window.history.replaceState(null, "", storePath);
      }
      setStoreCollectionOpen(true);
      navigate("pdp", { productId: id ?? productId });
    },
    [navigate, storeId, productId],
  );

  const syncStoreCollection = useCallback(
    (open: boolean) => {
      setStoreCollectionOpen(open);
      const nextPath = pathForView("store", storeId, { collection: open });
      const current = `${window.location.pathname}${window.location.search}`;
      if (current !== nextPath) {
        window.history.replaceState(null, "", nextPath);
      }
    },
    [storeId],
  );

  return {
    view,
    storeId,
    productId,
    storeCollectionOpen,
    goHome,
    goCollection,
    goPdp,
    goStores,
    goAccount,
    goStore,
    goPdpFromStoreCollection,
    syncStoreCollection,
  };
}
