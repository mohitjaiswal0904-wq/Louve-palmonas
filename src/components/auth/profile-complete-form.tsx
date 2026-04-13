"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks";
import { peekReturnUrlFromWindow } from "@/lib/auth/return-url";

import { AuthCard } from "./auth-card";

export function ProfileCompleteForm() {
  const router = useRouter();
  const { updateProfile, clearNewUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await updateProfile(
        {
          display_name: displayName || undefined,
          email: email || undefined,
        },
        { returnTo: peekReturnUrlFromWindow() },
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Complete your profile"
      subtitle="These details are optional — you can update them later in your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            autoFocus
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="h-11"
          />
          <p className="text-[11px] text-muted-foreground">
            Optional — we&apos;ll use this for order updates and receipts.
          </p>
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full bg-zinc-900 text-sm font-medium tracking-wide text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {submitting ? "Saving..." : "Continue"}
        </Button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              clearNewUser();
              const dest = peekReturnUrlFromWindow() ?? "/";
              router.push(dest);
              router.refresh();
            }}
            className="text-xs text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Skip for now
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
