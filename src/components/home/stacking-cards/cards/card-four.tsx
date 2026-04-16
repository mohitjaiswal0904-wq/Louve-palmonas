"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardFourProps {
  title?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export function CardFour({
  title = "Lorem Ipsum Dolor Sit Amet",
  body = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  buttonText = "Explore More",
  buttonLink = "/products",
  leftImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-fifth-image-276b5e33.png",
  rightImageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-fourth-image-69311786.png",
}: CardFourProps) {
  return (
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="relative aspect-square w-full max-w-md">
          {/* Image Container with Overflow Hidden */}
          <div className="absolute inset-0 overflow-hidden shadow-2xl">
            <Image
              src={leftImageUrl}
              alt="Feature Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          {/* SVG Overlay outside of overflow strictures */}
          <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-[100%] w-[100%] translate-x-[35%] translate-y-[35%] select-none opacity-70">
            <svg width="521" height="521" viewBox="0 0 521 521" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M260.5 0L286.718 87.1713C307.958 157.79 363.21 213.042 433.829 234.282L521 260.5L433.829 286.718C363.21 307.958 307.958 363.21 286.718 433.829L260.5 521L234.282 433.829C213.042 363.21 157.79 307.958 87.1713 286.718L0 260.5L87.1713 234.282C157.79 213.042 213.042 157.79 234.282 87.1713L260.5 0Z" fill="#D8B38A" fill-opacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden px-8 py-10 md:max-h-full md:px-14 md:py-12 lg:px-32 lg:py-16">
        <div className="absolute inset-0 z-0 select-none opacity-[0.08] pointer-events-none">
          <Image
            src={rightImageUrl}
            alt="Section Backdrop"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="relative z-10 min-w-0 max-w-md space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className="h-0.5 w-12 bg-[#77080E]" />
          </div>

          <p className="text-sm font-normal leading-relaxed text-zinc-500 opacity-90 md:text-base">
            {body}
          </p>

          <div className="pt-6">
            <Link href={buttonLink}>
              <Button
                size="lg"
                className="h-11 rounded-none bg-[#77080E] px-12 text-[11px] font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#5A060A] active:scale-95"
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
