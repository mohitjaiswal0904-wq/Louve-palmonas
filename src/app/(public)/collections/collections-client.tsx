"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { createCsrApiClient } from "@/lib/client";
import * as catalogService from "@/services/catalog.service";
import {
  SHOWCASE_COPY_PADDING,
  SHOWCASE_IMAGE_PADDING,
  SHOWCASE_IMAGE_SIZES,
} from "@/components/catalog/product-card";
import { cn } from "@/lib/utils";
import type { CollectionDTO } from "@/types";

export function CollectionsClient() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [collections, setCollections] = useState<CollectionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogService
      .listCollections(client)
      .then((res) => {
        if (res.success && res.data) setCollections(res.data);
      })
      .finally(() => setLoading(false));
  }, [client]);

  const featured = collections.filter((c) => !c.parent_slug && c.slug !== "all");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:px-8">
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl md:text-4xl">
          Our Collections
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
          Explore curated collections of fine jewellery — from everyday essentials to statement pieces for special occasions.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-0 border-l border-t border-[#F6F1E9] dark:border-zinc-800 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-b border-[#F6F1E9] dark:border-zinc-800"
            >
              <div className="animate-pulse">
                <div className="aspect-square bg-zinc-200/70 dark:bg-zinc-800" />
                <div className="space-y-2 border-t border-[#F6F1E9] p-4 dark:border-zinc-800">
                  <div className="h-3 w-1/3 rounded bg-zinc-200/70 dark:bg-zinc-800" />
                  <div className="h-4 w-2/3 rounded bg-zinc-200/70 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-0 border-l border-t border-[#F6F1E9] dark:border-zinc-800 md:grid-cols-3">
          {featured.map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionCard({ collection }: { collection: CollectionDTO }) {
  return (
    <div className="border-r border-b border-[#F6F1E9] dark:border-zinc-800">
      <Link
        href={`/collections/${collection.slug}`}
        className={cn(
          "group flex min-w-0 flex-col bg-white outline-none transition-[box-shadow,background-color] duration-300",
          "hover:bg-zinc-50/80 dark:bg-zinc-950 dark:hover:bg-zinc-900/40",
          "h-full",
        )}
      >
        <div
          className={cn(
            "relative aspect-square bg-[#f9f9f9] dark:bg-zinc-900/35",
            SHOWCASE_IMAGE_PADDING,
          )}
        >
          {collection.image_url ? (
            <Image
              src={collection.image_url}
              alt={collection.title}
              fill
              sizes={SHOWCASE_IMAGE_SIZES}
              className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out group-hover:scale-[1.02] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-3xl font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">
                {collection.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col border-t border-[#F6F1E9] bg-white dark:border-zinc-800 dark:bg-zinc-950",
            SHOWCASE_COPY_PADDING,
          )}
        >
          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500 md:text-[10px] lg:text-[10px] xl:text-[11px] dark:text-zinc-500">
            Collection
          </p>
          <h2 className="line-clamp-2 font-normal leading-snug tracking-tight text-zinc-800 dark:text-zinc-100 text-sm md:text-[13px] lg:text-[15px]">
            {collection.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-[12px] lg:text-sm">
            {collection.description}
          </p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 md:text-[10px] lg:text-[11px]">
            {collection.product_count} product{collection.product_count === 1 ? "" : "s"}
          </p>
          {collection.children && collection.children.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {collection.children.slice(0, 3).map((child) => (
                <span
                  key={child.slug}
                  className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {child.title}
                </span>
              ))}
              {collection.children.length > 3 && (
                <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  +{collection.children.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
