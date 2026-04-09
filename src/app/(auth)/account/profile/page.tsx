import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

import ProfileClient from "./profile-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("account", "/account/profile");
}

export default function ProfilePage() {
  return <ProfileClient />;
}
