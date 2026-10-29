import type { StoreLocation } from "../../data/stores";

type StoreGateProps = {
  store: StoreLocation;
  hidden: boolean;
  onBackToStores: () => void;
  onOpenCollection: () => void;
  onEnter: () => void;
};

export function StoreGate({
  store,
  hidden,
  onBackToStores,
  onOpenCollection,
  onEnter,
}: StoreGateProps) {
  return (
    <div className={`store-gate${hidden ? " is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="store-gate__card">
        <p className="store-gate__eyebrow">{store.city} · Louve Maison</p>
        <h2 className="store-gate__title">
          Step inside
          <br />
          <em>{store.name}</em>
        </h2>
        <p className="store-gate__copy">
          Discover sculpted gold, luminous diamonds, and fine jewellery
          composed for everyday elegance — waiting quietly on every pedestal.
        </p>
        <div className="store-gate__actions">
          <button
            type="button"
            className="store-gate__link"
            onClick={onBackToStores}
          >
            Back to stores
          </button>
          <button
            type="button"
            className="store-gate__link"
            onClick={onOpenCollection}
          >
            View collection
          </button>
          <button
            type="button"
            id="store-enter"
            className="store-gate__cta"
            onClick={onEnter}
          >
            Enter the store
          </button>
        </div>
      </div>
    </div>
  );
}
