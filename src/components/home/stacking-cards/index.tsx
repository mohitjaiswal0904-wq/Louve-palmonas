"use client";

import { useMessages } from "@/hooks";
import { HomeCollections } from "../collections";
import { HomeCTA } from "../cta";
import { HomeHero } from "../hero";
import { CardItem } from "./card-item";
import { ValueCard } from "./cards/value-card";
import { CardData } from "./types";

export function HomeStackingCards() {
  const m = useMessages();

  const CARDS: CardData[] = [
    {
      id: "hero",
      component: <HomeHero />,
      bgColor: "bg-[var(--louve-soft-ivory)]",
      textColor: "text-zinc-900",
    },
    {
      id: "instinct",
      component: (
        <ValueCard 
          label={m.seo.brandLine}
          title={m.homeFeature.instinctTitle}
          description={m.homeFeature.instinctBody}
          buttonText={m.homeFeature.exploreBrand}
          isDark={true}
        />
      ),
      bgColor: "bg-[var(--louve-aurora-forest)]",
      textColor: "text-[var(--louve-soft-ivory)]",
    },
    {
      id: "independence",
      component: (
        <ValueCard 
          label="Intrinsic Values"
          title={m.homeFeature.independenceTitle}
          description={m.homeFeature.independenceBody}
          buttonText="View Pieces"
          isDark={true}
        />
      ),
      bgColor: "bg-[var(--louve-graphite-black)]",
      textColor: "text-[var(--louve-soft-ivory)]",
    },
    {
      id: "territory",
      component: (
        <ValueCard 
          label="Mark your Presence."
          title={m.homeFeature.territoryTitle}
          description={m.homeFeature.territoryBody}
          buttonText="Signature Pieces"
          isDark={true}
        />
      ),
      bgColor: "bg-[var(--louve-primal-rouge)]",
      textColor: "text-[var(--louve-soft-ivory)]",
    },
    {
      id: "quiet-power",
      component: (
        <ValueCard 
          label="Refined globally."
          title={m.homeFeature.quietPowerTitle}
          description={m.homeFeature.quietPowerBody}
          buttonText="Explore Quiet Power"
          isDark={false}
        />
      ),
      bgColor: "bg-[var(--louve-champagne-gold)]",
      textColor: "text-zinc-900",
    },
    {
      id: "collections",
      component: <HomeCollections />,
      bgColor: "bg-white",
      textColor: "text-zinc-900",
    },
    {
      id: "cta",
      component: <HomeCTA />,
      bgColor: "bg-zinc-50",
      textColor: "text-zinc-900",
    },
  ];

  return (
    <div className="relative w-full">
      {CARDS.map((card, index) => (
        <CardItem
          key={card.id}
          id={card.id}
          index={index}
          bgColor={card.bgColor}
          textColor={card.textColor}
        >
          {card.component}
        </CardItem>
      ))}
    </div>
  );
}
