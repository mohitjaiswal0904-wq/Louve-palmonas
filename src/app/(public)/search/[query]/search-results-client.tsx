"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

import { ProductGrid, PaginationBar } from "@/components/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalog, useMessages, useSearch } from "@/hooks";
import { cn } from "@/lib/utils";
import type { FiltersDTO, ProductDTO, Pagination } from "@/types";

const selectBar =
  "h-10 min-h-10 w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus-visible:ring-zinc-600 sm:w-auto sm:min-w-[10.5rem]";

export default function SearchResultsClient({ query }: { query: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const m = useMessages();
  const search = useSearch();
  const catalog = useCatalog();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFilters] = useState<FiltersDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const didInitFilters = useRef(false);

  const page = Number(searchParams.get("page")) || 1;
  const vendor = searchParams.get("vendor") ?? "";
  const productType = searchParams.get("product_type") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";

  const hasActiveFilters = Boolean(vendor || productType || sortBy);

  useEffect(() => {
    if (didInitFilters.current) return;
    didInitFilters.current = true;
    catalog.getFilters().then((res) => {
      if (res.data) setFilters(res.data);
    }).catch(() => {});
  }, [catalog]);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await search.searchProducts({
        q: query,
        page,
        limit: 24,
        vendor: vendor || undefined,
        product_type: productType || undefined,
        sort_by: sortBy || undefined,
        sort_order: sortOrder || undefined,
      });
      setProducts(res.data ?? []);
      setPagination(res.pagination);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, query, page, vendor, productType, sortBy, sortOrder]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchInput.trim();
    if (q && q !== query) {
      router.push(`/search/${encodeURIComponent(q)}`);
    }
  }

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    const qs = params.toString();
    router.push(`/search/${encodeURIComponent(query)}${qs ? `?${qs}` : ""}`);
  }

  function clearAllFilters() {
    router.push(`/search/${encodeURIComponent(query)}`);
  }

  return (
    <div className="w-full px-3 py-8 sm:px-4 sm:py-10 md:px-5 lg:px-5 xl:px-6 2xl:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
        <Link href="/" className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300">
          Home
        </Link>
        <ChevronRight className="size-3 shrink-0" />
        <Link href="/search" className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300">
          {m.catalog.searchTitle}
        </Link>
        <ChevronRight className="size-3 shrink-0" />
        <span className="max-w-[min(100%,12rem)] truncate font-medium text-zinc-700 dark:text-zinc-200">
          &ldquo;{query}&rdquo;
        </span>
      </nav>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {m.catalog.searchResultsFor}{" "}
          <span className="font-normal text-zinc-600 dark:text-zinc-300">&ldquo;{query}&rdquo;</span>
        </h1>
        {pagination && (
          <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
            {m.catalog.searchResults.replace("{count}", String(pagination.total))}
          </p>
        )}

        <form
          onSubmit={handleSearch}
          className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3"
        >
          <Input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-11 rounded-lg border-zinc-200 text-[15px] dark:border-zinc-700 sm:flex-1"
            placeholder={m.catalog.searchAgain}
          />
          <Button type="submit" className="h-11 shrink-0 rounded-lg px-6">
            {m.catalog.searchButton}
          </Button>
        </form>
      </div>

      <div
        className={cn(
          "sticky z-30 mb-8 border-y border-zinc-200/90 bg-background/90 py-3 backdrop-blur-md dark:border-zinc-800 dark:bg-background/90",
          "top-[calc(var(--site-header-offset,4rem)+0.25rem)]",
        )}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
            <SlidersHorizontal className="size-4 shrink-0 opacity-70" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Refine results
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:gap-3">
              {filters?.vendors && filters.vendors.length > 0 && (
                <label className="flex w-full min-w-0 flex-col gap-1 sm:w-auto">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Brand
                  </span>
                  <select
                    value={vendor}
                    onChange={(e) =>
                      updateParams({ vendor: e.target.value, page: "" })
                    }
                    className={selectBar}
                  >
                    <option value="">{m.catalog.allBrands}</option>
                    {filters.vendors.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.count})
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {filters?.product_types && filters.product_types.length > 0 && (
                <label className="flex w-full min-w-0 flex-col gap-1 sm:w-auto">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Category
                  </span>
                  <select
                    value={productType}
                    onChange={(e) =>
                      updateParams({ product_type: e.target.value, page: "" })
                    }
                    className={selectBar}
                  >
                    <option value="">{m.catalog.allTypes}</option>
                    {filters.product_types.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.count})
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="flex w-full min-w-0 flex-col gap-1 sm:w-auto lg:ml-auto">
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Sort by
                </span>
                <select
                  value={`${sortBy}:${sortOrder}`}
                  onChange={(e) => {
                    const [by, order] = e.target.value.split(":");
                    updateParams({ sort_by: by, sort_order: order, page: "" });
                  }}
                  className={selectBar}
                >
                  <option value=":">{m.catalog.relevance}</option>
                  <option value="price:asc">{m.catalog.sortPriceLow}</option>
                  <option value="price:desc">{m.catalog.sortPriceHigh}</option>
                  <option value="title:asc">{m.catalog.sortTitleAZ}</option>
                  <option value="title:desc">{m.catalog.sortTitleZA}</option>
                  <option value="created_at:desc">{m.catalog.sortNewest}</option>
                </select>
              </label>
            </div>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-10 w-full shrink-0 rounded-lg sm:w-auto"
                onClick={() => clearAllFilters()}
              >
                {m.catalog.clearFilters}
              </Button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 gap-0 border-l border-t border-[#F6F1E9] dark:border-zinc-800 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[#F6F1E9] dark:border-zinc-800">
                <div className="aspect-square bg-zinc-200/70 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <ProductGrid products={products} size="showcase" />
          {pagination && (
            <PaginationBar
              pagination={pagination}
              onPageChange={(p) => updateParams({ page: String(p) })}
            />
          )}
        </>
      )}
    </div>
  );
}
