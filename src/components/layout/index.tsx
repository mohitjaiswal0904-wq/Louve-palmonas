import type { ReactNode } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

export { Header } from "./header";
export { Sidebar } from "./sidebar";
export { Footer } from "./footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <Sidebar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
