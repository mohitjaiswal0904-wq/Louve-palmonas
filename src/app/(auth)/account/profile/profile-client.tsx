"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ProfileView } from "@/components/auth";
import { useAuth, useMessages } from "@/hooks";

export default function ProfileClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const m = useMessages();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">{m.common.loading}</p>
      </div>
    );
  }

  if (!user) return null;

  return <ProfileView />;
}
