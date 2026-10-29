import { useEffect, useMemo, useState } from "react";
import {
  COLLECTION,
  getCollectionPageCount,
  getCollectionPageTiles,
} from "../../data/collection";
import "./collection.css";

/** Keeps bleed tiles the same size as product cards (image + meta). */
function CardSizer() {
  return (
    <div className="collection-card__sizer" aria-hidden="true">
      <div className="collection-card__media" />
      <div className="collection-card__meta">
        <p className="collection-card__name">Product name</p>
        <p className="collection-card__price">₹0</p>
      </div>
    </div>
  );
}

type CollectionPageProps = {
  onSelectProduct: () => void;
};

export function CollectionPage({ onSelectProduct }: CollectionPageProps) {
  const { images, intro, feature } = COLLECTION;
  const pageCount = getCollectionPageCount();
  const [page, setPage] = useState(1);

  const tiles = useMemo(() => getCollectionPageTiles(page), [page]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const goToPage = (next: number) => {
    const clamped = Math.min(pageCount, Math.max(1, next));
    setPage(clamped);
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageNumbers = useMemo(() => {
    const nums: number[] = [];
    for (let i = 1; i <= pageCount; i += 1) nums.push(i);
    return nums;
  }, [pageCount]);

  return (
    <main className="collection" id="collection">
      <header className="collection__intro">
        <h1 className="editorial-title editorial-title--inline">{intro.title}</h1>
        <p>{intro.copy}</p>
      </header>

      <div className="collection__grid" role="list" key={page}>
        {tiles.map((tile) => {
          if (tile.type === "feature") {
            return (
              <article
                className="collection-card collection-card--bleed"
                key={tile.id}
                role="listitem"
              >
                <CardSizer />
                <div className="collection-feature">
                  <div className="collection-feature__copy">
                    <h2>{feature.title}</h2>
                    <p>{feature.copy}</p>
                    <button
                      type="button"
                      className="collection-feature__cta"
                      onClick={() => goToPage(1)}
                    >
                      {feature.cta}
                    </button>
                  </div>
                  <img
                    className="collection-feature__media"
                    src={images.feature}
                    alt=""
                    aria-hidden="true"
                    width={640}
                    height={640}
                  />
                </div>
              </article>
            );
          }

          if (tile.type === "lifestyle") {
            return (
              <article
                className="collection-card collection-card--bleed"
                key={tile.id}
                role="listitem"
              >
                <CardSizer />
                <figure className="collection-lifestyle">
                  <img
                    src={images.lifestyle}
                    alt="Golden Orbs Collection"
                    width={640}
                    height={640}
                  />
                </figure>
              </article>
            );
          }

          const { product } = tile;
          return (
            <article className="collection-card" key={tile.id} role="listitem">
              <button
                type="button"
                className="collection-card__button"
                onClick={onSelectProduct}
                aria-label={`${product.name}, ${product.price}`}
              >
                <div className="collection-card__media">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={640}
                    height={640}
                  />
                </div>
                <div className="collection-card__meta">
                  <p className="collection-card__name">{product.name}</p>
                  <p className="collection-card__price">{product.price}</p>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {pageCount > 1 ? (
        <nav
          className="collection-pagination"
          aria-label="Collection pages"
        >
          <button
            type="button"
            className="collection-pagination__nav"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            Prev
          </button>

          <div className="collection-pagination__pages" role="list">
            {pageNumbers.map((n) => (
              <button
                key={n}
                type="button"
                role="listitem"
                className={`collection-pagination__page${n === page ? " is-active" : ""}`}
                onClick={() => goToPage(n)}
                aria-label={`Page ${n}`}
                aria-current={n === page ? "page" : undefined}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="collection-pagination__nav"
            onClick={() => goToPage(page + 1)}
            disabled={page >= pageCount}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      ) : null}
    </main>
  );
}
