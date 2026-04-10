"use client";

import type { ReactNode } from "react";

import type { AppLocale } from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import { LocaleProvider } from "@/state/locale-context";
import { AuthProvider } from "@/state/auth-context";

import { LayoutProvider } from "./layout-context";

export function AppProviders({
  children,
  initialLocale,
  initialMessages,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
  initialMessages: AppMessages;
}) {
  return (
    <AuthProvider>
      <LocaleProvider initialLocale={initialLocale} initialMessages={initialMessages}>
        <LayoutProvider>{children}</LayoutProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
