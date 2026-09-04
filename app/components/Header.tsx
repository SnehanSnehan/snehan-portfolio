import Link from "next/link";
import Magnetic from "./Magnetic";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/achievements", label: "Achievements" },
];

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Snehan
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Magnetic>
          <Link
            href="/contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </Magnetic>
      </div>
    </header>
  );
}
