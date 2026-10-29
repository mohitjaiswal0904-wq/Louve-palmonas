import { useState } from "react";
import {
  NAV_CATEGORIES,
  type NavCategoryId,
} from "../../data/navCategories";

type NavOverlayProps = {
  open: boolean;
  onClose: () => void;
  onExplore: () => void;
};

export function NavOverlay({ open, onClose, onExplore }: NavOverlayProps) {
  const [active, setActive] = useState<NavCategoryId>("rings");
  const current =
    NAV_CATEGORIES.find((c) => c.id === active) ?? NAV_CATEGORIES[0];

  return (
    <div
      className={`nav-overlay${open ? " is-open" : ""}`}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Collections menu"
      aria-hidden={!open}
    >
      <button
        className="nav-overlay__backdrop"
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div className="nav-overlay__panel">
        <div className="nav-overlay__body">
          <nav className="nav-overlay__cats" aria-label="Categories">
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`nav-overlay__cat${active === cat.id ? " is-active" : ""}`}
                onMouseEnter={() => setActive(cat.id)}
                onFocus={() => setActive(cat.id)}
                onClick={() => setActive(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <div className="nav-overlay__gallery" key={current.id}>
            {[0, 1, 2].map((i) => (
              <div className="nav-overlay__thumb" key={i}>
                <img
                  src={current.image}
                  alt={`${current.label} look ${i + 1}`}
                  width={291}
                  height={360}
                />
              </div>
            ))}
          </div>

          <a
            className="nav-overlay__cta"
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
          >
            Explore More
          </a>
        </div>
      </div>
    </div>
  );
}
