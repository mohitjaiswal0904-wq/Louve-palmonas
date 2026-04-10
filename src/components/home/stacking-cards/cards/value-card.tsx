"use client";

import { Button } from "@/components/ui/button";

interface ValueCardProps {
  label?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isDark?: boolean;
}

export function ValueCard({
  label,
  title,
  description,
  buttonText = "View Pieces",
  onButtonClick,
  isDark = true,
}: ValueCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
      {label && (
        <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-80">
          {label}
        </p>
      )}
      <h2 className="text-5xl font-light italic md:text-7xl">
        {title}
      </h2>
      <p className="max-w-md text-lg font-light leading-relaxed opacity-90 text-pretty">
        {description}
      </p>
      <Button 
        variant="outline" 
        className={`h-12 px-8 border-current transition-colors ${
          isDark ? "hover:bg-white/10" : "hover:bg-black/10"
        }`}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
