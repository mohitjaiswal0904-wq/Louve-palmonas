"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";

import { SiteLayout } from "@/components/layout";
import { AppProviders } from "@/providers/app-providers";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE, localeHtmlLang } from "@/types/config";
import { getMessages } from "@/lib/l10n/get-messages";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fallbackMessages = getMessages(DEFAULT_LOCALE);

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const m = fallbackMessages;

  return (
    <html
      lang={localeHtmlLang(DEFAULT_LOCALE)}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <AppProviders
          initialLocale={DEFAULT_LOCALE}
          initialMessages={fallbackMessages}
        >
          <SiteLayout>
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {m.errors.brandLine}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {m.errors.globalTitle}
              </h1>
              <p className="text-sm text-muted-foreground">{m.errors.globalBody}</p>
              <div className="flex gap-3">
                <Button onClick={() => reset()}>{m.errors.retry}</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  {m.errors.goHome}
                </Button>
              </div>
            </div>
          </SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
