import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <main style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-editorial, serif)" }}>
          Page not found
        </h1>
        <p>The page you’re looking for isn’t here.</p>
        <Link href="/" className="cta">
          Back to home
        </Link>
      </main>
    </div>
  );
}
