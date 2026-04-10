"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CardOneProps {
  title?: string;
  tagline?: string;
  buttonText?: string;
  imageUrl?: string;
}

export function CardOne({
  title = "Lorem Ipsum Dolor Sit Amet",
  tagline = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
  buttonText = "Explore More",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-first-image-322f7522.png",
}: CardOneProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Background Star Shape (Decorative) */}
      <div className="absolute -left-[15%] top-1/2 -z-0 h-[80%] w-[60%] -translate-y-1/2 opacity-60 pointer-events-none select-none">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full fill-[#FCF9F2]"
        >
          <path d="M100 0C100 55.2285 144.772 100 200 100C144.772 100 100 144.772 100 200C100 144.772 55.2285 100 0 100C55.2285 100 100 55.2285 100 0Z" />
        </svg>
      </div>

      {/* Left Side: Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-10 md:px-20 lg:px-32">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-md text-sm font-normal leading-relaxed text-zinc-500 md:text-base">
            {tagline}
          </p>
          <div className="pt-6">
            <Button
              size="lg"
              className="h-12 rounded-none bg-[#77080E] px-10 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#5A060A] hover:shadow-lg active:scale-95"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative h-[45vh] flex-1 overflow-hidden md:h-full">
        <Image
          src={imageUrl}
          alt="Louve Collection"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Corner Details (Optional branding) */}
      <div className="absolute bottom-10 left-10 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-300 md:left-20 lg:left-32">
        High Jewelry Collection
      </div>
    </div>
  );
}
