/**
 * DTOs for `GET /api/v1/catalog/popular-searches` (or equivalent CMS endpoint).
 * Backend should return `ApiResponse<PopularSearchCategoryDTO[]>`.
 */

export type PopularSearchLinkDTO = {
  label: string;
  /** Internal path (e.g. `/collections/rings`). Takes precedence over `query`. */
  href?: string | null;
  /** Search term for `/search/[query]` when `href` is omitted. */
  query?: string | null;
};

export type PopularSearchCategoryDTO = {
  categoryName: string;
  links: PopularSearchLinkDTO[];
};
