"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { createCsrApiClient } from "@/lib/client";
import * as catalogService from "@/services/catalog.service";
import { ProductGrid } from "@/components/catalog";
import { Badge } from "@/components/ui/badge";
import { useMessages } from "@/hooks";
import type { ProductDetailDTO, ProductDTO } from "@/types";

export default function ProductDetailClient({ handle }: { handle: string }) {
  const m = useMessages();
  const client = useMemo(() => createCsrApiClient(), []);
  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [similar, setSimilar] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    catalogService.getProductByHandle(client, handle).then((res) => {
      if (res.data) {
        setProduct(res.data);
        catalogService.searchProducts(client, {
          q: res.data.product_type || res.data.vendor,
          limit: 4,
        }).then((sr) => {
          const items = (sr.data ?? []).filter((p) => p.handle !== handle);
          setSimilar(items.slice(0, 4));
        }).catch(() => {});
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [client, handle]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{m.common.loading}…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">{m.catalog.productNotFound}</p>
        <Link href="/products" className="text-sm underline underline-offset-4">
          {m.catalog.products}
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const price = variant?.price ?? product.price;
  const compareAt = variant?.compare_at_price ?? product.compare_at_price;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(compareAt!.amount) - parseFloat(price.amount)) /
          parseFloat(compareAt!.amount)) *
          100,
      )
    : 0;

  return (
    <div className="space-y-16">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
            {product.images.length > 0 ? (
              <Image
                src={product.images[selectedImage]?.src ?? product.images[0].src}
                alt={product.images[selectedImage]?.alt || product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {m.catalog.noImage}
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition ${
                    i === selectedImage
                      ? "border-zinc-900 dark:border-zinc-50"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `${product.title} ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {product.vendor}
            </p>
            <h1 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              {product.title}
            </h1>
            <p className="text-xs text-muted-foreground">{product.product_type}</p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {formatMoney(price.amount, price.currency)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatMoney(compareAt!.amount, compareAt!.currency)}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  -{discountPct}%
                </Badge>
              </>
            )}
          </div>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              {product.options
                .filter((o) => o.name !== "Title")
                .map((opt) => (
                  <div key={opt.name} className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {opt.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((v, i) => {
                        const label =
                          opt.name === product.options[0]?.name ? v.option1 :
                          opt.name === product.options[1]?.name ? v.option2 : v.option3;
                        if (!label) return null;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => { setSelectedVariant(i); }}
                            className={`rounded-md border px-3 py-1.5 text-xs transition ${
                              i === selectedVariant
                                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.slice(0, 8).map((t) => (
                <Badge key={t} variant="outline" className="text-[10px] font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {product.body_html && (
            <div
              className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
            />
          )}

          {variant?.sku && (
            <p className="text-[10px] text-muted-foreground">
              {m.catalog.sku}: {variant.sku}
            </p>
          )}
        </div>
      </div>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-light tracking-wide">{m.catalog.similarProducts}</h2>
          <ProductGrid products={similar} />
        </section>
      )}
    </div>
  );
}

function formatMoney(amount: string, currency: string): string {
  const num = parseFloat(amount);
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency} ${num.toFixed(0)}`;
  }
}
