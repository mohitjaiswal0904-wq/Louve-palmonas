"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";
import { useMessages } from "@/hooks";

export default function OrdersClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const m = useMessages();
  const p = m.pages.orders;

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{m.common.loading}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-12 text-center">
      <h1 className="font-serif text-2xl font-light tracking-tight">{p.comingSoonTitle}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{p.comingSoonBody}</p>
    </div>
  );
}
