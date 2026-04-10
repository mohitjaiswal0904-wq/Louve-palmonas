"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CardTwoProps {
  title?: string;
  tagline?: string;
  buttonText?: string;
  imageUrl?: string;
}

export function CardTwo({
  title = "Collection Name",
  tagline = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
  buttonText = "Explore More",
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-second-image-661d3664.png",
}: CardTwoProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="Louve Cinematic Wolves"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Content Overlay Box */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-20 md:left-1/2 md:-translate-x-1/2">
        <div className="bg-white/40 border border-white/20 backdrop-blur-sm p-8 md:p-10 min-w-[320px] md:min-w-[440px] text-zinc-900 shadow-xl">
          <div className="space-y-4">
             <h2 className="text-sm font-semibold uppercase tracking-[0.22em] md:text-base">
               {title}
             </h2>
             <p className="text-[10px] md:text-xs font-medium leading-relaxed max-w-[340px] opacity-80 uppercase tracking-widest">
               {tagline}
             </p>
          </div>
          
          <div className="pt-6">
            <Button
              size="lg"
              className="h-10 rounded-none bg-[#77080E] px-10 text-[10px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#5A060A] active:scale-95 shadow-lg"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
