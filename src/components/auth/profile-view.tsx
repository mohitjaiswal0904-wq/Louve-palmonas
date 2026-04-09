"use client";

import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfileView() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Not authenticated.</p>
      </div>
    );
  }

  const initials = user.profile?.display_name
    ? user.profile.display_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <div className="mx-auto max-w-lg py-12">
      <Card className="border-0 shadow-sm">
        <CardHeader className="items-center space-y-3 pb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {initials}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-medium tracking-tight">
              {user.profile?.display_name ?? "Louve member"}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid gap-3">
            <Row label="Email" value={user.email} />
            <Row label="Verified" value={user.email_verified ? "Yes" : "No"} />
            <Row label="Status" value={user.status} />
            <Row label="Member since" value={new Date(user.created_at).toLocaleDateString()} />
            {user.profile?.phone && <Row label="Phone" value={user.profile.phone} />}
            {user.profile?.locale && <Row label="Locale" value={user.profile.locale} />}
            {user.profile?.time_zone && <Row label="Time zone" value={user.profile.time_zone} />}
          </div>
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={logout}
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 pb-2 last:border-0 dark:border-zinc-800">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-zinc-900 dark:text-zinc-50">{value}</span>
    </div>
  );
}
