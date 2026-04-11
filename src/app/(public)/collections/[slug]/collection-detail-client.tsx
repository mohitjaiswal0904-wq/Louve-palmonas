"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { createCsrApiClient } from "@/lib/client";
import * as catalogService from "@/services/catalog.service";
import { ProductGrid } from "@/components/catalog/product-grid";
import { PaginationBar } from "@/components/catalog/pagination-bar";
import type { CollectionDTO, ProductDTO, Pagination } from "@/types";

export function CollectionDetailClient() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const client = useMemo(() => createCsrApiClient(), []);

  const [collection, setCollection] = useState<CollectionDTO | null>(null);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 24,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const fetchProducts = useCallback(
    (page: number) => {
      setProductsLoading(true);
      catalogService
        .getCollectionProducts(client, slug, { page, limit: 24 })
        .then((res) => {
          if (res.success && res.data) {
            const d = res.data;
            setProducts(d.products ?? []);
            const totalPages = d.total_pages || 1;
            setPagination({
              page: d.page,
              limit: 24,
              total: d.total,
              totalPages,
              hasNext: d.page < totalPages,
              hasPrev: d.page > 1,
            });
          }
        })
        .finally(() => setProductsLoading(false));
    },
    [client, slug],
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([
      catalogService.getCollectionBySlug(client, slug),
      catalogService.getCollectionProducts(client, slug, { page: 1, limit: 24 }),
    ])
      .then(([colRes, prodRes]) => {
        if (colRes.success && colRes.data) setCollection(colRes.data);
        if (prodRes.success && prodRes.data) {
          const d = prodRes.data;
          setProducts(d.products ?? []);
          const totalPages = d.total_pages || 1;
          setPagination({
            page: d.page,
            limit: 24,
            total: d.total,
            totalPages,
            hasNext: d.page < totalPages,
            hasPrev: d.page > 1,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [client, slug]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 rounded bg-zinc-200/70 dark:bg-zinc-800" />
          <div className="h-8 w-80 rounded bg-zinc-200/70 dark:bg-zinc-800" />
          <div className="h-4 w-96 rounded bg-zinc-200/70 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 gap-0 border-l border-t border-[#F6F1E9] pt-4 dark:border-zinc-800 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-b border-[#F6F1E9] dark:border-zinc-800"
              >
                <div className="aspect-square bg-zinc-200/70 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Collection not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
        <Link
          href="/"
          className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Home
        </Link>
        <ChevronRight className="size-3" />
        <Link
          href="/collections"
          className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Collections
        </Link>
        {collection.parent_slug && (
          <>
            <ChevronRight className="size-3" />
            <Link
              href={`/collections/${collection.parent_slug}`}
              className="capitalize transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              {collection.parent_slug.replace(/-/g, " ")}
            </Link>
          </>
        )}
        <ChevronRight className="size-3" />
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          {collection.title}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {collection.description}
          </p>
        )}
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
          {pagination.total} product{pagination.total === 1 ? "" : "s"}
        </p>
      </div>

      {/* Subcollections */}
      {collection.children && collection.children.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {collection.children.map((child) => (
            <Link
              key={child.slug}
              href={`/collections/${child.slug}`}
              className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            >
              {child.title}
              <span className="ml-1 text-zinc-400 dark:text-zinc-600">
                ({child.product_count})
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Products */}
      <div className={productsLoading ? "pointer-events-none opacity-50" : ""}>
        <ProductGrid products={products} size="showcase" />
      </div>

      <PaginationBar pagination={pagination} onPageChange={fetchProducts} />
    </div>
  );
}
