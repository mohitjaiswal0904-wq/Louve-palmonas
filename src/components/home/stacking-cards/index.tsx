"use client";

import { useMessages } from "@/hooks";
import { HomeCollections } from "../collections";
import { HomeCTA } from "../cta";
import { CardOne } from "./cards/card-one";
import { CardTwo } from "./cards/card-two";
import { CardThree } from "./cards/card-three";
import { CardFour } from "./cards/card-four";
import { CardFive } from "./cards/card-five";
import { CardSix } from "./cards/card-six";
import { CardSeven } from "./cards/card-seven";
import { CardItem } from "./card-item";
import { CardData } from "./types";

import { useStackScroll } from "./use-stack-scroll";

export function HomeStackingCards() {
  const m = useMessages();
  const { currentIndex } = useStackScroll(9); // Updated to 9 cards

  const CARDS: CardData[] = [
    {
      id: "hero",
      component: <CardOne />,
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      id: "collection-wolves",
      component: <CardTwo />,
      bgColor: "bg-[#E5E7EB]",
      textColor: "text-zinc-900",
    },
    {
      id: "collection-rings",
      component: <CardThree />,
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "feature-side-by-side",
      component: <CardFour />,
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "feature-cinematic-triptych",
      component: <CardFive />,
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "feature-quad-gallery",
      component: <CardSix />,
      bgColor: "bg-zinc-900",
      textColor: "text-white",
    },
    {
      id: "feature-dual-symmetric",
      component: <CardSeven />,
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "collections",
      component: (
        <div className="h-full w-full px-[46px] flex flex-col justify-center">
          <HomeCollections />
        </div>
      ),
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "cta",
      component: (
        <div className="h-full w-full px-[46px] flex flex-col justify-center">
          <HomeCTA />
        </div>
      ),
      bgColor: "bg-zinc-50",
      textColor: "text-zinc-900",
    },
  ];

  return (
    <div className="relative w-full min-w-0 max-w-full touch-pan-y overflow-x-hidden [overscroll-behavior-x:none]">
      {CARDS.map((card, index) => (
        <CardItem
          key={card.id}
          id={card.id}
          index={index}
          isActive={index === currentIndex}
          bgColor={card.bgColor}
          textColor={card.textColor}
        >
          {card.component}
        </CardItem>
      ))}
    </div>
  );
}
