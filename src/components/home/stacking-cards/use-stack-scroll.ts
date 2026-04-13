"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to manage automated smooth scroll transitions between stacking cards.
 * It detects scroll direction and automatically completes the transition to the next/previous card.
 */
export function useStackScroll(cardCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const isAnimating = useRef(false);
  const touchStart = useRef<number | null>(null);
  const prevIndexRef = useRef(0);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TRANSITION_MS = 500;

  // Symmetrical motion: scrolling down → next card enters from bottom; scrolling up →
  // previous front exits to bottom (needs elevated z-index during exit — see CardItem).
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (currentIndex < prev) {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
      setEnteringIndex(null);
      setExitingIndex(prev);
      exitTimerRef.current = setTimeout(() => {
        setExitingIndex(null);
        exitTimerRef.current = null;
      }, TRANSITION_MS);
    } else if (currentIndex > prev) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setExitingIndex(null);
      setEnteringIndex(currentIndex);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = setTimeout(() => {
        setEnteringIndex(null);
        enterTimerRef.current = null;
      }, TRANSITION_MS);
    }
    prevIndexRef.current = currentIndex;
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    };
  }, [currentIndex]);

  // Sync active index from scroll position (scrollbar / trackpad free scroll).
  // While wheel/touch runs a programmatic smooth scroll, skip sync — otherwise
  // floor(scrollY/h) stays on the old section until the animation finishes and would
  // overwrite currentIndex (breaks scroll-down: index jumps back to 0 mid-animation).
  useEffect(() => {
    let rafId: number | null = null;
    const syncIndexFromScroll = () => {
      if (isAnimating.current) return;
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (isAnimating.current) return;
        const h = window.innerHeight || 1;
        const idx = Math.min(
          cardCount - 1,
          Math.max(0, Math.floor(window.scrollY / h)),
        );
        setCurrentIndex((prev) => (prev !== idx ? idx : prev));
      });
    };

    syncIndexFromScroll();
    window.addEventListener("scroll", syncIndexFromScroll, { passive: true });
    window.addEventListener("resize", syncIndexFromScroll);
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncIndexFromScroll);
      window.removeEventListener("resize", syncIndexFromScroll);
    };
  }, [cardCount]);

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

      const threshold = 20; // Sensitivity threshold (vertical)

      // When the gesture is mostly horizontal, stop the browser from panning the page sideways
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 1) {
        e.preventDefault();
        return;
      }

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

  return { currentIndex, exitingIndex, enteringIndex };
}
