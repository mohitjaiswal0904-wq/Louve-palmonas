"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import type { AppLocale } from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import { getMessages } from "@/lib/l10n/get-messages";

type LocaleContextValue = {
  locale: AppLocale;
  messages: AppMessages;
  setLocale: (locale: AppLocale) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
  initialMessages,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
  initialMessages: AppMessages;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);
  const [messages, setMessagesState] = useState<AppMessages>(initialMessages);

  useEffect(() => {
    setLocaleState(initialLocale);
    setMessagesState(getMessages(initialLocale));
  }, [initialLocale]);

  const setLocale = useCallback(async (next: AppLocale) => {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    setLocaleState(next);
    setMessagesState(getMessages(next));
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}
