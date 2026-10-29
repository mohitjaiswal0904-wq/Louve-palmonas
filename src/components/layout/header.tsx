import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ASSETS } from "../../data/assets";
import { NavOverlay } from "./NavOverlay";

export type HeaderScrolledFill = "transparent" | "white" | "pdp";

type HeaderProps = {
  onGoHome: () => void;
  onExploreCollection: () => void;
  /** Collection: glass white on scroll. PDP: white at top → clear glass while scrolling. */
  scrolledFill?: HeaderScrolledFill;
  /** PDP: slide header away while scrolling down; reveal on scroll up */
  hideOnScrollDown?: boolean;
};

export function Header({
  onGoHome,
  onExploreCollection,
  scrolledFill = "transparent",
  hideOnScrollDown = false,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  /** 0 at top → 1 after ~160px scroll; drives smooth header fade */
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    let frame = 0;
    let touchY = 0;
    let wheelIntent = 0;
    let lockUntil = 0;

    const updateFade = () => {
      frame = 0;
      const y = window.scrollY;
      const range = 160;
      const next = Math.min(1, Math.max(0, y / range));
      setScrollProgress((prev) =>
        Math.abs(prev - next) < 0.001 ? prev : next,
      );
      if (hideOnScrollDown && y <= 0) {
        wheelIntent = 0;
        setHeaderHidden(false);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFade);
    };

    /** Commit hide/show with a short lock so trackpads don’t jitter mid-animation */
    const commitHidden = (hidden: boolean) => {
      if (!hideOnScrollDown || menuOpenRef.current) return;
      const now = performance.now();
      if (now < lockUntil) return;
      setHeaderHidden((prev) => {
        if (prev === hidden) return prev;
        lockUntil = now + 420;
        wheelIntent = 0;
        return hidden;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      wheelIntent += e.deltaY;
      if (wheelIntent > 18) commitHidden(true);
      else if (wheelIntent < -18) commitHidden(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      wheelIntent = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      const delta = touchY - y;
      if (Math.abs(delta) < 4) return;
      commitHidden(delta > 0);
      touchY = y;
    };

    updateFade();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (hideOnScrollDown) {
      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    } else {
      setHeaderHidden(false);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hideOnScrollDown]);

  useEffect(() => {
    if (menuOpen) setHeaderHidden(false);
  }, [menuOpen]);

  useEffect(() => {
    const active = hideOnScrollDown && headerHidden && !menuOpen;
    document.documentElement.classList.toggle("pdp-header-hidden", active);
    return () => document.documentElement.classList.remove("pdp-header-hidden");
  }, [hideOnScrollDown, headerHidden, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const fade = menuOpen ? 0 : scrollProgress;

  return (
    <>
      <header
        className={`header${menuOpen ? " is-menu-open" : ""}${scrolledFill === "white" ? " header--fill-white" : ""}${scrolledFill === "pdp" ? " header--pdp" : ""}${headerHidden && !menuOpen ? " header--hidden" : ""}`}
        style={
          {
            "--header-fade": menuOpen ? "0" : String(fade),
          } as CSSProperties
        }
      >
        <div className="header__glow" aria-hidden="true" />
        <div className="header__inner">
          <button
            className={`header__menu${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="header__menu-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="header__brand">
            <a
              href="/"
              className="header__brand-link"
              aria-label="LOUVE home"
              onClick={(e) => {
                e.preventDefault();
                onGoHome();
              }}
            >
              <img
                className="header__logo"
                src={ASSETS.logo}
                alt="LOUVE Fine Jewellery Maison"
                width={180}
                height={180}
              />
            </a>
          </div>

          <div className="header__actions">
            <button className="header__icon" type="button" aria-label="Search">
              <img src={ASSETS.search} alt="" width={22} height={22} />
            </button>
            <button className="header__icon" type="button" aria-label="Wishlist">
              <img src={ASSETS.heart} alt="" width={22} height={22} />
            </button>
            <button
              className="header__icon header__icon--account"
              type="button"
              aria-label="Account"
            >
              <img src={ASSETS.user} alt="" width={22} height={22} />
            </button>
          </div>
        </div>
      </header>
      {/* Keeps layout when header switches sticky → fixed with menu open */}
      <div
        className={`header-spacer${menuOpen ? " is-active" : ""}`}
        aria-hidden="true"
      />

      <NavOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onExplore={() => {
          setMenuOpen(false);
          onExploreCollection();
        }}
      />
    </>
  );
}
