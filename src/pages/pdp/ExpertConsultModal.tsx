import { useEffect, useId, useState } from "react";
import {
  EXPERT_CHANNEL_LABEL,
  EXPERT_CHANNELS,
  EXPERT_TIME_WINDOWS,
  type ExpertChannel,
  type ExpertTimeWindow,
} from "../../data/expertConsult";
import { STORES } from "../../data/stores";
import "./expert.css";

export type ExpertProductContext = {
  name: string;
  metalLabel: string;
  size: number;
  price: string;
  image: string;
};

type Step = "channel" | "details" | "success";

type ExpertConsultModalProps = {
  open: boolean;
  onClose: () => void;
  onVisitStore?: () => void;
  product: ExpertProductContext;
};

export function ExpertConsultModal({
  open,
  onClose,
  onVisitStore,
  product,
}: ExpertConsultModalProps) {
  const titleId = useId();
  const [step, setStep] = useState<Step>("channel");
  const [channel, setChannel] = useState<ExpertChannel | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [timeWindow, setTimeWindow] = useState<ExpertTimeWindow>("flexible");
  const [storeId, setStoreId] = useState(STORES[0]?.id ?? "");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep("channel");
    setChannel(null);
    setName("");
    setPhone("");
    setEmail("");
    setTimeWindow("flexible");
    setStoreId(STORES[0]?.id ?? "");
    setNote("");
    setTouched(false);
  }, [open]);

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

  const nameOk = name.trim().length >= 2;
  const phoneOk = phone.replace(/\D/g, "").length >= 10;
  const storeOk = channel !== "store" || Boolean(storeId);
  const detailsOk = nameOk && phoneOk && storeOk;
  const selectedStore = STORES.find((s) => s.id === storeId);
  const stepIndex = step === "channel" ? 1 : step === "details" ? 2 : 3;

  const submit = () => {
    setTouched(true);
    if (!channel || !detailsOk) return;
    console.log("[louve-expert]", {
      channel,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      timeWindow,
      storeId: channel === "store" ? storeId : null,
      note: note.trim() || null,
      product,
    });
    setStep("success");
  };

  return (
    <div
      className="expert"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="expert__backdrop"
        aria-label="Close consultation"
        onClick={onClose}
      />
      <div className="expert__panel">
        <header className="expert__head">
          <div>
            <p className="expert__eyebrow">Private atelier</p>
            <h2 id={titleId} className="expert__title">
              A private consultation
            </h2>
          </div>
          <button type="button" className="expert__close" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="expert__steps" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`expert__step-dot${stepIndex >= n ? " is-active" : ""}`}
            />
          ))}
        </div>

        <div className="expert__product">
          <img
            src={product.image}
            alt=""
            width={64}
            height={64}
            className="expert__product-img"
          />
          <div className="expert__product-meta">
            <p className="expert__product-name">{product.name}</p>
            <p className="expert__product-line">
              {product.metalLabel} · Size {product.size}
            </p>
            <p className="expert__product-price">{product.price}</p>
          </div>
        </div>

        {step === "channel" ? (
          <div className="expert__body">
            <p className="expert__lead">How would you like to connect?</p>
            <div className="expert__channels" role="radiogroup" aria-label="Channel">
              {EXPERT_CHANNELS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={channel === c.id}
                  className={`expert__channel${channel === c.id ? " is-active" : ""}`}
                  onClick={() => setChannel(c.id)}
                >
                  <span className="expert__channel-title">{c.title}</span>
                  <span className="expert__channel-copy">{c.copy}</span>
                </button>
              ))}
            </div>
            <div className="expert__actions">
              <button
                type="button"
                className="expert__btn expert__btn--primary"
                disabled={!channel}
                onClick={() => channel && setStep("details")}
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === "details" ? (
          <div className="expert__body">
            <p className="expert__lead">
              Share a few details — we will reach out quietly.
            </p>
            <form
              className="expert__form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <label className="expert__field">
                <span className="expert__label">Name</span>
                <input
                  className={`expert__input${touched && !nameOk ? " is-invalid" : ""}`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="expert__field">
                <span className="expert__label">Phone</span>
                <input
                  className={`expert__input${touched && !phoneOk ? " is-invalid" : ""}`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
              <label className="expert__field">
                <span className="expert__label">
                  Email <span className="expert__optional">optional</span>
                </span>
                <input
                  className="expert__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <fieldset className="expert__fieldset">
                <legend className="expert__label">Preferred time</legend>
                <div className="expert__pills" role="radiogroup">
                  {EXPERT_TIME_WINDOWS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={timeWindow === t.id}
                      className={`expert__pill${timeWindow === t.id ? " is-active" : ""}`}
                      onClick={() => setTimeWindow(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {channel === "store" ? (
                <fieldset className="expert__fieldset">
                  <legend className="expert__label">Maison</legend>
                  <div className="expert__stores" role="radiogroup">
                    {STORES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={storeId === s.id}
                        className={`expert__store${storeId === s.id ? " is-active" : ""}`}
                        onClick={() => setStoreId(s.id)}
                      >
                        <span className="expert__store-city">{s.city}</span>
                        <span className="expert__store-name">{s.name}</span>
                        <span className="expert__store-addr">{s.address}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              <label className="expert__field">
                <span className="expert__label">
                  Note <span className="expert__optional">optional</span>
                </span>
                <textarea
                  className="expert__textarea"
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Occasion, budget, or anything we should know"
                />
              </label>

              <div className="expert__actions">
                <button
                  type="button"
                  className="expert__btn expert__btn--ghost"
                  onClick={() => setStep("channel")}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="expert__btn expert__btn--primary"
                >
                  Request consultation
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {step === "success" ? (
          <div className="expert__body expert__body--success">
            <p className="expert__success-eyebrow">Request received</p>
            <h3 className="expert__success-title">We will be in touch shortly</h3>
            <p className="expert__success-copy">
              A Louve expert will reach you via{" "}
              <strong>{channel ? EXPERT_CHANNEL_LABEL[channel] : "your chosen channel"}</strong>
              {channel === "store" && selectedStore
                ? ` at ${selectedStore.name}, ${selectedStore.city}`
                : null}
              . Your {product.name} selection is noted.
            </p>
            <div className="expert__actions">
              <button
                type="button"
                className="expert__btn expert__btn--ghost"
                onClick={onClose}
              >
                Close
              </button>
              {onVisitStore ? (
                <button
                  type="button"
                  className="expert__btn expert__btn--primary"
                  onClick={() => {
                    onClose();
                    onVisitStore();
                  }}
                >
                  Visit a maison
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
