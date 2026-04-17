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
      {/* Small star — viewport-centered on full card, mobile only */}
      <div className="pointer-events-none absolute inset-0 z-20 translate-y-[-5%] translate-x-[28%] flex items-center justify-center opacity-70 md:hidden">
        <svg
          className="h-auto w-[min(55vw,200px)] max-w-[200px]"
          width="215"
          height="215"
          viewBox="0 0 215 215"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M107.284 0L118.081 35.9003C126.829 64.9836 149.584 87.7385 178.667 96.4859L214.567 107.284L178.667 118.081C149.584 126.829 126.829 149.584 118.081 178.667L107.284 214.567L96.4859 178.667C87.7385 149.584 64.9837 126.829 35.9004 118.081L0 107.284L35.9003 96.4859C64.9836 87.7385 87.7385 64.9837 96.4859 35.9004L107.284 0Z" fill="#B95252" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 flex w-full min-h-0 min-w-0 shrink-0 items-stretch justify-start p-0 md:min-h-0 md:w-1/2 md:shrink md:flex-1 md:items-center md:justify-center md:p-12 xl:p-24">
        <div className="relative h-[42vh] w-full max-w-none md:aspect-auto md:h-[60vh] md:max-w-none xl:h-auto xl:w-full xl:max-w-md xl:aspect-square">
          {/* Image Container with Overflow Hidden */}
          <div className="absolute inset-0 overflow-hidden shadow-2xl max-md:shadow-none min-[1367px]:translate-x-[-18%] min-[1367px]:translate-y-[-20%]">
            <Image
              src={leftImageUrl}
              alt="Feature Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          {/* SVG overlay (md+) */}
          <div className="pointer-events-none absolute bottom-0 right-0 z-20 hidden h-[100%] w-[100%] translate-x-[35%] translate-y-[35%] select-none opacity-70 md:bottom-0 md:left-1/2 md:block md:right-auto md:-translate-x-1/2 md:translate-y-[75%] xl:left-auto xl:right-0 xl:translate-x-[35%] xl:translate-y-[35%]">
            <svg
              className="hidden w-full max-w-none min-[1367px]:block"
              width="521"
              height="521"
              viewBox="0 0 521 521"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M260.5 0L286.718 87.1713C307.958 157.79 363.21 213.042 433.829 234.282L521 260.5L433.829 286.718C363.21 307.958 307.958 363.21 286.718 433.829L260.5 521L234.282 433.829C213.042 363.21 157.79 307.958 87.1713 286.718L0 260.5L87.1713 234.282C157.79 213.042 213.042 157.79 234.282 87.1713L260.5 0Z" fill="#D8B38A" fillOpacity="0.2" />
            </svg>
            <svg
              className="hidden w-full max-w-none md:block md:translate-x-24 md:translate-y-[35%] min-[1367px]:hidden"
              width="215"
              height="215"
              viewBox="0 0 215 215"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M107.284 0L118.081 35.9003C126.829 64.9836 149.584 87.7385 178.667 96.4859L214.567 107.284L178.667 118.081C149.584 126.829 126.829 149.584 118.081 178.667L107.284 214.567L96.4859 178.667C87.7385 149.584 64.9837 126.829 35.9004 118.081L0 107.284L35.9003 96.4859C64.9836 87.7385 87.7385 64.9837 96.4859 35.9004L107.284 0Z" fill="#B95252" fillOpacity="0.3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 min-w-0 w-full flex-1 flex-col justify-start overflow-y-auto overflow-x-hidden bg-white px-6 py-8 max-md:min-h-0 md:w-1/2 md:justify-center md:px-14 md:py-12 md:max-h-full lg:px-20 xl:px-32 xl:py-16">
        <div className="absolute inset-0 z-0 hidden select-none opacity-[0.08] pointer-events-none md:block md:opacity-[0.2] xl:opacity-[0.2]">
          <Image
            src={rightImageUrl}
            alt="Section Backdrop"
            fill
            className="object-contain origin-top-right -translate-x-10 -translate-y-100 -rotate-15 scale-[1.25] md:scale-y-[1.60] md:scale-x-[1.74]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="relative z-10 w-full min-w-0 max-w-none space-y-6 text-left md:max-w-md md:space-y-4 xl:space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 max-md:text-balance md:text-[38px] md:font-medium md:leading-[1.1] xl:text-5xl xl:font-semibold xl:leading-tight">
              <span className="md:hidden xl:inline">{title}</span>
              <span className="hidden md:inline xl:hidden">Lorem Ipsum Dolor<br />Sit Amet</span>
            </h2>
            <div className="h-0.5 w-12 bg-[#77080E] md:hidden xl:block" />
          </div>

          <p className="text-sm font-normal leading-relaxed text-zinc-500 opacity-90 max-md:text-left md:text-justify md:text-[13px] md:leading-[1.4] xl:text-left xl:text-base xl:leading-relaxed">
            {body}
          </p>

          <div className="pt-6 max-md:self-start md:pt-4 xl:pt-6">
            <Link href={buttonLink}>
              <Button
                size="lg"
                className="h-11 rounded-none bg-[#710B11] px-12 text-[11px] font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#5A060A] active:scale-95"
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
