import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("authForgotPassword", "/auth/forgot-password");
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
