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
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      <div className="flex min-h-0 min-w-0 w-full flex-col items-start justify-center overflow-y-auto overscroll-contain p-8 md:h-full md:max-h-full md:min-h-0 md:w-1/2 md:flex-none md:p-10 md:px-12 lg:p-20">
        <div className="flex min-h-0 w-full flex-col items-start space-y-6 text-left md:space-y-8 lg:space-y-10">
          <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden sm:min-h-[13rem] md:aspect-[5/3] md:min-h-[14rem] lg:min-h-[16rem]">
            <Image
              src={leftImageUrl}
              alt="Feature Collection"
              fill
              className="object-contain object-left origin-left scale-[2]"
              sizes="(max-width: 768px) 100vw, 56vw"
            />
          </div>

          <div className="w-full min-w-0 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl lg:text-3xl lg:font-semibold">
              {title}
            </h2>
            <p className="max-w-xl text-sm font-normal leading-relaxed text-zinc-500 md:text-base">
              {tagline}
            </p>
            <div className="pt-4">
              <Link href={buttonLink}>
                <Button
                  size="lg"
                  className="h-11 rounded-none bg-[#77080E] px-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:bg-[#5A060A] active:scale-95 lg:font-semibold lg:tracking-widest"
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[40vh] min-h-0 min-w-0 w-full shrink-0 overflow-hidden md:h-full md:max-h-full md:min-w-0 md:flex-[1] md:basis-0 md:self-stretch">
        <Image
          src={rightImageUrl}
          alt="Brand Lifestyle"
          fill
          priority
          className="object-cover scale-[.90]"
          sizes="(max-width: 768px) 100vw, 34vw"
        />
      </div>
    </div>
  );
}
