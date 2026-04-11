"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardSevenProps {
  imageUrl?: string;
  buttonLink?: string;
}

export function CardSeven({
  imageUrl = "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-seventh-image-db258ca5.jpg",
  buttonLink = "/products",
}: CardSevenProps) {
  const columns = [1, 2];

  return (
    <div className="relative flex h-full min-h-full w-full flex-col overflow-hidden bg-white md:flex-row">
      {columns.map((_, idx) => (
        <div 
          key={idx} 
          className="relative flex flex-1 flex-col border-b border-zinc-100 md:border-b-0 md:border-r last:border-none"
        >
          {/* Top Image Section */}
          <div className="relative h-[65%] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Collection Item ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Bottom Content Area */}
          <div className="flex flex-1 flex-col justify-center bg-white p-8 md:p-12 lg:p-16">
            <div className="space-y-4">
               <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
                Collection Name
              </h2>
              <p className="max-w-xs text-sm font-normal leading-relaxed text-zinc-500">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
              </p>
              <div className="pt-4">
                <Link href={buttonLink}>
                  <Button
                    size="lg"
                    className="h-10 rounded-none bg-[#77080E] px-10 text-[10px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#5A060A] active:scale-95 shadow-md"
                  >
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
