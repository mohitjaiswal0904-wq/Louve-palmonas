"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProductRow = {
  id: number;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  price?: { amount: string; currency: string };
  image?: { src: string; alt: string };
};

export default function DashboardProductsPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(
    (p: number) => {
      setLoading(true);
      adminService
        .listProducts(client, { page: p, limit: 20 })
        .then((res) => {
          if (res.success && res.data) {
            setProducts(res.data.products as ProductRow[]);
            setTotal(res.data.total);
            setPage(res.data.page);
            setTotalPages(res.data.total_pages);
          }
        })
        .finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Products</h2>
        <p className="mt-1 text-sm text-muted-foreground">{total} product{total === 1 ? "" : "s"} in catalog</p>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
        ) : products.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No products found.</p>
        ) : (
          products.map((p) => (
            <Card key={p.id} size="sm" className="shadow-sm">
              <CardContent className="flex gap-3 pt-4">
                {p.image?.src ? (
                  <img
                    src={p.image.src}
                    alt={p.image.alt || p.title}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                    —
                  </div>
                )}
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-medium leading-snug">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.vendor}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.product_type || "—"} ·{" "}
                    <span className="font-mono">{p.handle}</span>
                  </p>
                  <p className="text-sm font-medium tabular-nums">
                    {p.price ? `${p.price.currency} ${p.price.amount}` : "—"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border bg-card shadow-sm md:block">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3 font-medium">Image</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Title</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Vendor</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Type</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Price</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Handle</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-0 hover:bg-muted/40 dark:hover:bg-zinc-800/30"
                >
                  <td className="whitespace-nowrap px-4 py-3">
                    {p.image?.src ? (
                      <img
                        src={p.image.src}
                        alt={p.image.alt || p.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground">
                        —
                      </div>
                    )}
                  </td>
                  <td className="max-w-[14rem] px-4 py-3 font-medium">
                    <span className="line-clamp-2">{p.title}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{p.vendor}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{p.product_type || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                    {p.price ? `${p.price.currency} ${p.price.amount}` : "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{p.handle}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2 sm:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page <= 1 || loading}
              onClick={() => fetchProducts(page - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page >= totalPages || loading}
              onClick={() => fetchProducts(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
