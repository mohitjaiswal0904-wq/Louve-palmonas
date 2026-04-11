"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardOneProps {
  title?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

export function CardOne({
  title = "Lorem Ipsum Dolor Sit Amet",
  tagline = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
  buttonText = "Explore More",
  buttonLink = "/products",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-first-image-322f7522.png",
}: CardOneProps) {
  return (
    <div className="relative flex h-full min-h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Background Star Shape (Decorative) */}
      <div className="absolute -left-[5%] top-1/2 -z-0 h-[80%] w-[60%] -translate-y-1/2 opacity-80 pointer-events-none select-none md:h-[90%]">
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
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 py-20 text-center md:w-[65%] md:px-14 lg:px-32">
        <div className="flex max-w-lg flex-col items-center space-y-4">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-3xl md:text-[32px] lg:text-[42px]">
            {title}
          </h1>
          <p className="max-w-sm text-sm font-normal leading-relaxed text-zinc-500 md:text-base">
            {tagline}
          </p>
          <div className="pt-4">
            <Link href={buttonLink}>
              <Button
                size="lg"
                className="h-11 rounded-none bg-[#77080E] px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#5A060A] hover:shadow-xl active:scale-95"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-full md:w-[35%]">
        <Image
          src={imageUrl}
          alt="Louve Collection"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 35vw, 35vw"
        />
      </div>

      {/* Corner Details (Optional branding) */}
      <div className="absolute bottom-6 left-10 text-[9px] font-semibold uppercase tracking-[0.4em] text-zinc-300 md:left-20 lg:left-32">
        High Jewelry Collection
      </div>
    </div>
  );
}
