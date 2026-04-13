"use client";

import { CSSProperties, ReactNode } from "react";

interface CardItemProps {
  index: number;
  activeIndex: number;
  enteringIndex: number | null;
  exitingIndex: number | null;
  bgColor: string;
  textColor: string;
  children: ReactNode;
}

/**
 * Scroll down: next card enters from below (future → front). enteringIndex keeps it
 * above the previous card for the duration of the slide.
 * Scroll up: previous front exits downward (exitingIndex keeps it above until done).
 */
export function CardItem({
  index,
  activeIndex,
  enteringIndex,
  exitingIndex,
  bgColor,
  textColor,
  children,
}: CardItemProps) {
  const isFront = index === activeIndex;
  const isPast = index < activeIndex;
  const isExiting = exitingIndex === index;
  const isEntering = enteringIndex === index && isFront;

  const layout: CSSProperties = (() => {
    const h = "calc(100dvh - 4rem)";
    const maxH = "calc(100vh - 4rem)";
    const top = "4rem";
    const full: CSSProperties = {
      top,
      left: 0,
      right: 0,
      width: "auto",
      height: h,
      maxHeight: maxH,
      backfaceVisibility: "hidden",
    };

    if (isExiting) {
      return {
        ...full,
        zIndex: 2000 + index,
        transform: "translate3d(0, 100%, 0)",
      };
    }

    if (isFront) {
      return {
        ...full,
        zIndex: isEntering ? 2000 + index : 1000 + index,
        transform: "translate3d(0, 0, 0)",
      };
    }

    if (isPast) {
      return {
        ...full,
        zIndex: index,
        transform: "translate3d(0, 0, 0)",
      };
    }

    return {
      ...full,
      zIndex: index,
      transform: "translate3d(0, 100%, 0)",
    };
  })();

  const interactive = isFront && !isExiting;

  return (
    <section
      className={`fixed overflow-hidden border border-black/[0.08] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.2)] [transition-property:transform] [transition-duration:500ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${bgColor} ${textColor} ${
        isFront && !isExiting ? "shadow-[0_24px_64px_-14px_rgba(0,0,0,0.38)]" : ""
      }`}
      style={layout}
      aria-hidden={!interactive}
    >
      <div
        className={`relative h-full min-h-0 w-full min-w-0 max-w-full overflow-x-hidden overflow-y-hidden ${
          interactive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
