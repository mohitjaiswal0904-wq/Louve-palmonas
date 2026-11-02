import type { Metadata } from "next";

import { HomeView } from "@/views/home/HomeView";

export const metadata: Metadata = {
  title: "LOUVE",
};

/**
 * Home — `/`
 *
 * Server Component shell. The interactive view lives in `HomeView` so the
 * client boundary stays as narrow as possible.
 */
export default function HomeRoute() {
  return <HomeView />;
}
