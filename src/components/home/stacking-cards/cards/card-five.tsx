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
      {/* Mobile: bottom image | top image (side by side); md+: top stacked above bottom — unchanged */}
      <div className="flex h-[50vh] min-h-0 w-full shrink-0 flex-row md:h-full md:max-h-full md:min-h-0 md:flex-1 md:shrink md:flex-col">
        <div className="relative min-h-0 w-1/2 flex-1 basis-0 overflow-hidden order-2 md:order-1 md:w-full">
          <Image
            src={leftTopImageUrl}
            alt="Jewelry Detail Top"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 50vw"
          />
        </div>
        <div className="relative min-h-0 w-1/2 flex-1 basis-0 overflow-hidden order-1 md:order-2 md:w-full">
          <Image
            src={leftBottomImageUrl}
            alt="Jewelry Detail Bottom"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 50vw"
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
              <Button className="mb-4 h-10 rounded-none border-none bg-white px-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-900 shadow-2xl transition-all hover:bg-zinc-100 active:scale-95 md:mb-0">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
