"use client";

import { useMessages } from "@/hooks";
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
  const CARDS: CardData[] = [
    {
      id: "hero",
      component: <CardOne />,
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
    },
    {
      id: "collection-wolves",
      component: <CardTwo />,
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
    },
    {
      id: "collection-rings",
      component: <CardThree />,
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
    },
    {
      id: "feature-side-by-side",
      component: <CardFour />,
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
    },
    {
      id: "feature-cinematic-triptych",
      component: <CardFive />,
      bgColor: "bg-zinc-100",
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
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
    }
  ];

  const { currentIndex, enteringIndex, exitingIndex } = useStackScroll(
    CARDS.length,
  );

  return (
    <div className="relative w-full min-w-0 max-w-full touch-pan-y overflow-x-clip [overscroll-behavior-x:none]">
      {CARDS.map((card, index) => (
        <CardItem
          key={card.id}
          index={index}
          activeIndex={currentIndex}
          enteringIndex={enteringIndex}
          exitingIndex={exitingIndex}
          bgColor={card.bgColor}
          textColor={card.textColor}
        >
          {card.component}
        </CardItem>
      ))}
      <div
        className="pointer-events-none w-full shrink-0"
        style={{ height: `${CARDS.length * 100}vh` }}
        aria-hidden
      />
    </div>
  );
}
