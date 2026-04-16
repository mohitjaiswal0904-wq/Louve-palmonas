"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardTwoProps {
  title?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

export function CardTwo({
  title = "Collection Name",
  tagline = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
  buttonText = "Explore More",
  buttonLink = "/products",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-second-image-e383ae4b.png",
}: CardTwoProps) {
  return (
    <div className="relative h-full max-h-full min-h-0 w-full min-w-0 max-w-full overflow-x-hidden overflow-y-hidden bg-white">
      <Image
        src={imageUrl}
        alt="Louve Cinematic Wolves"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute bottom-12 left-0 right-0 z-10 px-6 md:bottom-16 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 md:px-0 max-lg:max-w-full max-lg:overflow-x-hidden lg:bottom-20">
        <div className="border border-white/20 bg-white/90 p-8 text-zinc-900 shadow-2xl backdrop-blur-md transition-all md:p-10 max-lg:min-w-0 max-lg:max-w-[min(100%,calc(100vw-3rem))] max-lg:px-6 lg:bg-white/40 lg:min-w-[440px] lg:max-w-none lg:p-10">
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-sm lg:font-semibold lg:uppercase lg:tracking-[0.22em]">
              {title}
            </h2>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-zinc-500 md:text-base lg:max-w-[340px] lg:text-[10px] lg:font-medium lg:uppercase lg:tracking-widest lg:text-zinc-900 lg:opacity-80">
              {tagline}
            </p>
          </div>

          <div className="pt-6">
            <Link href={buttonLink}>
              <Button
                size="lg"
                className="h-12 rounded-none bg-[#77080E] px-10 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:bg-[#5A060A] active:scale-95 lg:h-10 lg:px-10 lg:text-[10px] lg:font-semibold lg:tracking-widest"
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
