import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";

export const metadata: Metadata = createMetadata({
  title: `Forgot password — ${seoConfig.siteName}`,
  description: "Password reset — coming soon.",
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/auth/forgot-password` : undefined,
});

export default function ForgotPasswordPage() {
  return <ComingSoon title="Forgot password" />;
}
