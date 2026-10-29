import { Cta } from "../../components/ui/Cta";
import { EditorialTitle } from "../../components/ui/EditorialTitle";
import { HOME_TRIPTYCH } from "../../data/home";
import { GoldSpectrum } from "./GoldSpectrum";
import "./home.css";

type HomePageProps = {
  onExplore: () => void;
};

/**
 * Homepage design (Figma 335:2116) — real copy + Vintage Wine CTAs
 * between header and footer.
 */
export function HomePage({ onExplore }: HomePageProps) {
  return (
    <main className="home" id="explore">
      {/* 1 — Hero */}
      <section className="banner banner--hero" aria-label="Featured collection">
        <div className="banner-hero__copy">
          <img
            className="banner-hero__star"
            src="/assets/slides/star.svg"
            alt=""
            aria-hidden="true"
            width={521}
            height={521}
          />
          <div className="banner-hero__text">
            <EditorialTitle
              lines={[
                { text: "Born of" },
                { text: "wild", italic: true },
                { text: "elegance." },
              ]}
            />
            <p>Sculpted gold and diamonds for the modern muse</p>
            <Cta onClick={onExplore} />
          </div>
        </div>
        <div className="banner-hero__media">
          <img
            src="/assets/slides/s1-hero.png"
            alt="Model wearing LOUVE gold geometric jewellery"
            width={1920}
            height={1120}
          />
        </div>
      </section>

      {/* 2 — Full-bleed lifestyle */}
      <section className="banner banner--bleed" aria-label="Louve Wild collection">
        <img
          className="banner-bleed__bg"
          src="/assets/slides/s1-hero-a.png"
          alt="Model in studio light wearing LOUVE gold jewellery"
          width={1920}
          height={1120}
        />
        <div className="banner-bleed__card">
          <EditorialTitle
            as="h2"
            lines={[
              { text: "Louve" },
              { text: "Wild", italic: true },
            ]}
          />
          <p>Where instinct meets adornment in luminous gold</p>
          <Cta onClick={onExplore} />
        </div>
      </section>

      {/* 3 — Product + editorial */}
      <section
        className="banner banner--split"
        id="collections"
        aria-label="Luminescence earrings"
      >
        <div className="banner-split__col banner-split__col--stack">
          <div className="banner-split__photo">
            <img
              src="/assets/slides/s6-col2.png"
              alt="LOUVE drop earrings on glass"
              width={800}
              height={800}
            />
          </div>
          <div className="banner-split__copy">
            <EditorialTitle
              as="h2"
              lines={[
                { text: "The" },
                { text: "Luminescence", italic: true },
                { text: "of light." },
              ]}
            />
            <p>Earrings that catch every glance of light</p>
            <Cta onClick={onExplore} />
          </div>
        </div>
        <div className="banner-split__col banner-split__col--tall">
          <img
            src="/assets/slides/s5-c.png"
            alt="Editorial portrait in LOUVE earrings"
            width={960}
            height={1120}
          />
        </div>
      </section>

      {/* 4 — Atelier / craft */}
      <section className="banner banner--atelier" aria-label="Atelier craft">
        <div className="banner-atelier__visual">
          <img
            className="banner-atelier__star"
            src="/assets/slides/s4-star.svg"
            alt=""
            aria-hidden="true"
            width={521}
            height={521}
          />
          <div className="banner-atelier__photo">
            <img
              src="/assets/slides/s3-earrings-d.png"
              alt="LOUVE pendant at golden hour"
              width={520}
              height={520}
            />
          </div>
        </div>
        <div className="banner-atelier__copy">
          <img
            className="banner-atelier__blueprint"
            src="/assets/slides/s4-blueprint.png"
            alt=""
            aria-hidden="true"
          />
          <div className="banner-atelier__text">
            <EditorialTitle
              as="h2"
              lines={[
                { text: "Crafted" },
                { text: "with precision", italic: true },
              ]}
            />
            <p>
              Every LOUVE piece begins as a hand sketch in our atelier — refined
              through gold, diamond, and light until the silhouette feels
              inevitable. Discover jewellery made to be worn with quiet
              confidence.
            </p>
            <Cta onClick={onExplore} />
          </div>
        </div>
      </section>

      {/* 5 — Gold colour spectrum */}
      <GoldSpectrum onExplore={onExplore} />

      {/* 6 — Dual portraits + product (Figma Frame 2613643) */}
      <section className="banner banner--feature" aria-label="Drop earrings">
        <div className="banner-feature__stack">
          <div className="banner-feature__portrait">
            <img
              src="/assets/slides/feature/left-top-f.png"
              alt="Close-up profile wearing LOUVE geometric drop earrings"
              width={1152}
              height={928}
            />
          </div>
          <div className="banner-feature__portrait">
            <img
              src="/assets/slides/feature/left-top-e.png"
              alt="Portrait wearing LOUVE geometric drop earrings"
              width={1152}
              height={928}
            />
          </div>
        </div>
        <div className="banner-feature__aside">
          <div className="banner-feature__product">
            <img
              src="/assets/slides/feature/right-d.png"
              alt="LOUVE geometric drop earrings on glass"
              width={745}
              height={861}
            />
            <Cta className="cta cta--light" onClick={onExplore} />
          </div>
        </div>
      </section>

      {/* 7 — Triptych */}
      <section
        className="banner banner--triptych"
        aria-label="Signature collections"
      >
        {HOME_TRIPTYCH.map((item) => (
          <article className="banner-triptych__panel" key={item.title}>
            <img
              src={item.src}
              alt={`${item.title} collection`}
              width={640}
              height={1120}
            />
            <div className="banner-triptych__overlay">
              <EditorialTitle
                as="h2"
                lines={[
                  { text: "The" },
                  { text: item.title, italic: true },
                  { text: "edit." },
                ]}
              />
              <p>{item.copy}</p>
              <Cta onClick={onExplore} />
            </div>
          </article>
        ))}
      </section>

      {/* 8 — Diptych ear cuffs */}
      <section className="banner banner--diptych" aria-label="Nocturne ear cuffs">
        {[0, 1].map((i) => (
          <article className="banner-diptych__panel" key={i}>
            <div className="banner-diptych__media">
              <img
                src="/assets/slides/slide-07.png"
                alt="LOUVE Nocturne ear cuff"
                width={960}
                height={890}
              />
            </div>
            <div className="banner-diptych__copy">
              <EditorialTitle
                as="h2"
                lines={[
                  { text: "After" },
                  { text: "Nocturne", italic: true },
                ]}
              />
              <p>Ear cuffs that redefine the silhouette after dark</p>
              <Cta onClick={onExplore} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
