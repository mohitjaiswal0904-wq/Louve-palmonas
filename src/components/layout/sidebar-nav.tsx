import Link from "next/link";

const links = [{ href: "/", label: "Home" }];

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-200/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
