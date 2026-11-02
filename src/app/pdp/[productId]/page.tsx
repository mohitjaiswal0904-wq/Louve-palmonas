import type { Metadata } from "next";

import { PdpView } from "@/views/pdp/PdpView";

type PdpRouteProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: PdpRouteProps): Promise<Metadata> {
  const { productId } = await params;
  return {
    title: `${productId} — LOUVE`,
  };
}

export default async function PdpRoute({ params }: PdpRouteProps) {
  const { productId } = await params;
  return <PdpView productId={productId} />;
}
