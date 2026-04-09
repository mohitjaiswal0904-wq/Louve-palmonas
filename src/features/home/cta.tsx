"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMessages } from "@/hooks/use-messages";

export function HomeCTA() {
  const m = useMessages();

  return (
    <section className="rounded-2xl border bg-card p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{m.brand.tagline}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{m.homeFeature.ctaSubtitle}</p>
        </div>
        <div className="flex gap-3">
          <Button className="h-10 px-5">{m.homeFeature.browseNew}</Button>
          <Button variant="outline" className="h-10 px-5">
            {m.homeFeature.visitStores}
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <div className="font-medium text-foreground">{m.homeFeature.entryLuxury}</div>
          <div>{m.homeFeature.priceEntryLuxury}</div>
        </div>
        <div>
          <div className="font-medium text-foreground">{m.homeFeature.coreRange}</div>
          <div>{m.homeFeature.priceCoreRange}</div>
        </div>
        <div>
          <div className="font-medium text-foreground">{m.homeFeature.elevatedPieces}</div>
          <div>{m.homeFeature.priceElevated}</div>
        </div>
      </div>
    </section>
  );
}
