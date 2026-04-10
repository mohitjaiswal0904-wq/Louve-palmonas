"use client";

import { ReactNode } from "react";

interface CardItemProps {
  id: string;
  index: number;
  isActive: boolean;
  bgColor: string;
  textColor: string;
  children: ReactNode;
}

export function CardItem({
  id,
  index,
  isActive,
  bgColor,
  textColor,
  children,
}: CardItemProps) {
  return (
    <section
      key={id}
      className={`sticky top-0 h-screen w-full overflow-hidden ${bgColor} ${textColor} transition-all duration-700 ease-in-out`}
      style={{ 
        zIndex: index + 1,
      }}
    >
      <div 
        className={`h-full w-full transition-all duration-1000 ease-out ${
          isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
