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
  leftTopImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-sixth-image-7a3d0836.png",
  leftBottomImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-seventh-image-e61a3850.png",
  rightImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-eighth-image-948be1da.png",
}: CardFiveProps) {
  return (
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:h-full md:max-h-full">
        <div className="relative min-h-0 w-full flex-1 basis-0 overflow-hidden">
          <Image
            src={leftTopImageUrl}
            alt="Jewelry Detail Top"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative min-h-0 w-full flex-1 basis-0 overflow-hidden">
          <Image
            src={leftBottomImageUrl}
            alt="Jewelry Detail Bottom"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-white md:h-full md:max-h-full">
        <div className="relative h-[50vh] w-full min-h-0 min-w-0 overflow-hidden shadow-xl md:h-[80%]">
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
