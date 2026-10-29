import { lazy, Suspense } from "react";
import { useLouveRouter } from "./app/useLouveRouter";
import { Header } from "./components/layout/Header";
import { PopularSearches } from "./components/layout/PopularSearches";
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
    goStores,
    goStore,
    goPdpFromStoreCollection,
    syncStoreCollection,
  } = useLouveRouter();

  const immersive = view === "store";

  return (
    <div className={`page${immersive ? " page--store" : ""}`}>
      <Header
        onGoHome={goHome}
        onExploreCollection={goCollection}
        scrolledFill={view === "pdp" ? "pdp" : "white"}
        hideOnScrollDown={view === "pdp"}
      />
      {view === "home" ? (
        <HomePage onExplore={goCollection} />
      ) : view === "collection" ? (
        <CollectionPage onSelectProduct={goPdp} />
      ) : view === "stores" ? (
        <StoreListPage onSelectStore={goStore} onBack={goPdp} />
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
      ) : (
        <PdpPage onVisitStore={goStores} />
      )}
      {immersive ? null : <PopularSearches />}
    </div>
  );
}
