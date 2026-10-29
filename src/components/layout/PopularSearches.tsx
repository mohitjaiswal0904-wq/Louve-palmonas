import { ASSETS } from "../../data/assets";
import { POPULAR_SEARCHES } from "../../data/popularSearches";
import { slugify } from "../../lib/slugify";

export function PopularSearches() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img
            className="site-footer__logo"
            src={ASSETS.logo}
            alt="LOUVE"
            width={120}
            height={120}
          />
          <div className="site-footer__brand-copy">
            <p className="site-footer__eyebrow">Louve</p>
            <p className="site-footer__tagline">
              Fine jewellery shaped by instinct, light, and quiet craft.
            </p>
          </div>
        </div>

        <div className="site-footer__searches">
          <h2 className="site-footer__heading" id="footer-heading">
            Popular Searches
          </h2>
          <ul className="site-footer__grid">
            {POPULAR_SEARCHES.map((row) => (
              <li className="site-footer__col" key={row.label}>
                <p className="site-footer__label">{row.label}</p>
                <ul className="site-footer__links">
                  {row.links.map((link) => (
                    <li key={link}>
                      <a href={`#${slugify(link)}`}>{link}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__copy">
            © {year} Louve. All rights reserved.
          </p>
          <nav className="site-footer__legal" aria-label="Footer">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#stores">Stores</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
