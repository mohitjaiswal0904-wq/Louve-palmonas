"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ProfileView } from "@/components/auth";
import { useAuth } from "@/hooks";
import { buildLoginHref } from "@/lib/auth/return-url";

export default function AccountClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(buildLoginHref("/account"));
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  return <ProfileView />;
}
