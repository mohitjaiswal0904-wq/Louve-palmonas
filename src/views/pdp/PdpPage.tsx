import { useEffect, useState } from "react";
import { resolvePdpProduct } from "../../data/pdpProduct";
import {
  PRODUCT,
  type ProductSize,
  type ProductTab,
} from "../../data/product";
import {
  isInWishlist,
  toggleWishlistItem,
  WISHLIST_EVENT,
} from "../../lib/wishlist";
import { ExpertConsultModal } from "./ExpertConsultModal";
import { PdpUsps } from "./PdpUsps";
import "./pdp.css";

export function PdpPage({
  productId = null,
  onVisitStore,
}: {
  productId?: string | null;
  onVisitStore?: () => void;
}) {
  const product = resolvePdpProduct(productId);
  const gallery =
    product.id === PRODUCT.id ? PRODUCT.gallery : [product.image, ...PRODUCT.gallery.slice(1)];
  const [metal, setMetal] = useState(1);
  const [size, setSize] = useState<ProductSize>(7);
  const [tab, setTab] = useState<ProductTab>("Product Details");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [expertOpen, setExpertOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));

  useEffect(() => {
    const sync = () => setWishlisted(isInWishlist(product.id));
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [product.id]);

  const onToggleWishlist = () => {
    const saved = toggleWishlistItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metalLabel: PRODUCT.metals[metal].label,
      size,
    });
    setWishlisted(saved);
  };

  return (
    <main className="pdp" id="product">
      <section
        className={`pdp-stage${activeImage !== null ? " is-hovering" : ""}`}
        aria-label="Product gallery"
        onMouseLeave={() => setActiveImage(null)}
      >
        {gallery.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`pdp-stage__item${activeImage === i ? " is-expanded" : ""}`}
            aria-label={`${product.name} view ${i + 1}`}
            onMouseEnter={() => setActiveImage(i)}
            onFocus={() => setActiveImage(i)}
            onClick={() =>
              setActiveImage((prev) => (prev === i ? null : i))
            }
          >
            <img
              src={src}
              alt={`${product.name} — view ${i + 1}`}
              width={1000}
              height={1000}
            />
          </button>
        ))}
      </section>

      <section className="pdp-buy" aria-label="Product overview">
        <div className="pdp-buy__left">
          <h1 className="editorial-title pdp-title">
            <span>{product.name}</span>
            {product.metalLine ? <em>{product.metalLine}</em> : null}
            {product.subtitle ? (
              <span className="pdp-title__sub">{product.subtitle}</span>
            ) : null}
          </h1>

          <a className="pdp-more" href="#pdp-details">
            View craftsmanship details
          </a>

          <div className="pdp-field">
            <div className="pdp-field__head">
              <span className="pdp-field__label">Metal</span>
              <span className="pdp-field__value">
                {PRODUCT.metals[metal].label}
              </span>
            </div>
            <div className="pdp-metals" role="radiogroup" aria-label="Metal colour">
              {PRODUCT.metals.map((m, i) => (
                <button
                  key={m.label}
                  type="button"
                  className={`pdp-metals__swatch${metal === i ? " is-active" : ""}`}
                  role="radio"
                  aria-checked={metal === i}
                  aria-label={m.label}
                  onClick={() => setMetal(i)}
                >
                  <img src={m.src} alt="" width={36} height={36} />
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-field">
            <div className="pdp-field__head">
              <span className="pdp-field__label">Size (US)</span>
            </div>
            <div className="pdp-sizes__options" role="radiogroup" aria-label="Size">
              {PRODUCT.sizes.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`pdp-sizes__btn${size === n ? " is-active" : ""}`}
                  role="radio"
                  aria-checked={size === n}
                  onClick={() => setSize(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pdp-buy__right">
          <div className="pdp-hero__price">
            <span className="pdp-hero__amount">{product.price}</span>
            <span className="pdp-hero__tax">Inclusive of all taxes</span>
          </div>

          <div className="pdp-actions">
            <button
              type="button"
              className={`pdp-wishlist${wishlisted ? " is-saved" : ""}`}
              aria-pressed={wishlisted}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              onClick={onToggleWishlist}
            >
              <svg
                className="pdp-wishlist__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </button>
            <button
              type="button"
              className="pdp-actions__btn pdp-actions__btn--secondary"
              onClick={onVisitStore}
            >
              Visit Store
            </button>
            <button
              type="button"
              className="pdp-actions__btn pdp-actions__btn--primary"
              onClick={() => setExpertOpen(true)}
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      <section
        className="pdp-details"
        id="pdp-details"
        aria-label="Product information"
      >
        <header className="pdp-details__intro">
          <h2 className="editorial-title pdp-details__title">
            <span>Crafted</span>
            <em>with intention</em>
          </h2>
        </header>

        <div className="pdp-tabs" role="tablist" aria-label="Product information">
          {PRODUCT.tabs.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              id={`tab-${name}`}
              aria-selected={tab === name}
              aria-controls="pdp-tab-panel"
              className={`pdp-tabs__tab${tab === name ? " is-active" : ""}`}
              onClick={() => setTab(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div
          className="pdp-panel"
          role="tabpanel"
          id="pdp-tab-panel"
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "Product Details" ? (
            <div className="pdp-specs">
              {PRODUCT.detailColumns.map((col) => (
                <div className="pdp-specs__col" key={col.title}>
                  <div className="pdp-specs__heading">
                    <h3>{col.title}</h3>
                    {"guide" in col && col.guide ? (
                      <a className="pdp-specs__guide" href="#diamond-guide">
                        Diamond Guide
                      </a>
                    ) : null}
                  </div>
                  <dl className="pdp-specs__list">
                    {col.rows.map(([label, value]) => (
                      <div className="pdp-specs__row" key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Price Details" ? (
            <dl className="pdp-price-table">
              {PRODUCT.priceRows.map(([label, value]) => (
                <div
                  className={`pdp-price-table__row${label === "Total" ? " is-total" : ""}`}
                  key={label}
                >
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {tab === "Description" ? (
            <p className="pdp-prose">{PRODUCT.description}</p>
          ) : null}

          {tab === "Shipping" ? (
            <p className="pdp-prose">{PRODUCT.shipping}</p>
          ) : null}

          {tab === "Returns" ? (
            <p className="pdp-prose">{PRODUCT.returns}</p>
          ) : null}
        </div>

        <PdpUsps />
      </section>

      <ExpertConsultModal
        open={expertOpen}
        onClose={() => setExpertOpen(false)}
        onVisitStore={onVisitStore}
        product={{
          name: product.name,
          metalLabel: PRODUCT.metals[metal].label,
          size,
          price: product.price,
          image: product.image,
        }}
      />
    </main>
  );
}
