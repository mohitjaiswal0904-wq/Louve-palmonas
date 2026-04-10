"use client";

import { ReactNode } from "react";

interface CardItemProps {
  id: string;
  index: number;
  bgColor: string;
  textColor: string;
  children: ReactNode;
}

export function CardItem({
  id,
  index,
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
      <div className="mx-auto h-full w-full max-w-[1440px] px-[46px] py-24 flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
