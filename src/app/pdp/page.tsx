import type { Metadata } from "next";

import { PdpView } from "@/views/pdp/PdpView";

export const metadata: Metadata = {
  title: "Product — LOUVE",
};

/**
 * `/pdp` without a product id — preserves the legacy behaviour where
 * `?view=pdp` with no `product` query renders the PDP's default fallback.
 */
export default function PdpIndexRoute() {
  return <PdpView productId={null} />;
}
