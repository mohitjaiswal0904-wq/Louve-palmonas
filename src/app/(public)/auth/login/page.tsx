import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Login — ${seoConfig.siteName}`,
  description: "Login — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/auth/login` : undefined,
});

export default function LoginPage() {
  return <ComingSoon title="Login" />;
}
