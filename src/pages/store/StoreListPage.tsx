import { STORES } from "../../data/stores";
import "./store-list.css";

export function StoreListPage({
  onSelectStore,
  onBack,
}: {
  onSelectStore: (storeId: string) => void;
  onBack: () => void;
}) {
  return (
    <main className="store-list" id="stores" aria-label="Louve store locations">
      <section className="store-list__hero" aria-label="Maisons introduction">
        <div className="store-list__hero-copy">
          <img
            className="store-list__brand"
            src="/assets/louve-wolf.png"
            alt="Louve"
            width={280}
            height={208}
          />
          <div className="store-list__hero-rule" aria-hidden="true">
            <span />
            <img src="/assets/star.svg" alt="" width={10} height={10} />
            <span />
          </div>
          <p className="store-list__eyebrow">Maisons across India</p>
          <h1 className="editorial-title store-list__title">
            <span>Step into a</span>
            <em>quiet house</em>
            <span>of gold.</span>
          </h1>
          <p className="store-list__lede">
            Fine jewellery boutiques in Mumbai, Delhi, Bengaluru, and Jaipur —
            sculpted gold and diamonds, ready to try on.
          </p>
          <a className="store-list__hero-scroll" href="#store-directory">
            Explore the houses
          </a>
        </div>
      </section>

      <section
        className="store-list__directory"
        id="store-directory"
        aria-label="Store directory"
      >
        <ul className="store-list__rows">
          {STORES.map((store, i) => (
            <li key={store.id}>
              <button
                type="button"
                className={`store-row${i % 2 === 1 ? " store-row--flip" : ""}`}
                onClick={() => onSelectStore(store.id)}
              >
                <span className="store-row__media">
                  <img
                    src={store.image}
                    alt={store.imageAlt}
                    width={720}
                    height={520}
                  />
                </span>
                <span className="store-row__body">
                  <span className="store-row__city">{store.city}</span>
                  <span className="store-row__name">{store.name}</span>
                  <span className="store-row__address">{store.address}</span>
                  <span className="store-row__meta">
                    <span className="store-row__hours">{store.hours}</span>
                    <span className="store-row__note">{store.note}</span>
                  </span>
                  <span className="store-row__cta">
                    Enter this maison
                    <span className="store-row__cta-line" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="store-list__footer">
        <button type="button" className="store-list__back" onClick={onBack}>
          Back to product
        </button>
      </div>
    </main>
  );
}
