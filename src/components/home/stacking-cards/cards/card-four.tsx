"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardFourProps {
  title?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

export function CardFour({
  title = "Lorem Ipsum Dolor Sit Amet",
  body = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  buttonText = "Explore More",
  buttonLink = "/products",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fifth-image-29768f9a.jpg",
}: CardFourProps) {
  return (
    <div className="relative flex h-full max-h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-white md:flex-row">
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden p-6 md:p-12 lg:p-24">
        <div className="relative aspect-square w-full max-w-md overflow-hidden shadow-2xl">
          <Image
            src={imageUrl}
            alt="Feature Portrait"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />

          <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-[100%] w-[100%] translate-x-[35%] translate-y-[35%] select-none opacity-70">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full fill-[#FADBD8]"
            >
              <path d="M100 0C100 55.2285 144.772 100 200 100C144.772 100 100 144.772 100 200C100 144.772 55.2285 100 0 100C55.2285 100 100 55.2285 100 0Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden px-8 py-10 md:max-h-full md:px-14 md:py-12 lg:px-32 lg:py-16">
        <div className="absolute inset-0 z-0 select-none opacity-[0.08] pointer-events-none">
          <Image
            src={imageUrl}
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
