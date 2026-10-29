import { useEffect, useState } from "react";
import { claimGuestWishlist, seedAccountWishlist, WISHLIST_EVENT } from "./wishlist";
import { getSessionEmail, SESSION_EVENT, setSessionEmail } from "./session";

const ACCOUNTS_KEY = "louve-accounts";

export const DEMO_ACCOUNT = {
  name: "Aria Mehta",
  email: "aria@louve.com",
  password: "Louve1234",
};

export type PublicAccount = {
  name: string;
  email: string;
};

type AccountRecord = PublicAccount & {
  passwordHash: string;
  createdAt: string;
};

export type AccountResult =
  | { ok: true; account: PublicAccount }
  | { ok: false; field?: "name" | "email" | "password"; message: string };

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  const email = normalizeEmail(value);
  if (email.length < 5 || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function readAccounts(): AccountRecord[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is AccountRecord => {
      if (!item || typeof item !== "object") return false;
      const row = item as AccountRecord;
      return (
        typeof row.name === "string" &&
        typeof row.email === "string" &&
        typeof row.passwordHash === "string" &&
        row.email.length > 0 &&
        row.passwordHash.length > 0
      );
    });
  } catch {
    return [];
  }
}

function writeAccounts(accounts: AccountRecord[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

async function hashPassword(email: string, password: string) {
  const payload = new TextEncoder().encode(`${normalizeEmail(email)}:${password}`);
  if (crypto.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", payload);
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  let hash = 0;
  const source = `${normalizeEmail(email)}:${password}`;
  for (let i = 0; i < source.length; i += 1) {
    hash = (Math.imul(31, hash) + source.charCodeAt(i)) | 0;
  }
  return `fallback:${hash}`;
}

function toPublic(record: AccountRecord): PublicAccount {
  return { name: record.name, email: record.email };
}

function publish() {
  window.dispatchEvent(new CustomEvent(SESSION_EVENT));
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT));
}

function storageError(error: unknown): AccountResult {
  if (error instanceof DOMException && error.name === "QuotaExceededError") {
    return {
      ok: false,
      message: "This browser has no room to save the account. Free some site data and try again.",
    };
  }
  return {
    ok: false,
    message: "This browser blocked saving the account. Allow site data for this page and try again.",
  };
}

export function getSessionAccount(): PublicAccount | null {
  const email = getSessionEmail();
  if (!email) return null;
  const record = readAccounts().find((account) => account.email === email);
  return record ? toPublic(record) : null;
}

/** Drop a session whose account record is gone. */
export function clearStaleSession() {
  const email = getSessionEmail();
  if (!email) return;
  if (readAccounts().some((account) => account.email === email)) return;
  setSessionEmail(null);
  publish();
}

export async function createAccount(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AccountResult> {
  const name = normalizeName(input.name);
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (name.length < 2) {
    return { ok: false, field: "name", message: "Enter the name we should use for this account." };
  }
  if (name.length > 60) {
    return { ok: false, field: "name", message: "Use a name of 60 characters or fewer." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { ok: false, field: "password", message: "Use at least 8 characters." };
  }
  if (password.length > 72) {
    return { ok: false, field: "password", message: "Use 72 characters or fewer." };
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return {
      ok: false,
      field: "password",
      message: "Include at least one letter and one number.",
    };
  }

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === email)) {
    return {
      ok: false,
      field: "email",
      message: "An account with this email already exists. Sign in instead.",
    };
  }

  try {
    const passwordHash = await hashPassword(email, password);
    const record: AccountRecord = {
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    writeAccounts([...accounts, record]);
    claimGuestWishlist(email);
    setSessionEmail(email);
    publish();
    return { ok: true, account: toPublic(record) };
  } catch (error) {
    return storageError(error);
  }
}

export async function signIn(input: {
  email: string;
  password: string;
}): Promise<AccountResult> {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!isValidEmail(email)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }
  if (!password) {
    return { ok: false, field: "password", message: "Enter your password." };
  }

  const record = readAccounts().find((account) => account.email === email);
  if (!record) {
    return {
      ok: false,
      field: "email",
      message: "No account found for this email.",
    };
  }

  const passwordHash = await hashPassword(email, password);
  if (passwordHash !== record.passwordHash) {
    return {
      ok: false,
      field: "password",
      message: "That password does not match.",
    };
  }

  try {
    setSessionEmail(email);
    publish();
    return { ok: true, account: toPublic(record) };
  } catch (error) {
    return storageError(error);
  }
}

export function signOut() {
  setSessionEmail(null);
  publish();
}

export async function ensureDemoAccount() {
  const email = normalizeEmail(DEMO_ACCOUNT.email);
  const accounts = readAccounts();
  if (accounts.some((account) => account.email === email)) return;

  const passwordHash = await hashPassword(email, DEMO_ACCOUNT.password);
  writeAccounts([
    ...accounts,
    {
      name: DEMO_ACCOUNT.name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    },
  ]);
  seedAccountWishlist(email, [
    {
      id: "golden-orbs",
      name: "Golden Orbs Necklace",
      price: "₹1,84,200",
      image: "/assets/collection/product-necklace.png",
      metalLabel: "Yellow Gold",
    },
    {
      id: "serenity-ring",
      name: "Serenity Gem Ring",
      price: "₹96,450",
      image: "/assets/collection/product-ring.png",
      metalLabel: "Rose Gold",
      size: 7,
    },
  ]);
}

export async function signInDemo(): Promise<AccountResult> {
  await ensureDemoAccount();
  return signIn({
    email: DEMO_ACCOUNT.email,
    password: DEMO_ACCOUNT.password,
  });
}

export function useAccount() {
  const [account, setAccount] = useState<PublicAccount | null>(() => getSessionAccount());

  useEffect(() => {
    const sync = () => {
      clearStaleSession();
      setAccount(getSessionAccount());
    };
    sync();
    window.addEventListener(SESSION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SESSION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return account;
}
