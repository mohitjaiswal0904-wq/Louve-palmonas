import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
