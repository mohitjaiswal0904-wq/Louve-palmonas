import { ok } from "@/lib/http/response";

/**
 * GET /api/v1/health
 *
 * Application liveness probe. Intentionally does not touch the database or
 * any secret-bearing configuration — see /api/v1/db/health for readiness.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return ok({
    status: "ok",
    service: "louve-web",
    time: new Date().toISOString(),
  });
}
