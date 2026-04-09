"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>We hit an issue</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Please refresh the page. If it persists, try again later.
          </p>
          <button
            onClick={() => reset()}
            style={{ marginTop: 12, padding: "10px 14px", cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
