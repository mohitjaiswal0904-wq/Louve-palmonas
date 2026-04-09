import { brand } from "@/lib/config/brand";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function HomeCTA() {
  return (
    <section className="rounded-2xl border bg-card p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{brand.tagline}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Jewellery is a personal signature — chosen, owned, and worn with intention.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="h-10 px-5">Browse new</Button>
          <Button variant="outline" className="h-10 px-5">
            Visit stores
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <div className="font-medium text-foreground">Entry luxury</div>
          <div>₹1L – ₹2.5L</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Core range</div>
          <div>₹2.5L – ₹5L</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Elevated pieces</div>
          <div>₹5L+</div>
        </div>
      </div>
    </section>
  );
}
