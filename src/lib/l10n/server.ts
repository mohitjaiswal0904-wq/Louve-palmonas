import { cookies } from "next/headers";

import {
  LOCALE_COOKIE,
  type AppLocale,
} from "@/types/config";
import type { AppMessages } from "@/types/config/messages";
import { getMessages, resolveLocale } from "./get-messages";

export async function getLocale(): Promise<AppLocale> {
  const store = await cookies();
  return resolveLocale(store.get(LOCALE_COOKIE)?.value);
}

export async function getMessagesForRequest(): Promise<AppMessages> {
  return getMessages(await getLocale());
}
