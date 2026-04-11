import type { ReactNode } from "react";

import { Header } from "./header";
import { Footer } from "./footer";

export { Header } from "./header";
export { Footer } from "./footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
