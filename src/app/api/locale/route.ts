import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { LOCALE_COOKIE, isLocale } from "@/types/config";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const locale =
    typeof body === "object" &&
    body !== null &&
    "locale" in body &&
    typeof (body as { locale: unknown }).locale === "string"
      ? (body as { locale: string }).locale
      : null;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "invalid locale" }, { status: 400 });
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
