import { getSessionEmail } from "./session";

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  metalLabel?: string;
  size?: number;
};

const GUEST_KEY = "louve-wishlist";
export const WISHLIST_EVENT = "louve:wishlist-change";

function keyFor(email: string | null) {
  return email ? `louve-wishlist:${encodeURIComponent(email)}` : GUEST_KEY;
}

function activeKey() {
  return keyFor(getSessionEmail());
}

function sanitize(parsed: unknown): WishlistItem[] {
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((item): item is WishlistItem => {
    if (!item || typeof item !== "object") return false;
    const row = item as WishlistItem;
    return (
      typeof row.id === "string" &&
      row.id.trim().length > 0 &&
      typeof row.name === "string" &&
      typeof row.price === "string" &&
      typeof row.image === "string"
    );
  });
}

function readKey(key: string): WishlistItem[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return sanitize(JSON.parse(raw) as unknown);
  } catch {
    return [];
  }
}

function readRaw(): WishlistItem[] {
  return readKey(activeKey());
}

function writeRaw(items: WishlistItem[]) {
  localStorage.setItem(activeKey(), JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT));
}

export function seedAccountWishlist(email: string, items: WishlistItem[]) {
  const accountKey = keyFor(email);
  if (readKey(accountKey).length > 0 || items.length === 0) return;
  localStorage.setItem(accountKey, JSON.stringify(items));
}

/** Move pieces saved before sign-up onto a new, empty account. */
export function claimGuestWishlist(email: string) {
  const guest = readKey(GUEST_KEY);
  const accountKey = keyFor(email);
  if (guest.length === 0 || readKey(accountKey).length > 0) return;
  localStorage.setItem(accountKey, JSON.stringify(guest));
  localStorage.removeItem(GUEST_KEY);
}

export function getWishlist(): WishlistItem[] {
  return readRaw();
}

export function isInWishlist(id: string): boolean {
  return readRaw().some((item) => item.id === id);
}

export function toggleWishlistItem(item: WishlistItem): boolean {
  const current = readRaw();
  const exists = current.some((entry) => entry.id === item.id);
  const next = exists
    ? current.filter((entry) => entry.id !== item.id)
    : [...current, item];
  writeRaw(next);
  return !exists;
}

export function removeWishlistItem(id: string) {
  writeRaw(readRaw().filter((item) => item.id !== id));
}

export function getWishlistCount(): number {
  return readRaw().length;
}
