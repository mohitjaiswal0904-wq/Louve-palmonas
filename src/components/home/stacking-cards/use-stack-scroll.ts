"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to manage automated smooth scroll transitions between stacking cards.
 * It detects scroll direction and automatically completes the transition to the next/previous card.
 */
export function useStackScroll(cardCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const scrollToSection = (index: number) => {
      if (index < 0 || index >= cardCount) return;
      
      isAnimating.current = true;
      setCurrentIndex(index);
      
      window.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });

      // Unlock after the smooth scroll animation is roughly finished
      setTimeout(() => {
        isAnimating.current = false;
      }, 800); 
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const threshold = 20; // Sensitivity threshold
      if (Math.abs(e.deltaY) > threshold) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        scrollToSection(currentIndex + direction);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      if (touchStart.current === null) return;

      const touchEnd = e.touches[0].clientY;
      const delta = touchStart.current - touchEnd;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        e.preventDefault();
        const direction = delta > 0 ? 1 : -1;
        scrollToSection(currentIndex + direction);
        touchStart.current = null; // Reset to prevent multiple triggers in one swipe
      }
    };

    // Use non-passive listeners to allow preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex, cardCount]);

  return { currentIndex };
}
