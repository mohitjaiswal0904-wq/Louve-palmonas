import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

import AccountClient from "./account-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("account", "/account");
}

export default function AccountPage() {
  return <AccountClient />;
}
