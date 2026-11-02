"use client";

import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentionally minimal — avoid leaking error details or stacks to the
    // console in production builds. Hook a real reporter in later.
    if (process.env.NODE_ENV !== "production") {
       
      console.error(error);
    }
  }, [error]);

  return (
    <div className="page" role="alert">
      <main style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-editorial, serif)" }}>
          Something went wrong.
        </h1>
        <p>Please try again.</p>
        <button type="button" onClick={reset} className="cta">
          Retry
        </button>
      </main>
    </div>
  );
}
