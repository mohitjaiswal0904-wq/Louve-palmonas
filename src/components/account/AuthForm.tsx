import { useId, useState, type FormEvent } from "react";
import {
  createAccount,
  isValidEmail,
  normalizeName,
  signIn,
  signInDemo,
} from "../../lib/account";

type AuthMode = "sign-in" | "create";

type AuthFormProps = {
  mode?: AuthMode;
  onModeChange?: (mode: AuthMode) => void;
  onSuccess?: () => void;
};

type Field = "name" | "email" | "password";

export function AuthForm({
  mode = "sign-in",
  onModeChange,
  onSuccess,
}: AuthFormProps) {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ field?: Field; message: string } | null>(
    null,
  );
  const [pending, setPending] = useState(false);

  const switchMode = (next: AuthMode) => {
    setError(null);
    setPassword("");
    onModeChange?.(next);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending) return;

    if (mode === "create") {
      const trimmedName = normalizeName(name);
      if (trimmedName.length < 2) {
        setError({
          field: "name",
          message: "Enter the name we should use for this account.",
        });
        return;
      }
    }
    if (!isValidEmail(email)) {
      setError({ field: "email", message: "Enter a valid email address." });
      return;
    }
    if (mode === "sign-in" && !password) {
      setError({ field: "password", message: "Enter your password." });
      return;
    }

    setPending(true);
    const result =
      mode === "create"
        ? await createAccount({ name, email, password })
        : await signIn({ email, password });
    setPending(false);

    if (!result.ok) {
      setError({ field: result.field, message: result.message });
      return;
    }
    onSuccess?.();
  };

  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const passwordId = `${formId}-password`;
  const errorId = `${formId}-error`;

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <div className="auth-form__switch" role="tablist" aria-label="Account">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sign-in"}
          className={`auth-form__tab${mode === "sign-in" ? " is-active" : ""}`}
          onClick={() => switchMode("sign-in")}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "create"}
          className={`auth-form__tab${mode === "create" ? " is-active" : ""}`}
          onClick={() => switchMode("create")}
        >
          Create account
        </button>
      </div>

      {mode === "create" ? (
        <label className="auth-form__field" htmlFor={nameId}>
          <span>Name</span>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={60}
            value={name}
            disabled={pending}
            aria-invalid={error?.field === "name"}
            aria-describedby={error?.field === "name" ? errorId : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (error?.field === "name") setError(null);
            }}
          />
        </label>
      ) : null}

      <label className="auth-form__field" htmlFor={emailId}>
        <span>Email</span>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={email}
          disabled={pending}
          aria-invalid={error?.field === "email"}
          aria-describedby={error?.field === "email" ? errorId : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error?.field === "email") setError(null);
          }}
        />
      </label>

      <label className="auth-form__field" htmlFor={passwordId}>
        <span>Password</span>
        <span className="auth-form__password">
          <input
            id={passwordId}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "create" ? "new-password" : "current-password"}
            maxLength={72}
            value={password}
            disabled={pending}
            aria-invalid={error?.field === "password"}
            aria-describedby={error?.field === "password" ? errorId : undefined}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error?.field === "password") setError(null);
            }}
          />
          <button
            type="button"
            className="auth-form__reveal"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
      </label>

      {mode === "create" ? (
        <p className="auth-form__hint">
          At least 8 characters, with one letter and one number. Saved on this device only.
        </p>
      ) : null}

      {error ? (
        <p className="auth-form__error" id={errorId} role="alert">
          {error.message}
          {error.field === "email" && mode === "create" && error.message.includes("already") ? (
            <>
              {" "}
              <button type="button" onClick={() => switchMode("sign-in")}>
                Sign in
              </button>
            </>
          ) : null}
        </p>
      ) : null}

      <button className="auth-form__submit" type="submit" disabled={pending}>
        {pending ? "Please wait" : mode === "create" ? "Create account" : "Sign in"}
      </button>
      <button
        className="auth-form__demo"
        type="button"
        disabled={pending}
        onClick={async () => {
          if (pending) return;
          setPending(true);
          setError(null);
          const result = await signInDemo();
          setPending(false);
          if (!result.ok) {
            setError({ field: result.field, message: result.message });
            return;
          }
          onSuccess?.();
        }}
      >
        Continue as Aria Mehta
      </button>
      <p className="auth-form__hint">
        Demo account: aria@louve.com · Louve1234
      </p>
    </form>
  );
}
