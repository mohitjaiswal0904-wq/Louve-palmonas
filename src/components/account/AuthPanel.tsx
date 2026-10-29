import { useEffect, useState } from "react";
import { AuthForm } from "./AuthForm";
import "./account.css";

type AuthPanelProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function AuthPanel({ open, onClose, onSuccess }: AuthPanelProps) {
  const [mode, setMode] = useState<"sign-in" | "create">("sign-in");

  useEffect(() => {
    if (open) setMode("sign-in");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="auth" role="dialog" aria-modal="true" aria-label="Account">
      <button
        type="button"
        className="auth__backdrop"
        aria-label="Close account"
        onClick={onClose}
      />
      <aside className="auth__panel">
        <header className="auth__head">
          <div>
            <p className="auth__eyebrow">Louve</p>
            <h2 className="auth__title">
              {mode === "create" ? "Create account" : "Sign in"}
            </h2>
          </div>
          <button
            type="button"
            className="auth__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <AuthForm
          mode={mode}
          onModeChange={setMode}
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </aside>
    </div>
  );
}
