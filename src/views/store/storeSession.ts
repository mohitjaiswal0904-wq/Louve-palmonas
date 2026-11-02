export type StoreSession = {
  storeId: string | null;
  entered: boolean;
};

const STORE_SESSION_KEY = "louve-store-session";

export function readStoreSession(): StoreSession | null {
  try {
    const raw = sessionStorage.getItem(STORE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoreSession;
  } catch {
    return null;
  }
}

export function writeStoreSession(session: StoreSession) {
  try {
    sessionStorage.setItem(STORE_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearStoreSession() {
  try {
    sessionStorage.removeItem(STORE_SESSION_KEY);
  } catch {
    /* ignore */
  }
}
