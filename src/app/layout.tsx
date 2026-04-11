import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { WebSiteJsonLd } from "@/components/seo/structured-data";
import { createMetadata } from "@/components/seo/metadata";
import { AppProviders } from "@/providers/app-providers";
import { getPublicSiteUrl } from "@/lib/config/env";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";
import { localeHtmlLang } from "@/types/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMessages(locale);
  const base = getPublicSiteUrl();
  return createMetadata({
    title: `${m.seo.siteName} — ${m.seo.brandLine}`,
    description: `${m.seo.defaultDescription} ${m.seo.brandLine}`,
    canonicalUrl: base ? `${base}/` : undefined,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = getMessages(locale);
  const siteUrl = getPublicSiteUrl();

  return (
    <html
      lang={localeHtmlLang(locale)}
      className={`${inter.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {siteUrl ? (
          <WebSiteJsonLd
            name={messages.seo.siteName}
            url={siteUrl}
            description={messages.seo.defaultDescription}
          />
        ) : null}
        <AppProviders initialLocale={locale} initialMessages={messages}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
