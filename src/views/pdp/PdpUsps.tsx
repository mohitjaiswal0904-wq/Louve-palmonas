import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PRODUCT } from "../../data/product";

export function PdpUsps() {
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <aside
      ref={rootRef}
      className={`pdp-usps${visible ? " is-visible" : ""}`}
      aria-label="Louve assurances"
    >
      <header className="pdp-usps__intro">
        <p className="pdp-usps__eyebrow">The Louve promise</p>
        <h3 className="editorial-title pdp-usps__heading">
          <span>Quietly</span>
          <em>assured</em>
        </h3>
      </header>

      <div className="pdp-usps__stage">
        <div className="pdp-usps__frame" aria-hidden="true">
          <span className="pdp-usps__corner pdp-usps__corner--tl">
            <i className="pdp-usps__corner-h" />
            <i className="pdp-usps__corner-v" />
          </span>
          <span className="pdp-usps__corner pdp-usps__corner--tr">
            <i className="pdp-usps__corner-h" />
            <i className="pdp-usps__corner-v" />
          </span>
          <span className="pdp-usps__corner pdp-usps__corner--bl">
            <i className="pdp-usps__corner-h" />
            <i className="pdp-usps__corner-v" />
          </span>
          <span className="pdp-usps__corner pdp-usps__corner--br">
            <i className="pdp-usps__corner-h" />
            <i className="pdp-usps__corner-v" />
          </span>
        </div>
        <div className="pdp-usps__glow" aria-hidden="true" />
        <ul className="pdp-usps__list">
          {PRODUCT.usps.map((item, i) => (
            <li
              className="pdp-usps__item"
              key={item.title}
              style={{ "--usp-i": i } as CSSProperties}
            >
              <span className="pdp-usps__medallion" aria-hidden="true">
                <span className="pdp-usps__ring" />
                <span className="pdp-usps__icon">
                  <img src={item.src} alt="" width={36} height={36} />
                </span>
              </span>
              <span className="pdp-usps__copy">
                <span className="pdp-usps__title">{item.title}</span>
                <span className="pdp-usps__note">{item.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
