"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardSevenProps {
  imageUrl?: string;
  buttonLink?: string;
}

export function CardSeven({
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
  buttonLink = "/products",
}: CardSevenProps) {
  const columns = [1, 2];

  return (
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      {columns.map((_, idx) => (
        <div
          key={idx}
          className="relative flex min-h-0 min-w-0 flex-1 flex-col border-b border-zinc-100 last:border-b-0 md:h-full md:max-h-full md:border-b-0 md:border-r md:last:border-r-0"
        >
          <div className="relative h-[55vh] min-h-0 w-full shrink-0 overflow-hidden md:h-[58%] md:max-h-[58%]">
            <Image
              src={imageUrl}
              alt={`Collection Item ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-white p-8 md:p-12 lg:p-16">
            <div className="min-w-0 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
                Collection Name
              </h2>
              <p className="max-w-xs text-sm font-normal leading-relaxed text-zinc-500">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
              </p>
              <div className="pt-4">
                <Link href={buttonLink}>
                  <Button
                    size="lg"
                    className="h-10 rounded-none bg-[#77080E] px-10 text-[10px] font-semibold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#5A060A] active:scale-95"
                  >
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
