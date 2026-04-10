"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ProductGrid } from "@/components/catalog";
import { Badge } from "@/components/ui/badge";
import { useCatalog, useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDetailDTO, ProductDTO } from "@/types";

export default function ProductDetailClient({ handle }: { handle: string }) {
  const m = useMessages();
  const catalog = useCatalog();
  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [similar, setSimilar] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    catalog.getProductByHandle(handle).then((res) => {
      if (res.data) {
        setProduct(res.data);
        catalog.listProducts({
          vendor: res.data.vendor,
          limit: 5,
        }).then((sr) => {
          const items = (sr.data ?? []).filter((p) => p.handle !== handle);
          setSimilar(items.slice(0, 4));
        }).catch(() => {});
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [catalog, handle]);

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

  const tabs = buildTabs(product, variant);

  return (
    <div className="space-y-0">
      {/* ── Hero: image + info ── */}
      <div className="grid grid-cols-1 border-b border-zinc-200/80 md:grid-cols-2 dark:border-zinc-800">
        {/* Main image */}
        <div className="relative aspect-square bg-[#f5f5f3] dark:bg-zinc-900/30">
          {product.images.length > 0 ? (
            <Image
              src={product.images[selectedImage]?.src ?? product.images[0].src}
              alt={product.images[selectedImage]?.alt || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-10 sm:p-14 md:p-16"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {m.catalog.noImage}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-center border-l border-zinc-200/80 bg-white px-6 py-8 sm:px-10 sm:py-12 md:px-14 dark:border-zinc-800 dark:bg-zinc-950">
          <h1 className="text-lg font-medium leading-snug tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatMoney(price.amount, price.currency)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm tabular-nums text-zinc-400 line-through">
                  {formatMoney(compareAt!.amount, compareAt!.currency)}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  -{discountPct}%
                </Badge>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          {/* Variant swatches */}
          {product.variants.length > 1 &&
            product.options
              .filter((o) => o.name !== "Title")
              .map((opt) => (
                <div key={opt.name} className="mt-5 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {opt.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => {
                      const label =
                        opt.name === product.options[0]?.name ? v.option1 :
                        opt.name === product.options[1]?.name ? v.option2 : v.option3;
                      if (!label) return null;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(i)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-xs transition",
                            i === selectedVariant
                              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                              : "border-zinc-300 text-zinc-700 hover:border-zinc-500 dark:border-zinc-600 dark:text-zinc-300",
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.tags.slice(0, 6).map((t) => (
                <Badge key={t} variant="outline" className="text-[10px] font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {variant?.sku && (
            <p className="mt-4 text-[10px] text-muted-foreground">
              {m.catalog.sku}: {variant.sku}
            </p>
          )}
        </div>
      </div>

      {/* ── Editorial image grid (2×2) ── */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-2 border-b border-zinc-200/80 dark:border-zinc-800">
          {product.images.slice(0, 4).map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedImage(i)}
              className={cn(
                "relative aspect-square overflow-hidden border-zinc-200/80 transition-opacity dark:border-zinc-800",
                i % 2 === 0 ? "border-r" : "",
                i < 2 ? "border-b" : "",
                i !== selectedImage && "opacity-80 hover:opacity-100",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt || `${product.title} view ${i + 1}`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Tabs section ── */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="flex overflow-x-auto border-b border-zinc-200/80 dark:border-zinc-800">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(i)}
              className={cn(
                "shrink-0 border-b-2 px-5 py-3.5 text-xs font-medium tracking-wide transition sm:px-8 sm:text-sm",
                i === activeTab
                  ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
                  : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-5 py-8 sm:px-10 sm:py-10">
          {tabs[activeTab]?.content}
        </div>
      </div>

      {/* ── Similar products ── */}
      {similar.length > 0 && (
        <section className="space-y-4 pt-12">
          <h2 className="text-lg font-light tracking-wide">{m.catalog.similarProducts}</h2>
          <ProductGrid products={similar} size="sm" columns="grid-cols-2 sm:grid-cols-4" />
        </section>
      )}
    </div>
  );
}

type Tab = { label: string; content: React.ReactNode };

function buildTabs(
  product: ProductDetailDTO,
  variant: ProductDetailDTO["variants"][0] | undefined,
): Tab[] {
  const tabs: Tab[] = [];

  // Product Details
  tabs.push({
    label: "Product Details",
    content: (
      <table className="w-full text-sm">
        <tbody>
          <DetailRow label="Product Type" value={product.product_type} />
          <DetailRow label="Vendor" value={product.vendor} />
          {variant && <DetailRow label="SKU" value={variant.sku} />}
          {variant && variant.weight > 0 && (
            <DetailRow label="Weight" value={`${variant.weight} ${variant.weight_unit}`} />
          )}
          {product.options
            .filter((o) => o.name !== "Title")
            .map((o) => (
              <DetailRow key={o.name} label={o.name} value={o.values.join(", ")} />
            ))}
        </tbody>
      </table>
    ),
  });

  // Price Details
  const price = variant?.price ?? product.price;
  const compareAt = variant?.compare_at_price ?? product.compare_at_price;
  tabs.push({
    label: "Price Details",
    content: (
      <table className="w-full text-sm">
        <tbody>
          <DetailRow label="Price" value={formatMoney(price.amount, price.currency)} />
          {compareAt && (
            <DetailRow label="MRP" value={formatMoney(compareAt.amount, compareAt.currency)} />
          )}
          <DetailRow label="Currency" value={price.currency} />
          <DetailRow label="Tax" value="Inclusive of all taxes" />
        </tbody>
      </table>
    ),
  });

  // Description
  if (product.body_html) {
    tabs.push({
      label: "Description",
      content: (
        <div
          className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        />
      ),
    });
  }

  return tabs;
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <tr className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
      <td className="py-2.5 pr-6 text-xs font-medium text-zinc-500">{label}</td>
      <td className="py-2.5 text-right text-xs text-zinc-900 dark:text-zinc-100">{value}</td>
    </tr>
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
