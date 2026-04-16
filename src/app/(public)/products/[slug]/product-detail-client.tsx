"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductGrid } from "@/components/catalog";
import { PopularSearchesSection } from "@/components/layout";
import {
  TrustBisHallmarkIcon,
  TrustBuybackIcon,
  TrustCertifiedIcon,
  TrustReturnExchangeIcon,
} from "@/components/icons/product-trust-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth, useCatalog, useCart, useLoginGate, useMessages } from "@/hooks";
import { cn } from "@/lib/utils";
import type { ProductDetailDTO, ProductDTO } from "@/types";

export default function ProductDetailClient({ handle }: { handle: string }) {
  const m = useMessages();
  const catalog = useCatalog();
  const cart = useCart();
  const { user } = useAuth();
  const { openLogin } = useLoginGate();
  const router = useRouter();

  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [similar, setSimilar] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartBusy, setCartBusy] = useState<null | "add" | "buy">(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState("7");
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
        }).catch(() => { });
      }
    }).catch(() => { }).finally(() => setLoading(false));
  }, [catalog, handle]);

  useEffect(() => {
    if (!product?.variants.length) return;
    const idx = product.variants.findIndex((v) => v.available);
    setSelectedVariant(idx !== -1 ? idx : 0);
  }, [product?.id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <p className="text-sm text-muted-foreground">{m.common.loading}…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 bg-white">
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

  const tabs = buildTabs(product, variant);

  const runAddToCart = async (mode: "add" | "buy") => {
    if (!variant?.available || cartBusy) return;
    if (!user) {
      openLogin();
      return;
    }
    setCartError(null);
    setCartBusy(mode);
    try {
      await cart.addToCart({
        product_id: product.id,
        variant_id: variant.id,
        quantity: 1,
      });
      if (mode === "buy") router.push("/cart");
    } catch (err: unknown) {
      setCartError(err instanceof Error ? err.message : "Could not update cart");
    } finally {
      setCartBusy(null);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* ── Section 1: Hero Purchase Area ── */}
      <div className="w-full border-b border-[#F6F1E9]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Main Hero Image */}
          <div className="relative aspect-square w-full bg-[#f9f9f9] overflow-hidden border-r border-[#F6F1E9]">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {m.catalog.noImage}
              </div>
            )}
          </div>

          {/* Buy Box */}
          <div className="flex flex-col justify-center space-y-8 px-6 py-12 md:px-12 lg:px-24">
            <div className="space-y-4">
              <h1 className="text-xl font-medium tracking-tight text-zinc-900 md:text-2xl">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-zinc-900">
                  {formatMoney(price.amount, price.currency)}
                </span>
                <p className="text-sm font-normal text-zinc-400">
                  Inclusive Of All Taxes
                </p>
              </div>
            </div>

            {/* Colors Swatches */}
            <div className="flex items-center gap-4">
              {[
                { name: "Silver", bg: "bg-[#D9D9D9]" },
                { name: "Yellow", bg: "bg-[#E5C16C]" },
                { name: "Rose", bg: "bg-[#E0A091]" }
              ].map((metal, i) => (
                <button
                  key={metal.name}
                  className={cn(
                    "h-11 w-11 rounded-full border-2 p-1 transition-all",
                    i === 1 ? "border-zinc-300" : "border-zinc-100"
                  )}
                >
                  <div className={cn("h-full w-full rounded-full shadow-sm", metal.bg)} />
                </button>
              ))}
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-zinc-800">
                Select Ring Size(US)
              </p>
              <div className="flex items-center gap-8">
                {["7", "8", "9", "10"].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      // Update variant if a match is found in the actual product data
                      const vIdx = product.variants.findIndex(v => 
                        v.option1 === size || v.option2 === size || v.option3 === size
                      );
                      if (vIdx !== -1) setSelectedVariant(vIdx);
                    }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center text-xs",
                      size === selectedSize
                        ? "rounded-full bg-zinc-900 font-bold text-white shadow-md"
                        : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="block text-sm font-medium text-[#77080E] hover:underline">
                More Details
              </button>
            </div>

            {/* CTAs */}
            {variant && !variant.available ? (
              <p className="text-sm text-destructive" role="status">
                {m.catalog.variantUnavailable}
              </p>
            ) : null}
            {cartError ? (
              <p className="text-sm text-destructive" role="alert">
                {cartError}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                onClick={() => void runAddToCart("add")}
                disabled={cartBusy !== null || !variant?.available}
                variant="outline"
                className="h-14 flex-1 rounded-none border-zinc-900 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                {cartBusy === "add" ? m.catalog.addingToCart : m.catalog.addToCart}
              </Button>
              <Button
                type="button"
                onClick={() => void runAddToCart("buy")}
                disabled={cartBusy !== null || !variant?.available}
                className="h-14 flex-1 rounded-none bg-[#1A1A1A] text-sm font-medium text-white hover:bg-black"
              >
                {cartBusy === "buy" ? m.catalog.addingToCart : m.catalog.buyNow}
              </Button>
              <Button type="button" className="h-14 flex-1 rounded-none bg-[#E5C16C] text-sm font-medium text-black hover:bg-[#D4B05B]">
                Visit Store
              </Button>
              <Button type="button" variant="outline" className="h-14 flex-1 rounded-none border-zinc-900 text-sm font-medium text-black hover:bg-zinc-50">
                Talk To An Expert
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-4 pt-10">
              {[
                { label: "BIS Hallmark", Icon: TrustBisHallmarkIcon },
                { label: "SGL/IGI Certified", Icon: TrustCertifiedIcon },
                { label: "Lifetime Buyback", Icon: TrustBuybackIcon },
                { label: "Easy Return/Exchange", Icon: TrustReturnExchangeIcon },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5C16C]/10">
                    <item.Icon className="h-6 w-6 shrink-0" />
                  </div>
                  <span className="text-[8px] font-medium leading-tight text-zinc-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Editorial Gallery & Sticky Sidebar ── */}
      <div className="border-t border-[#F6F1E9]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-0">

            {/* Left Col: Vertical Gallery */}
            <div className="flex flex-col gap-12 py-16 md:py-24 border-r border-[#F6F1E9]">
              {product.images.map((img, i) => (
                <div key={img.id} className="relative aspect-[3/4] w-full bg-[#f9f9f9] overflow-hidden rounded-sm group">
                  <Image
                    src={img.src}
                    alt={img.alt || `${product.title} view ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Right Col: Sticky Tech Specs / Tabs */}
            <div className="lg:h-fit lg:sticky lg:top-24 py-16 lg:py-24 px-4 md:px-12 lg:px-24">
              <div className="space-y-12">
                {/* Horizontal Tab Headers */}
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-[#F6F1E9] pb-4">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={cn(
                        "whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative",
                        i === activeTab
                          ? "text-zinc-900 after:absolute after:-bottom-[17px] after:left-0 after:h-[2px] after:w-full after:bg-[#77080E]"
                          : "text-zinc-400 hover:text-zinc-600"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Active Tab Content */}
                <div className="animate-in fade-in duration-500">
                  {tabs[activeTab]?.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Similar Products ── */}
      {similar.length > 0 && (
        <section className="w-full border-t border-[#F6F1E9] py-24">
          <h2 className="text-xl font-light tracking-[0.1em] text-zinc-900 md:text-2xl mb-12">
            {m.catalog.similarProducts}
          </h2>
          <ProductGrid products={similar} size="sm" columns="grid-cols-2 lg:grid-cols-4" />
        </section>
      )}

      <PopularSearchesSection />
    </div>
  );
}

type Tab = { label: string; content: ReactNode };

function buildTabs(
  product: ProductDetailDTO,
  variant: ProductDetailDTO["variants"][0] | undefined,
): Tab[] {
  const tabs: Tab[] = [
    {
      label: "Product Details",
      content: (
        <table className="w-full">
          <tbody className="divide-y divide-[#F6F1E9]">
            <DetailRow label="Product Type" value={product.product_type} />
            <DetailRow label="Vendor" value={product.vendor} />
            <DetailRow label="Material" value="18KT Yellow Gold" />
            <DetailRow label="Metal Color" value="Yellow" />
            <DetailRow label="Karat" value="18k" />
            <DetailRow label="Diamond Weight" value="1.50 CT" />
            <DetailRow label="Item Code" value="LV-MNG-W" />
            <DetailRow label="Origin" value="Lab Grown" />
            {product.options
              .filter((o) => o.name !== "Title")
              .map((o) => (
                <DetailRow key={o.name} label={o.name} value={o.values.join(", ")} />
              ))}
          </tbody>
        </table>
      ),
    },
    {
      label: "Price Info",
      content: (
        <div className="space-y-6">
          <p className="text-xs text-zinc-500 leading-relaxed">
            The price mentioned includes the cost of the jewelry piece, labor charges, and applicable taxes.
            All prices are subject to change based on current gold and diamond market rates.
          </p>
          <table className="w-full">
            <tbody className="divide-y divide-[#F6F1E9]">
              <DetailRow label="Base Price" value={formatMoney(product.price.amount, product.price.currency)} />
              <DetailRow label="GST (3%)" value="Included" />
              <DetailRow label="Shipping" value="Free" />
            </tbody>
          </table>
        </div>
      ),
    },
    { label: "Shipping & more", content: <div className="text-xs text-zinc-500 italic">Global shipping available. Standard delivery in 5-7 business days.</div> },
    { label: "Returns & Exchange", content: <div className="text-xs text-zinc-500 italic">Hassle-free returns within 30 days of purchase.</div> },
    { label: "Review", content: <div className="text-xs text-zinc-500 italic">Customer reviews will appear here soon.</div> },
  ];

  return tabs;
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <tr className="border-none">
      <td className="py-4 pr-6 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">{label}</td>
      <td className="py-4 text-right text-xs font-medium text-zinc-800">{value}</td>
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
