"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { ProductGrid } from "@/components/catalog";
import { PopularSearchesSection } from "@/components/layout";
import {
  TrustBisHallmarkIcon,
  TrustBuybackIcon,
  TrustCertifiedIcon,
  TrustReturnExchangeIcon,
} from "@/components/icons/product-trust-icons";
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
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
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

  useEffect(() => {
    setCarouselIndex(0);
  }, [product?.id]);

  const imageCount = product?.images.length ?? 0;

  const goCarousel = useCallback(
    (dir: -1 | 1) => {
      if (imageCount <= 1) return;
      setCarouselIndex((i) => {
        const next = i + dir;
        if (next < 0) return imageCount - 1;
        if (next >= imageCount) return 0;
        return next;
      });
    },
    [imageCount],
  );

  const onCarouselTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onCarouselTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 48) goCarousel(-1);
    else if (dx < -48) goCarousel(1);
  };

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
  const tabs = buildTabs(product, variant);
  const mobileTabs = buildMobileTabs(product);

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
          {/* Hero: mobile carousel + desktop static image */}
          <div className="relative w-full bg-[#f9f9f9] md:border-r md:border-[#F6F1E9]">
            <div className="md:hidden">
              <div
                className="relative aspect-square w-full overflow-hidden"
                onTouchStart={onCarouselTouchStart}
                onTouchEnd={onCarouselTouchEnd}
              >
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[carouselIndex].src}
                    alt={product.images[carouselIndex].alt || product.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="flex h-full min-h-[min(100vw,480px)] items-center justify-center text-sm text-muted-foreground">
                    {m.catalog.noImage}
                  </div>
                )}
              </div>
              {product.images.length > 1 ? (
                <div
                  className="flex justify-center gap-2 py-3"
                  role="tablist"
                  aria-label="Product images"
                >
                  {product.images.map((img, i) => (
                    <button
                      key={img.id}
                      type="button"
                      role="tab"
                      aria-selected={i === carouselIndex}
                      aria-label={`Image ${i + 1} of ${product.images.length}`}
                      onClick={() => setCarouselIndex(i)}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        i === carouselIndex ? "bg-[#C9A88A]" : "bg-zinc-300",
                      )}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative hidden aspect-square w-full overflow-hidden md:block">
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
          </div>

          {/* Buy Box */}
          <div className="flex flex-col justify-center space-y-6 px-4 py-8 md:space-y-8 md:px-12 md:py-12 lg:px-24">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-base font-medium leading-snug tracking-tight text-zinc-800 md:text-xl md:text-2xl md:leading-normal md:text-zinc-900">
                {product.title}
              </h1>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 md:flex-nowrap md:justify-start md:gap-3">
                <span className="text-xl font-bold tabular-nums text-zinc-900 md:text-2xl md:font-semibold">
                  {formatMoney(price.amount, price.currency)}
                </span>
                <p className="text-xs font-normal text-zinc-400 md:text-sm">
                  Inclusive Of All Taxes
                </p>
              </div>
            </div>

            {/* Colors Swatches */}
            <div className="flex items-center gap-4">
              {[
                { name: "Silver", bg: "bg-[#D9D9D9]" },
                { name: "Yellow", bg: "bg-[#E5C16C]" },
                { name: "Rose", bg: "bg-[#E0A091]" },
              ].map((metal, i) => (
                <button
                  key={metal.name}
                  type="button"
                  className={cn(
                    "h-11 w-11 rounded-full border-2 p-1 transition-all",
                    i === 1 ? "border-zinc-300" : "border-zinc-100",
                  )}
                >
                  <div
                    className={cn(
                      "h-full w-full rounded-full shadow-sm",
                      metal.bg,
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-zinc-800">
                Select Ring Size(US)
              </p>
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                {["7", "8", "9", "10"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      const vIdx = product.variants.findIndex(
                        (v) =>
                          v.option1 === size ||
                          v.option2 === size ||
                          v.option3 === size,
                      );
                      if (vIdx !== -1) setSelectedVariant(vIdx);
                    }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center text-xs transition-colors",
                      size === selectedSize
                        ? "rounded-full bg-zinc-900 font-bold text-white shadow-md"
                        : "rounded-full border border-zinc-200 bg-white font-medium text-zinc-900 hover:border-zinc-300 md:border-0 md:bg-transparent md:font-normal md:text-zinc-500 md:hover:text-zinc-900",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="block text-left text-sm font-medium text-blue-600 underline underline-offset-2 md:text-[#77080E] md:no-underline md:hover:underline"
              >
                More Details
              </button>
            </div>

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
            <div className="grid grid-cols-2 gap-3 pt-2 md:hidden">
              <Button
                type="button"
                onClick={() => void runAddToCart("buy")}
                disabled={cartBusy !== null || !variant?.available}
                className="h-12 rounded-md bg-[#1A1A1A] text-sm font-medium text-white hover:bg-black"
              >
                {cartBusy === "buy" ? m.catalog.addingToCart : m.catalog.buyNow}
              </Button>
              <Button
                type="button"
                className="h-12 rounded-md bg-[#E5C16C] text-sm font-medium text-black hover:bg-[#D4B05B]"
              >
                Visit Store
              </Button>
            </div>
            <div className="flex flex-col gap-3 md:hidden">
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-md border-zinc-900 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                Talk To An Expert
              </Button>
              <Button
                type="button"
                onClick={() => void runAddToCart("add")}
                disabled={cartBusy !== null || !variant?.available}
                variant="outline"
                className="h-12 w-full rounded-md border-zinc-900 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                {cartBusy === "add" ? m.catalog.addingToCart : m.catalog.addToCart}
              </Button>
            </div>

            <div className="hidden flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap md:flex">
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
              <Button
                type="button"
                className="h-14 flex-1 rounded-none bg-[#E5C16C] text-sm font-medium text-black hover:bg-[#D4B05B]"
              >
                Visit Store
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-14 flex-1 rounded-none border-zinc-900 text-sm font-medium text-black hover:bg-zinc-50"
              >
                Talk To An Expert
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-6 md:gap-4 md:pt-10">
              {[
                { label: "BIS Hallmark", Icon: TrustBisHallmarkIcon },
                { label: "SGL/IGI Certified", Icon: TrustCertifiedIcon },
                { label: "Lifetime Buyback", Icon: TrustBuybackIcon },
                { label: "Easy Return/Exchange", Icon: TrustReturnExchangeIcon },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 text-center md:gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center md:h-[40.32px] md:w-[40.32px]">
                    <item.Icon className="h-7 w-7 shrink-0 md:h-8 md:w-8" />
                  </div>
                  <span className="text-[9px] font-[400] leading-tight text-[#3E3E3E] md:text-[10px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: tabbed details only (carousel replaces editorial strip) */}
      <section className="border-t border-[#F6F1E9] md:hidden">
        <div className="px-4 py-8">
          <div className="flex border-b border-zinc-200">
            {mobileTabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveMobileTab(i)}
                className={cn(
                  "flex-1 px-1 py-3 text-center text-[11px] font-semibold leading-tight transition-colors",
                  i === activeMobileTab
                    ? "border-b-2 border-zinc-900 text-zinc-900"
                    : "border-b-2 border-transparent text-zinc-500",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="animate-in fade-in pt-6 duration-300">
            {mobileTabs[activeMobileTab]?.content}
          </div>
        </div>
      </section>

      {/* Tablet/Desktop: editorial gallery + sticky tabs (unchanged layout) */}
      <div className="hidden border-t border-[#F6F1E9] md:block">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-0">
            <div className="flex flex-col gap-12 border-r border-[#F6F1E9] py-16 md:py-24">
              {product.images.map((img, i) => (
                <div
                  key={img.id}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#f9f9f9]"
                >
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

            <div className="px-4 py-16 lg:sticky lg:top-24 lg:h-fit lg:py-24 md:px-12 lg:px-24">
              <div className="space-y-12">
                <div className="no-scrollbar flex items-center gap-8 overflow-x-auto border-b border-[#F6F1E9] pb-4">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      className={cn(
                        "relative whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] transition-all",
                        i === activeTab
                          ? "text-zinc-900 after:absolute after:-bottom-[17px] after:left-0 after:h-[2px] after:w-full after:bg-[#77080E]"
                          : "text-zinc-400 hover:text-zinc-600",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

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

function MobileDetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#F6F1E9] py-3 text-sm last:border-b-0">
      <span className="shrink-0 text-zinc-500">{label}</span>
      <span className="max-w-[58%] text-right font-medium leading-snug text-zinc-900">
        {value}
      </span>
    </div>
  );
}

function MobileProductDetailsBody({ product }: { product: ProductDetailDTO }) {
  const optionLine = product.options
    .filter((o) => o.name !== "Title")
    .map((o) => `${o.name}: ${o.values.join(", ")}`)
    .join(" · ");

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900">Metal Details</h3>
        <div className="border-t border-[#F6F1E9]">
          <MobileDetailRow label="Type" value={product.product_type || "Gold"} />
          <MobileDetailRow label="Purity" value="9K" />
          <MobileDetailRow label="Colour" value="Yellow" />
          <MobileDetailRow label="Net weight" value="2.768g" />
          <MobileDetailRow label="Length" value="2.0mm" />
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900">Diamond Details</h3>
          <Link
            href="#diamond-guide"
            className="inline-flex shrink-0 items-center gap-0.5 text-xs text-blue-600 underline underline-offset-2"
          >
            <MapPin className="h-3 w-3" aria-hidden />
            Diamond Guide
          </Link>
        </div>
        <div className="border-t border-[#F6F1E9]">
          <MobileDetailRow label="Shape" value="Round, Square" />
          <MobileDetailRow label="Cut" value="Brilliant" />
          <MobileDetailRow label="Clarity" value="VS" />
          <MobileDetailRow label="Colour" value="F-G" />
          <MobileDetailRow label="No of Diamond" value="2" />
          <MobileDetailRow label="Weight" value="2.567kt" />
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900">Dimensions</h3>
        <div className="border-t border-[#F6F1E9]">
          <MobileDetailRow label="Width" value="9.5mm" />
          <MobileDetailRow label="Height" value="32mm" />
          <MobileDetailRow label="Gross weight" value="1.509 g" />
        </div>
      </section>

      {optionLine ? (
        <p className="text-xs leading-relaxed text-zinc-500">{optionLine}</p>
      ) : null}
    </div>
  );
}

function PriceInfoTabBody({ product }: { product: ProductDetailDTO }) {
  return (
    <div className="space-y-6">
      <p className="text-xs leading-relaxed text-zinc-500">
        The price mentioned includes the cost of the jewelry piece, labor charges,
        and applicable taxes. All prices are subject to change based on current
        gold and diamond market rates.
      </p>
      <table className="w-full">
        <tbody className="divide-y divide-[#F6F1E9]">
          <DetailRow
            label="Base Price"
            value={formatMoney(product.price.amount, product.price.currency)}
          />
          <DetailRow label="GST (3%)" value="Included" />
          <DetailRow label="Shipping" value="Free" />
        </tbody>
      </table>
    </div>
  );
}

function ProductDescriptionBody({ product }: { product: ProductDetailDTO }) {
  const html = product.body_html?.trim();
  if (!html) {
    return (
      <p className="text-sm italic text-zinc-500">
        Full product description will appear here soon.
      </p>
    );
  }
  return (
    <div
      className="text-sm leading-relaxed text-zinc-700 [&_li]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function buildMobileTabs(product: ProductDetailDTO): Tab[] {
  return [
    {
      label: "Product Details",
      content: <MobileProductDetailsBody product={product} />,
    },
    {
      label: "Price Details",
      content: <PriceInfoTabBody product={product} />,
    },
    {
      label: "Description",
      content: <ProductDescriptionBody product={product} />,
    },
  ];
}

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
      content: <PriceInfoTabBody product={product} />,
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
