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
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:h-full md:max-h-full">
        <div className="relative min-h-0 flex-1 basis-0 overflow-hidden">
          <Image
            src={leftTopImageUrl}
            alt="Jewelry Detail Top"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative min-h-0 flex-1 basis-0 overflow-hidden border-t-2 border-white">
          <Image
            src={leftBottomImageUrl}
            alt="Jewelry Detail Bottom"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-white p-8 md:h-full md:max-h-full md:p-14 lg:p-32">
        <div className="relative aspect-[3/4] h-full max-h-full min-h-0 w-full min-w-0 overflow-hidden shadow-xl">
          <Image
            src={rightImageUrl}
            alt="Lifestyle Showcase"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
            <Link href={buttonLink}>
              <Button className="h-10 rounded-none border-none bg-white px-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-900 shadow-2xl transition-all hover:bg-zinc-100 active:scale-95">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
