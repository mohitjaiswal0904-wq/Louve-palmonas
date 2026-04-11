"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import { Button } from "@/components/ui/button";

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
      adminService.listProducts(client, { page: p, limit: 20 }).then((res) => {
        if (res.success && res.data) {
          setProducts(res.data.products as ProductRow[]);
          setTotal(res.data.total);
          setPage(res.data.page);
          setTotalPages(res.data.total_pages);
        }
      }).finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => { fetchProducts(1); }, [fetchProducts]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Products ({total})</h2>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Handle</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-4 py-3">
                    {p.image?.src ? (
                      <img src={p.image.src} alt={p.image.alt || p.title} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-100 text-[10px] text-muted-foreground dark:bg-zinc-800">—</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-xs">{p.vendor}</td>
                  <td className="px-4 py-3 text-xs">{p.product_type || "—"}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {p.price ? `${p.price.currency} ${p.price.amount}` : "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{p.handle}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => fetchProducts(page - 1)}>Previous</Button>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => fetchProducts(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
