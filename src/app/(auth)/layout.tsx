import type { ReactNode } from "react";

import { SiteLayout } from "@/components/layout";

/**
 * Authenticated area.
 *
 * Real auth/guards will be added later. For now these pages are placeholders.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
