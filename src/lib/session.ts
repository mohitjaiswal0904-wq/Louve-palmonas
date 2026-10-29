const SESSION_KEY = "louve-session";
export const SESSION_EVENT = "louve:session-change";

type Session = {
  email: string;
};

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const email = (parsed as Session).email;
    if (typeof email !== "string" || !email.trim()) return null;
    return { email: email.trim().toLowerCase() };
  } catch {
    return null;
  }
}

export function getSessionEmail(): string | null {
  return readSession()?.email ?? null;
}

export function setSessionEmail(email: string | null) {
  if (!email) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    const session: Session = { email: email.trim().toLowerCase() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  window.dispatchEvent(new CustomEvent(SESSION_EVENT));
}
