import type { PopularSearchCategoryDTO, PopularSearchLinkDTO } from "@/types";

/**
 * Normalizes API JSON (camelCase or snake_case) into `PopularSearchCategoryDTO[]`.
 */
export function coercePopularSearchCategories(raw: unknown): PopularSearchCategoryDTO[] {
  if (!Array.isArray(raw)) return [];

  return raw.flatMap((row): PopularSearchCategoryDTO[] => {
    if (!row || typeof row !== "object") return [];
    const o = row as Record<string, unknown>;
    const categoryName =
      (typeof o.categoryName === "string" && o.categoryName.trim()) ||
      (typeof o.category_name === "string" && o.category_name.trim()) ||
      "";
    const linksRaw = o.links;
    if (!categoryName || !Array.isArray(linksRaw)) return [];

    const links: PopularSearchLinkDTO[] = linksRaw.flatMap((item): PopularSearchLinkDTO[] => {
      if (!item || typeof item !== "object") return [];
      const l = item as Record<string, unknown>;
      const label = typeof l.label === "string" ? l.label.trim() : "";
      if (!label) return [];
      const href = typeof l.href === "string" && l.href.trim() ? l.href.trim() : undefined;
      const query = typeof l.query === "string" && l.query.trim() ? l.query.trim() : undefined;
      return [{ label, href, query }];
    });

    return links.length ? [{ categoryName, links }] : [];
  });
}
