import Link from "next/link";

const nav_links = [
  { href: "/smart-iot", label: "Smart IoT" },
  { href: "/web-automation", label: "Web & AI" },
  { href: "/3d-printing", label: "3D Printing" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand">
          <span className="brand-accent">Mond</span>Maker
        </Link>
        <ul className="navbar-links">
          {nav_links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
