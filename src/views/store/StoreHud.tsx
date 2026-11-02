import type { StoreLocation } from "../../data/stores";

type StoreHudProps = {
  store: StoreLocation;
  dimmed: boolean;
  onBackToStores: () => void;
  onOpenCollection: () => void;
};

export function StoreHud({
  store,
  dimmed,
  onBackToStores,
  onOpenCollection,
}: StoreHudProps) {
  return (
    <div className={`store-hud${dimmed ? " is-dimmed" : ""}`}>
      <div className="store-hud__top">
        <div className="store-hud__brand">
          <p className="store-hud__eyebrow">Visit store</p>
          <h1 className="store-hud__title">
            {store.city}
            <br />
            <em>{store.name}</em>
          </h1>
        </div>
        <p className="store-hud__hint">
          Your cursor stays free — drag on the store to look, click CTAs anytime.
        </p>
      </div>

      <div className="store-hud__bottom">
        <div className="store-hud__keys">
          <span className="store-hud__key">W</span>
          <span className="store-hud__key">A</span>
          <span className="store-hud__key">S</span>
          <span className="store-hud__key">D</span>
          <span className="store-hud__key">Shift</span>
          <span className="store-hud__key">Drag</span>
        </div>
        <div className="store-hud__actions">
          <button type="button" className="store-hud__btn" onClick={onBackToStores}>
            Back to stores
          </button>
          <button
            type="button"
            className="store-hud__btn store-hud__btn--primary"
            onClick={onOpenCollection}
          >
            View collection
          </button>
        </div>
      </div>
    </div>
  );
}
