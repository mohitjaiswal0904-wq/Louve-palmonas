"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CardFourProps {
  title?: string;
  body?: string;
  buttonText?: string;
  imageUrl?: string;
}

export function CardFour({
  title = "Lorem Ipsum Dolor Sit Amet",
  body = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  buttonText = "Explore More",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fifth-image-29768f9a.jpg",
}: CardFourProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Left side: Feature Image with Massive Peach Star */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="relative aspect-square w-full max-w-md shadow-2xl">
          <Image
            src={imageUrl}
            alt="Feature Portrait"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          
          {/* Giant Decorative Peach Star overlapping bottom right */}
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-[100%] translate-x-[35%] translate-y-[35%] opacity-70 pointer-events-none select-none">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full fill-[#FADBD8]"
             >
              <path d="M100 0C100 55.2285 144.772 100 200 100C144.772 100 100 144.772 100 200C100 144.772 55.2285 100 0 100C55.2285 100 100 55.2285 100 0Z" />
            </svg>
          </div>

          {/* "Side by Side" Text on the left of the image */}
          {/* <div className="absolute inset-0 z-30 flex items-center justify-start px-8">
             <div className="flex flex-col">
              <span className="text-4xl font-light italic text-white drop-shadow-2xl md:text-5xl lg:text-6xl">Side</span>
              <span className="ml-8 -mt-2 text-2xl font-light italic text-white drop-shadow-xl md:text-3xl">by</span>
              <span className="ml-16 -mt-2 text-4xl font-light italic text-white drop-shadow-2xl md:text-5xl lg:text-6xl">Side</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Right side: Faded Backdrop + Detailed Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-10 md:px-20 lg:px-32">
        {/* Faded Background only for the right section */}
        <div className="absolute inset-0 z-0 opacity-[0.08] select-none pointer-events-none">
          <Image
            src={imageUrl}
            alt="Section Backdrop"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-md space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className="h-0.5 w-12 bg-[#77080E]" />
          </div>
          
          <p className="text-sm font-normal leading-relaxed text-zinc-500 md:text-base opacity-90">
            {body}
          </p>
          
          <div className="pt-6">
            <Button
              size="lg"
              className="h-11 rounded-none bg-[#77080E] px-12 text-[11px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#5A060A] active:scale-95 shadow-lg"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
