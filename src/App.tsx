import { lazy, Suspense, useEffect } from "react";
import { useLouveRouter } from "./app/useLouveRouter";
import { ensureDemoAccount } from "./lib/account";
import { Header } from "./components/layout/Header";
import { PopularSearches } from "./components/layout/PopularSearches";
import { AccountPage } from "./pages/account/AccountPage";
import { CollectionPage } from "./pages/collection/CollectionPage";
import { HomePage } from "./pages/home/HomePage";
import { PdpPage } from "./pages/pdp/PdpPage";
import { StoreListPage } from "./pages/store/StoreListPage";

const StorePage = lazy(() =>
  import("./pages/store/StorePage").then((m) => ({ default: m.StorePage })),
);

export default function App() {
  const {
    view,
    storeId,
    storeCollectionOpen,
    goHome,
    goCollection,
    goPdp,
    productId,
    goStores,
    goAccount,
    goStore,
    goPdpFromStoreCollection,
    syncStoreCollection,
  } = useLouveRouter();

  useEffect(() => {
    void ensureDemoAccount();
  }, []);

  const immersive = view === "store";

  return (
    <div className={`page${immersive ? " page--store" : ""}`}>
      <Header
        onGoHome={goHome}
        onExploreCollection={goCollection}
        onOpenProduct={goPdp}
        onOpenAccount={goAccount}
        scrolledFill={view === "pdp" ? "pdp" : "white"}
        hideOnScrollDown={view === "pdp"}
      />
      {view === "home" ? (
        <HomePage onExplore={goCollection} />
      ) : view === "collection" ? (
        <CollectionPage onSelectProduct={goPdp} />
      ) : view === "stores" ? (
        <StoreListPage onSelectStore={goStore} onBack={() => goPdp()} />
      ) : view === "store" ? (
        <Suspense fallback={<div className="store-page" aria-busy="true" />}>
          <StorePage
            storeId={storeId}
            collectionOpen={storeCollectionOpen}
            onCollectionOpenChange={syncStoreCollection}
            onBackToStores={goStores}
            onSelectProduct={goPdpFromStoreCollection}
          />
        </Suspense>
      ) : view === "account" ? (
        <AccountPage onOpenProduct={goPdp} />
      ) : (
        <PdpPage productId={productId} onVisitStore={goStores} />
      )}
      {immersive ? null : <PopularSearches />}
    </div>
  );
}
