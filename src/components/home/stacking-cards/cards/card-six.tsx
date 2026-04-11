"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardSixProps {
  images?: string[];
  buttonLink?: string;
}

export function CardSix({
  images = [
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-sixth-image-bd333072.jpg",
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
    "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
  ],
  buttonLink = "/products",
}: CardSixProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {images.map((img, idx) => (
        <div 
          key={idx} 
          className="relative flex-1 group overflow-hidden border-b border-white md:border-b-0 md:border-r last:border-none h-1/4 md:h-full"
        >
          {/* Background Image */}
          <Image
            src={img}
            alt={`Collection ${idx + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          
          {/* Bottom Gradient for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

          {/* Bottom Content Area */}
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                Collection Name
              </h2>
              <p className="text-[10px] font-medium leading-relaxed text-white/80 md:text-xs max-w-[200px] uppercase tracking-widest">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
              </p>
            </div>
            
            <div className="pt-2">
              <Link href={buttonLink}>
                <Button
                  size="sm"
                  className="h-8 rounded-none bg-[#77080E] px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#5A060A] active:scale-95 shadow-xl"
                >
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
