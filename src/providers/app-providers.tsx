"use client";

import type { ReactNode } from "react";

import type { AppLocale } from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import {
  AuthProvider,
  CatalogProvider,
  HealthProvider,
  LocaleProvider,
  SearchProvider,
} from "@/state";

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
        <CatalogProvider>
          <SearchProvider>
            <HealthProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </HealthProvider>
          </SearchProvider>
        </CatalogProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
