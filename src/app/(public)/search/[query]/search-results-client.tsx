"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProductGrid, PaginationBar } from "@/components/catalog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessages, useSearch } from "@/hooks";
import type { ProductDTO, Pagination } from "@/types";

export default function SearchResultsClient({ query }: { query: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const m = useMessages();
  const search = useSearch();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await search.searchProducts({
        q: query,
        page,
        limit: 24,
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
  }, [search, query, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

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
    router.push(`/search/${encodeURIComponent(query)}?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-light tracking-wide">
          {m.catalog.searchResultsFor} &ldquo;{query}&rdquo;
        </h1>
        {pagination && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {m.catalog.searchResults.replace("{count}", String(pagination.total))}
          </p>
        )}
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-9 max-w-sm"
          placeholder={m.catalog.searchAgain}
        />
        <Button type="submit" variant="outline" size="sm" className="h-9 text-xs">
          {m.catalog.searchButton}
        </Button>
      </form>

      <div className="flex gap-2 border-b pb-4">
        <select
          value={`${sortBy}:${sortOrder}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split(":");
            updateParams({ sort_by: by, sort_order: order, page: "" });
          }}
          className="h-8 rounded-md border bg-background px-2 text-xs outline-none"
        >
          <option value=":">{m.catalog.relevance}</option>
          <option value="price:asc">{m.catalog.sortPriceLow}</option>
          <option value="price:desc">{m.catalog.sortPriceHigh}</option>
          <option value="title:asc">{m.catalog.sortTitleAZ}</option>
        </select>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">{m.catalog.searching}</p>
        </div>
      ) : (
        <>
          <ProductGrid products={products} />
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
