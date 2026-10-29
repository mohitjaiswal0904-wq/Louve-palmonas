import { useEffect } from "react";
import {
  getWishlist,
  removeWishlistItem,
  type WishlistItem,
} from "../../lib/wishlist";
import "./wishlist.css";

type WishlistPanelProps = {
  open: boolean;
  items: WishlistItem[];
  onClose: () => void;
  onChange: () => void;
  onSelectProduct?: (productId: string) => void;
};

export function WishlistPanel({
  open,
  items,
  onClose,
  onChange,
  onSelectProduct,
}: WishlistPanelProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="wishlist" role="dialog" aria-modal="true" aria-label="Wishlist">
      <button
        type="button"
        className="wishlist__backdrop"
        aria-label="Close wishlist"
        onClick={onClose}
      />
      <aside className="wishlist__panel">
        <header className="wishlist__head">
          <div>
            <p className="wishlist__eyebrow">Louve</p>
            <h2 className="wishlist__title">Wishlist</h2>
          </div>
          <button
            type="button"
            className="wishlist__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <p className="wishlist__empty">
            Your wishlist is empty. Save a piece from the product page to keep it
            close.
          </p>
        ) : (
          <ul className="wishlist__list">
            {items.map((item) => (
              <li className="wishlist__item" key={item.id}>
                <button
                  type="button"
                  className="wishlist__product"
                  onClick={() => {
                    onClose();
                    onSelectProduct?.(item.id);
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    width={72}
                    height={72}
                  />
                  <span className="wishlist__meta">
                    <span className="wishlist__name">{item.name}</span>
                    {(item.metalLabel || item.size) && (
                      <span className="wishlist__line">
                        {[item.metalLabel, item.size ? `Size ${item.size}` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                    <span className="wishlist__price">{item.price}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="wishlist__remove"
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => {
                    removeWishlistItem(item.id);
                    onChange();
                    // Keep panel in sync if parent passes stale items
                    void getWishlist();
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
