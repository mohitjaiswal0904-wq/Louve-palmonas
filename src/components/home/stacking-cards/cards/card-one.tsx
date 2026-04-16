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
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-first-image-64ecf688.png",
}: CardOneProps) {
  return (
    <div className="relative isolate box-border grid h-full max-h-full min-h-0 w-full min-w-0 max-w-full grid-cols-1 overflow-x-hidden overflow-y-hidden bg-white [contain:layout] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,13fr)_minmax(0,7fr)]">
      {/* Background Star Shape (Decorative) */}
      <div className="pointer-events-none absolute left-0 top-1/2 -z-0 h-[80%] w-[55%] max-w-[60%] -translate-y-1/2 overflow-hidden opacity-80 select-none md:left-1/2 md:top-1/4 md:h-[60%] md:w-[90%] md:-translate-x-1/2 lg:left-0 lg:top-1/2 lg:h-[85%] lg:w-[58%] lg:-translate-y-1/2 lg:translate-x-0 xl:left-0 xl:top-1/2 xl:h-[85%] xl:w-[58%] xl:-translate-y-1/2 2xl:-left-[5%] 2xl:h-[90%] 2xl:w-[60%]">
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
      <div className="relative z-10 flex min-h-0 min-w-0 flex-col items-center justify-center px-10 py-16 text-center md:items-center md:px-20 md:py-32 lg:h-full lg:max-h-full lg:min-h-0 lg:items-start lg:justify-center lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:px-12 lg:py-6 lg:text-left xl:h-full xl:max-h-full xl:min-h-0 xl:items-start xl:justify-center xl:overflow-x-hidden xl:overflow-y-auto xl:overscroll-contain xl:px-6 xl:py-6 xl:text-left 2xl:items-center 2xl:justify-center 2xl:text-center 2xl:px-32 2xl:py-20">
        <div className="flex w-full min-w-0 max-w-lg flex-col items-center space-y-3 md:items-center md:space-y-4 lg:max-w-none lg:items-start lg:space-y-3 xl:max-w-none xl:items-start xl:space-y-3 2xl:max-w-lg 2xl:items-center 2xl:space-y-4">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-3xl md:text-4xl lg:text-[28px] xl:text-[30px] xl:text-balance 2xl:text-[42px]">
            {title}
          </h1>
          <p className="max-w-sm text-sm font-normal leading-relaxed text-zinc-500 md:max-w-md md:text-base 2xl:max-w-sm">
            {tagline}
          </p>
          <div className="pt-4 md:self-center lg:self-start xl:self-start 2xl:self-auto">
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
      <div className="relative h-[50vh] min-h-0 min-w-0 w-full max-w-full overflow-x-hidden overflow-y-hidden md:h-[65vh] lg:h-full lg:max-h-full lg:min-h-0 lg:self-stretch xl:h-full xl:max-h-full xl:min-h-0 xl:self-stretch">
        <Image
          src={imageUrl}
          alt="Louve Collection"
          fill
          priority
          className="object-cover lg:object-center xl:object-right 2xl:object-center"
          sizes="(max-width: 767px) 100vw, (max-width: 1535px) 50vw, 35vw"
        />
      </div>

      {/* Corner Details (Optional branding) */}
      <div className="absolute bottom-6 left-10 text-[9px] font-semibold uppercase tracking-[0.4em] text-zinc-300 lg:left-8 xl:left-8 2xl:left-32">
        High Jewelry Collection
      </div>
    </div>
  );
}
