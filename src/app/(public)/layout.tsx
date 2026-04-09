import type { ReactNode } from "react";

import { SiteLayout } from "@/components/layout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
