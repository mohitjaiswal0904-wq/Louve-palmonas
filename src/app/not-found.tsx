import Link from "next/link";

import { SiteLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {siteConfig.name} · from the house of {siteConfig.parentBrand}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist. Let’s get you back to{" "}
          {siteConfig.name}.
        </p>
        <Link href="/" className="inline-flex">
          <Button>Go home</Button>
        </Link>
      </div>
    </SiteLayout>
  );
}
