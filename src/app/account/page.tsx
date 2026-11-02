import type { Metadata } from "next";

import { AccountView } from "@/views/account/AccountView";

export const metadata: Metadata = {
  title: "Account — LOUVE",
};

export default function AccountRoute() {
  return <AccountView />;
}
