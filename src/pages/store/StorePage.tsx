import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { STORES } from "../../data/stores";
import { StoreCollectionPanel } from "./StoreCollectionPanel";
import { StoreGate } from "./StoreGate";
import { StoreHud } from "./StoreHud";
import { StoreScene } from "./StoreScene";
import { readStoreSession, writeStoreSession } from "./storeSession";
import "./store.css";

type StorePageProps = {
  storeId?: string | null;
  collectionOpen: boolean;
  onCollectionOpenChange: (open: boolean) => void;
  onBackToStores: () => void;
  onSelectProduct?: () => void;
};

export function StorePage({
  storeId,
  collectionOpen,
  onCollectionOpenChange,
  onBackToStores,
  onSelectProduct,
}: StorePageProps) {
  const store = useMemo(
    () => STORES.find((s) => s.id === storeId) ?? STORES[0],
    [storeId],
  );

  const [entered, setEntered] = useState(() => {
    const session = readStoreSession();
    return session?.storeId === (storeId ?? null) ? session.entered : false;
  });

  useEffect(() => {
    const session = readStoreSession();
    if (session?.storeId === (storeId ?? null)) {
      setEntered(session.entered);
    } else {
      setEntered(false);
    }
  }, [storeId]);

  useEffect(() => {
    writeStoreSession({ storeId: storeId ?? null, entered });
  }, [storeId, entered]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Escape") return;
      if (collectionOpen) {
        onCollectionOpenChange(false);
        return;
      }
      if (entered) setEntered(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [entered, collectionOpen, onCollectionOpenChange]);

  return (
    <main className="store-page" id="store" aria-label="Louve boutique visit">
      <div className={`store-page__canvas${entered ? " is-exploring" : ""}`}>
        <Canvas
          shadows
          camera={{ position: [0, 1.65, 7.2], fov: 60, near: 0.1, far: 60 }}
          gl={{ antialias: true, toneMappingExposure: 1.05 }}
        >
          <Suspense fallback={null}>
            <StoreScene exploring={entered} />
          </Suspense>
        </Canvas>
      </div>

      <StoreGate
        store={store}
        hidden={entered}
        onBackToStores={onBackToStores}
        onOpenCollection={() => onCollectionOpenChange(true)}
        onEnter={() => setEntered(true)}
      />

      {entered ? (
        <div className="store-unlock-tip" role="status">
          <span className="store-unlock-tip__key">Drag</span>
          <span>
            <strong>Drag</strong> to look · <strong>WASD</strong> to walk ·{" "}
            <strong>Esc</strong> for the menu
          </span>
        </div>
      ) : null}

      <StoreHud
        store={store}
        dimmed={!entered}
        onBackToStores={onBackToStores}
        onOpenCollection={() => onCollectionOpenChange(true)}
      />

      {collectionOpen ? (
        <StoreCollectionPanel
          onClose={() => onCollectionOpenChange(false)}
          onSelectProduct={onSelectProduct}
        />
      ) : null}
    </main>
  );
}
