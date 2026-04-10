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
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}
