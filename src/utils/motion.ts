/**
 * Motion / scroll helpers. Safe to import from client components; guards `window`.
 */

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type ScrollIntoViewOptionsWithBehavior = ScrollIntoViewOptions & {
  behavior?: ScrollBehavior;
};

/**
 * `scrollIntoView` respecting reduced-motion (falls back to `auto`).
 */
export function scrollElementIntoViewSmooth(
  element: HTMLElement,
  options: ScrollIntoViewOptionsWithBehavior = {},
): void {
  const behavior = getPrefersReducedMotion()
    ? "auto"
    : (options.behavior ?? "smooth");
  element.scrollIntoView({ ...options, behavior });
}

/**
 * Smooth window scroll; no-ops on server.
 */
export function scrollWindowToY(
  top: number,
  options?: { smooth?: boolean },
): void {
  if (typeof window === "undefined") return;
  const smooth = options?.smooth !== false && !getPrefersReducedMotion();
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}
