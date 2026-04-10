import type { AppLocale } from "@/types/config";
import { DEFAULT_LOCALE, isLocale } from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import { messages as ar } from "./Arabic/messages";
import { messages as zh } from "./Chinese/messages";
import { messages as de } from "./German/messages";
import { messages as en } from "./English/messages";
import { messages as fr } from "./French/messages";
import { messages as hi } from "./Hindi/messages";
import { messages as ja } from "./Japanese/messages";
import { messages as ko } from "./Korean/messages";
import { messages as pt } from "./Portuguese/messages";
import { messages as es } from "./Spanish/messages";

const byLocale: Record<AppLocale, AppMessages> = {
  en,
  hi,
  fr,
  es,
  de,
  pt,
  zh,
  ar,
  ja,
  ko,
};

export function resolveLocale(value: unknown): AppLocale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getMessages(locale: AppLocale): AppMessages {
  return byLocale[locale] ?? byLocale[DEFAULT_LOCALE];
}
