import type { AppLocale } from "@/types/config";
import { DEFAULT_LOCALE, isLocale } from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import { messages as en } from "./English/messages";
import { messages as fr } from "./French/messages";
import { messages as hi } from "./Hindi/messages";
import { messages as es } from "./Spanish/messages";

const byLocale: Record<AppLocale, AppMessages> = {
  en,
  hi,
  fr,
  es,
};

export function resolveLocale(value: unknown): AppLocale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getMessages(locale: AppLocale): AppMessages {
  return byLocale[locale] ?? byLocale[DEFAULT_LOCALE];
}
