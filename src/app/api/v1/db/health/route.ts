import { checkDatabaseConnection } from "@/server/db/prisma";
import { fail, ok, toErrorResponse } from "@/lib/http/response";

/**
 * GET /api/v1/db/health
 *
 * Database readiness probe. Returns 503 when the DB is unreachable. The
 * response intentionally does NOT include the connection string, hostname,
 * driver, or any other infrastructure detail.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await checkDatabaseConnection();
    if (result.ok) {
      return ok({ database: "ready" });
    }
    return fail("SERVICE_UNAVAILABLE", "Database is not ready.");
  } catch (error) {
    return toErrorResponse(error);
  }
}
