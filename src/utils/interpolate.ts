export type InterpolateVars = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Replace `{key}` placeholders. Missing keys become empty strings.
 * Values are coerced with `String()`; `null` / `undefined` become `""`.
 */
export function interpolate(
  template: string,
  vars: InterpolateVars | Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const raw = (vars as InterpolateVars)[key];
    if (raw === null || raw === undefined) return "";
    return String(raw);
  });
}

/**
 * Same as `interpolate`, but HTML-escapes string values for safe text insertion in HTML.
 * Still escape user-controlled template text at the source if it is not trusted.
 */
export function interpolateHtml(
  template: string,
  vars: InterpolateVars | Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const raw = (vars as InterpolateVars)[key];
    if (raw === null || raw === undefined) return "";
    if (typeof raw === "number" || typeof raw === "boolean") return escapeHtml(String(raw));
    return escapeHtml(String(raw));
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
