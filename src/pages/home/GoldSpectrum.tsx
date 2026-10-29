import { useId, useState, type CSSProperties } from "react";
import { GOLD_GALLERY, GOLD_TONES } from "../../data/goldTones";
import { Cta } from "../../components/ui/Cta";
import "./gold-dial.css";

type GoldSpectrumProps = {
  onExplore: () => void;
};

export function GoldSpectrum({ onExplore }: GoldSpectrumProps) {
  const [active, setActive] = useState(0);
  const labelId = useId();
  const tone = GOLD_TONES[active] ?? GOLD_TONES[0];

  return (
    <section
      className="gold-dial"
      aria-label="Gold colour temperaments"
      style={
        {
          "--gold-wash": tone.wash,
          "--gold-swatch": tone.swatch,
          "--gold-name": tone.nameColor,
        } as CSSProperties
      }
    >
      <div className="gold-dial__wash" aria-hidden="true" />

      <header className="gold-dial__header">
        <p className="gold-dial__eyebrow">Louve · Metal</p>
        <div className="gold-dial__heading">
          <h2 className="editorial-title gold-dial__title">
            <span>Gold has a</span>
            <em>temperament.</em>
          </h2>
          <p className="gold-dial__lede">
            Not one shade — three climates of light. Choose a metal and see how
            the same jewellery changes its voice.
          </p>
        </div>
      </header>

      <div className="gold-dial__body">
        <div className="gold-dial__nameplate" key={tone.id}>
          <p className="gold-dial__name">{tone.name}</p>
          <p className="gold-dial__line">{tone.line}</p>

          <div
            className="gold-dial__chips"
            role="radiogroup"
            aria-labelledby={labelId}
          >
            <span className="gold-dial__chips-label" id={labelId}>
              Metal
            </span>
            <div className="gold-dial__chip-row">
              {GOLD_TONES.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  role="radio"
                  aria-checked={i === active}
                  aria-label={g.name}
                  title={g.name}
                  className={`gold-dial__chip${i === active ? " is-active" : ""}`}
                  style={{ background: g.swatch }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                />
              ))}
            </div>
          </div>

          <Cta onClick={onExplore} />
        </div>

        <ul className="gold-dial__gallery">
          {GOLD_GALLERY.map((item) => (
            <li key={item.src} className="gold-dial__frame">
              <img
                src={item.src}
                alt={item.alt}
                width={480}
                height={480}
                style={{ filter: tone.filter }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
