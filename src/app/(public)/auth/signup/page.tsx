import type { Metadata } from "next";

import { SignupForm } from "@/components/auth";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("authSignup", "/auth/signup");
}

export default function SignupPage() {
  return <SignupForm />;
}
