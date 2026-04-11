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
      className={`sticky top-16 h-dvh w-full max-w-full overflow-x-hidden overflow-y-hidden ${bgColor} ${textColor}`}
      style={{ 
        zIndex: index + 1,
      }}
    >
      <div 
        className={`relative h-full min-h-0 w-full min-w-0 max-w-full overflow-x-hidden overflow-y-hidden transition-[opacity,transform] duration-1000 ease-out ${
          isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
