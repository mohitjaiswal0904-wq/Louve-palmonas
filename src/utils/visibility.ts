/**
 * Pure geometry helpers for “how much of an element is on screen” (SSR-safe).
 * Feed rects from `getBoundingClientRect()` relative to the same viewport origin.
 */

export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function rectArea(r: Rect): number {
  return Math.max(0, r.width) * Math.max(0, r.height);
}

export function intersectRect(a: Rect, b: Rect): Rect | null {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.left + a.width, b.left + b.width);
  const bottom = Math.min(a.top + a.height, b.top + b.height);
  const width = right - left;
  const height = bottom - top;
  if (width <= 0 || height <= 0) return null;
  return { left, top, width, height };
}

/**
 * Ratio of `element` area that lies inside `viewport` (0–1). Useful for lazy media, analytics, “seen” flags.
 */
export function visibleRatio(element: Rect, viewport: Rect): number {
  const inter = intersectRect(element, viewport);
  if (!inter) return 0;
  const elArea = rectArea(element);
  if (elArea <= 0) return 0;
  return rectArea(inter) / elArea;
}

/**
 * Intersection-over-union of two rects (0–1).
 */
export function iou(a: Rect, b: Rect): number {
  const inter = intersectRect(a, b);
  if (!inter) return 0;
  const union = rectArea(a) + rectArea(b) - rectArea(inter);
  return union > 0 ? rectArea(inter) / union : 0;
}

export function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}
