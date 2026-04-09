import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("authResetPassword", "/auth/reset-password");
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
