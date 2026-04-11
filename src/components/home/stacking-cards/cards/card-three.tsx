"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardThreeProps {
  title?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export function CardThree({
  title = "Collection Name",
  tagline = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
  buttonText = "Explore More",
  buttonLink = "/products",
  leftImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png",
  rightImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png",
}: CardThreeProps) {
  return (
    <div className="relative flex h-full min-h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Left Column: Focused Content */}
      <div className="flex flex-[1.2] flex-col items-center justify-center p-10 md:p-20">
        <div className="flex flex-col space-y-10 max-w-lg w-full">
           {/* Product Image (Rings) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={leftImageUrl}
              alt="Feature Collection"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          
          {/* Text Content */}
          <div className="space-y-4 px-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              {title}
            </h2>
            <p className="max-w-md text-sm font-normal leading-relaxed text-zinc-500 md:text-base">
              {tagline}
            </p>
            <div className="pt-4">
              <Link href={buttonLink}>
                <Button
                  size="lg"
                  className="h-11 rounded-none bg-[#77080E] px-10 text-[11px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#5A060A] active:scale-95 shadow-md"
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Full-Height Lifestyle Portrait */}
      <div className="relative flex-1 h-[60vh] md:h-full overflow-hidden">
        <Image
          src={rightImageUrl}
          alt="Brand Lifestyle"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
