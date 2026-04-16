"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardSixProps {
  images?: string[];
  buttonLink?: string;
}

export function CardSix({
  images = [
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-ninth-image-07a0e150.png",
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-tenth-image-1f0a627c.png",
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-eleventh-image-4ae60074.png",
  ],
  buttonLink = "/products",
}: CardSixProps) {
  return (
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="group relative h-1/4 min-h-0 min-w-0 flex-1 overflow-hidden last:border-none md:h-full md:flex-[1_1_0%] md:last:border-r-0"
        >
          <Image
            src={img}
            alt={`Collection ${idx + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

          <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 md:p-8 lg:p-10">
            <div className="min-w-0 space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                Collection Name
              </h2>
              <p className="max-w-[200px] text-[10px] font-medium uppercase leading-relaxed tracking-widest text-white/80 md:max-w-none md:text-xs">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
              </p>
            </div>

            <div className="pt-2">
              <Link href={buttonLink}>
                <Button
                  size="sm"
                  className="h-8 rounded-none bg-[#77080E] px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-[#5A060A] active:scale-95"
                >
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
