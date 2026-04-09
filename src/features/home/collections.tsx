import { brand } from "@/lib/config/brand";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HomeCollections() {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Collections</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Each collection holds its own, and works better together.
          </p>
        </div>
        <Badge variant="secondary">Fine jewellery</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {brand.collections.map((c) => (
          <Card key={c.slug} className="hover:ring-foreground/15">
            <CardHeader className="space-y-1">
              <CardTitle>{c.title}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Slug: {c.slug}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
