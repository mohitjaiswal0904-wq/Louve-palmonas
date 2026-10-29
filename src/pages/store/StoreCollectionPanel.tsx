import { STORE_PRODUCTS } from "../../data/storeProducts";

type StoreCollectionPanelProps = {
  onClose: () => void;
  onSelectProduct?: (productId: string) => void;
};

export function StoreCollectionPanel({
  onClose,
  onSelectProduct,
}: StoreCollectionPanelProps) {
  return (
    <div
      className="store-collection"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-collection-title"
    >
      <button
        type="button"
        className="store-collection__backdrop glass-panel__backdrop"
        aria-label="Close collection"
        onClick={onClose}
      />
      <div className="store-collection__panel glass-panel">
        <header className="store-collection__head">
          <div>
            <p className="store-collection__eyebrow louve-eyebrow">In this maison</p>
            <h2 id="store-collection-title" className="store-collection__title">
              The collection
            </h2>
          </div>
          <button
            type="button"
            className="store-collection__close glass-panel__close"
            onClick={onClose}
          >
            Close
          </button>
        </header>
        <ul className="store-collection__grid">
          {STORE_PRODUCTS.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                className="store-collection__card"
                onClick={() => onSelectProduct?.(product.id)}
              >
                <span className="store-collection__media">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={320}
                  />
                </span>
                <span className="store-collection__meta">
                  <span className="store-collection__name">{product.name}</span>
                  <span className="store-collection__metal">{product.metal}</span>
                  <span className="store-collection__price">{product.price}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
