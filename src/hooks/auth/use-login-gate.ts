"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { buildLoginHref, getCurrentLocationPath } from "@/lib/auth/return-url";

/**
 * Redirects to login with an optional return path. If omitted, uses the current URL so the user
 * lands back on the same page after signing in.
 */
export function useLoginGate() {
  const router = useRouter();

  const openLogin = useCallback(
    (returnPath?: string) => {
      const target = returnPath ?? getCurrentLocationPath();
      router.push(buildLoginHref(target));
    },
    [router],
  );

  const replaceWithLogin = useCallback(
    (returnPath?: string) => {
      const target = returnPath ?? getCurrentLocationPath();
      router.replace(buildLoginHref(target));
    },
    [router],
  );

  return { openLogin, replaceWithLogin, buildLoginHref, getCurrentLocationPath };
}
