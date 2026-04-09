import type { Metadata } from "next";

import { LoginForm } from "@/components/auth";
import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("authLogin", "/auth/login");
}

export default function LoginPage() {
  return <LoginForm />;
}
