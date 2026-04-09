import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { WebSiteJsonLd } from "@/components/seo/structured-data";
import { createMetadata } from "@/components/seo/metadata";
import { seoConfig } from "@/lib/config/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: seoConfig.siteName,
  description: `${seoConfig.defaultDescription} ${seoConfig.brandLine}`,
  canonicalUrl: seoConfig.siteUrl ? `${seoConfig.siteUrl}/` : undefined,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = seoConfig.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {siteUrl ? (
          <WebSiteJsonLd
            name={seoConfig.siteName}
            url={siteUrl}
            description={seoConfig.defaultDescription}
          />
        ) : null}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
