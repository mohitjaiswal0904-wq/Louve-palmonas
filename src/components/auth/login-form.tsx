"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks";
import { peekReturnUrlFromWindow } from "@/lib/auth/return-url";

import { AuthCard } from "./auth-card";
import { ProfileCompleteForm } from "./profile-complete-form";

type Step = "phone" | "otp" | "profile";

export function LoginForm() {
  const { sendOTP, verifyOTP, isNewUser } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentStep: Step = isNewUser ? "profile" : step;

  async function handleSendOTP(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await sendOTP({ phone });
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOTP(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await verifyOTP({ phone, code }, { returnTo: peekReturnUrlFromWindow() });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setSubmitting(false);
    }
  }

  if (currentStep === "profile") {
    return <ProfileCompleteForm />;
  }

  if (currentStep === "otp") {
    return (
      <AuthCard
        title="Enter verification code"
        subtitle={`We sent a 6-digit code to ${phone}`}
      >
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="otp" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              OTP Code
            </label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
              autoComplete="one-time-code"
              autoFocus
              className="h-11 text-center text-lg tracking-[0.5em]"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting || code.length !== 6}
            className="h-11 w-full bg-zinc-900 text-sm font-medium tracking-wide text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {submitting ? "Verifying..." : "Verify & Sign in"}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => { setStep("phone"); setCode(""); setError(""); }}
              className="text-xs text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Change phone number
            </button>
            <span className="mx-2 text-xs text-muted-foreground">&middot;</span>
            <button
              type="button"
              onClick={() => { void handleSendOTP({ preventDefault: () => {} } as FormEvent); }}
              className="text-xs text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Sign in to Louve"
      subtitle="Enter your phone number to continue"
    >
      <form onSubmit={handleSendOTP} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            autoFocus
            className="h-11"
          />
          <p className="text-[11px] text-muted-foreground">
            We&apos;ll send you a one-time verification code via SMS.
          </p>
        </div>
        <Button
          type="submit"
          disabled={submitting || phone.replace(/\D/g, "").length < 10}
          className="h-11 w-full bg-zinc-900 text-sm font-medium tracking-wide text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {submitting ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </AuthCard>
  );
}
