"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { ProductGrid, PaginationBar } from "@/components/catalog";
import { Button } from "@/components/ui/button";
import { useCatalog, useMessages } from "@/hooks";
import type { ProductDTO, Pagination, FiltersDTO } from "@/types";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const m = useMessages();
  const catalog = useCatalog();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFilters] = useState<FiltersDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  const page = Number(searchParams.get("page")) || 1;
  const vendor = searchParams.get("vendor") ?? "";
  const productType = searchParams.get("product_type") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await catalog.listProducts({
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
  }, [catalog, page, vendor, productType, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    catalog.getFilters().then((res) => {
      if (res.data) setFilters(res.data);
    }).catch(() => {});
  }, [catalog]);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    if (updates.page === undefined) params.delete("page");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="text-xl font-light tracking-wide">{m.catalog.products}</h1>
        {pagination && (
          <p className="text-xs text-muted-foreground">
            {m.catalog.productCount.replace("{count}", String(pagination.total))}
          </p>
        )}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        {filters?.vendors && (
          <select
            value={vendor}
            onChange={(e) => updateParams({ vendor: e.target.value })}
            className="h-8 rounded-md border bg-background px-2 text-xs outline-none"
          >
            <option value="">{m.catalog.allBrands}</option>
            {filters.vendors.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.count})
              </option>
            ))}
          </select>
        )}
        {filters?.product_types && (
          <select
            value={productType}
            onChange={(e) => updateParams({ product_type: e.target.value })}
            className="h-8 rounded-md border bg-background px-2 text-xs outline-none"
          >
            <option value="">{m.catalog.allTypes}</option>
            {filters.product_types.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.count})
              </option>
            ))}
          </select>
        )}
        <select
          value={`${sortBy}:${sortOrder}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split(":");
            updateParams({ sort_by: by, sort_order: order });
          }}
          className="h-8 rounded-md border bg-background px-2 text-xs outline-none"
        >
          <option value=":">{m.catalog.sortDefault}</option>
          <option value="price:asc">{m.catalog.sortPriceLow}</option>
          <option value="price:desc">{m.catalog.sortPriceHigh}</option>
          <option value="title:asc">{m.catalog.sortTitleAZ}</option>
          <option value="title:desc">{m.catalog.sortTitleZA}</option>
          <option value="created_at:desc">{m.catalog.sortNewest}</option>
        </select>
        {(vendor || productType) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateParams({ vendor: "", product_type: "" })}
            className="h-8 text-xs"
          >
            {m.catalog.clearFilters}
          </Button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">{m.common.loading}…</p>
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
