import type { Metadata } from "next";

import { ComingSoon } from "@/components/feature/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Sign up — ${seoConfig.siteName}`,
  description: "Sign up — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/auth/signup` : undefined,
});

export default function SignupPage() {
  return <ComingSoon title="Sign up" />;
}
