import { brand } from "@/lib/config/brand";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--louve-soft-ivory)] ring-1 ring-foreground/10">
      <div className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            From the house of Palmonas
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {brand.name}
          </h1>
          <p className="text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            Instinct. Independence. Territory. Quiet power — contemporary fine jewellery chosen and
            worn with intention.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-10 px-5">Shop collections</Button>
            <Button variant="outline" className="h-10 px-5">
              Explore the brand
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--louve-aurora-forest)] p-4 text-[var(--louve-soft-ivory)]">
              <div className="text-sm font-medium">Instinct</div>
              <div className="mt-1 text-xs opacity-90">Jewellery chosen with confidence.</div>
            </div>
            <div className="rounded-xl bg-[var(--louve-graphite-black)] p-4 text-[var(--louve-soft-ivory)]">
              <div className="text-sm font-medium">Independence</div>
              <div className="mt-1 text-xs opacity-90">Luxury owned by the wearer.</div>
            </div>
            <div className="rounded-xl bg-[var(--louve-primal-rouge)] p-4 text-[var(--louve-soft-ivory)]">
              <div className="text-sm font-medium">Territory</div>
              <div className="mt-1 text-xs opacity-90">Pieces that mark identity.</div>
            </div>
            <div className="rounded-xl bg-[var(--louve-champagne-gold)] p-4 text-[var(--louve-graphite-black)]">
              <div className="text-sm font-medium">Quiet Power</div>
              <div className="mt-1 text-xs opacity-90">Strength expressed through elegance.</div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--louve-champagne-gold)] opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--louve-aurora-forest)] opacity-20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
