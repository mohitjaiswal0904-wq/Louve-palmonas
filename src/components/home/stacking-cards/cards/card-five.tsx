"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardFiveProps {
  buttonText?: string;
  buttonLink?: string;
  leftTopImageUrl?: string;
  leftBottomImageUrl?: string;
  rightImageUrl?: string;
}

export function CardFive({
  buttonText = "Explore More",
  buttonLink = "/products",
  leftTopImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-sixth-image-bd333072.jpg",
  leftBottomImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
  rightImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg",
}: CardFiveProps) {
  return (
    <div className="relative flex h-full min-h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Left Column: Two Stacked Detail Images */}
      <div className="flex flex-1 flex-col">
        <div className="relative h-1/2 w-full overflow-hidden">
          <Image
            src={leftTopImageUrl}
            alt="Jewelry Detail Top"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative h-1/2 w-full overflow-hidden border-t-2 border-white">
          <Image
            src={leftBottomImageUrl}
            alt="Jewelry Detail Bottom"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Right Column: Framed Lifestyle Showcase */}
      <div className="flex flex-1 items-center justify-center p-12 md:p-20 lg:p-32 bg-white">
        <div className="relative aspect-[3/4] h-full max-h-[85vh] w-full overflow-hidden shadow-xl">
          <Image
            src={rightImageUrl}
            alt="Lifestyle Showcase"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* "Explore More" Overlay Button */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <Link href={buttonLink}>
              <Button
                className="h-10 rounded-none bg-white text-zinc-900 px-10 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all hover:bg-zinc-100 active:scale-95 shadow-2xl border-none"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
