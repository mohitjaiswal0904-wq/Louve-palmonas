import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Lightweight probe for the Next.js runtime (frontend / BFF process).
 * Does not check the Go backend — use `/api/v1/health` via the BFF for that.
 */
export async function GET() {
  return NextResponse.json({
    status: "up",
    timestamp: new Date().toISOString(),
    node: process.version,
    environment: process.env.NODE_ENV ?? "development",
  });
}
