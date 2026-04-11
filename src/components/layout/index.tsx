import type { ReactNode } from "react";

import { Header } from "./header";
import { Footer } from "./footer";

export { Header } from "./header";
export { Footer } from "./footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh min-w-0 w-full max-w-full flex-col overflow-x-hidden">
      <Header />
      {/* isolate: stacking cards stay under header; pt-16 clears fixed header */}
      <main className="relative isolate min-w-0 flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
