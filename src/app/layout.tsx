import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// Global stylesheets — order mirrors the original Vite entry (src/main.tsx)
// so cascade and specificity remain identical.
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/header.css";
import "@/styles/nav-overlay.css";
import "@/styles/cta.css";
import "@/styles/popular.css";
import "@/styles/responsive.css";
import "@/styles/eyebrow.css";
import "@/styles/glass-panel.css";

export const metadata: Metadata = {
  title: "LOUVE",
  description: "Louve — editorial fine jewellery.",
  icons: {
    icon: "/assets/star.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
