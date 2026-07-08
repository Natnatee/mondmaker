"use client";

import { useState } from "react";
import Link from "next/link";

const nav_links = [
  { href: "/smart-iot", label: "Smart IoT" },
  { href: "/web-automation", label: "Web & AI" },
  { href: "/3d-printing", label: "3D Printing" },
];

export default function Navbar() {
  const [is_menu_open, setIs_menu_open] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand" onClick={() => setIs_menu_open(false)}>
          <span className="brand-accent">Mond</span>Maker
        </Link>

        {/* ปุ่มแฮมเบอร์เกอร์มือถือ */}
        <button
          className={`navbar-burger ${is_menu_open ? "active" : ""}`}
          onClick={() => setIs_menu_open(!is_menu_open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* เมนูนำทางหลัก */}
        <div className={`navbar-menu-wrapper ${is_menu_open ? "open" : ""}`}>
          <ul className="navbar-links">
            {nav_links.map((link) => (
              <li key={link.href} onClick={() => setIs_menu_open(false)}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <a
            href="https://line.me/ti/p/~0973355322"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta-btn line-btn"
            onClick={() => setIs_menu_open(false)}
          >
            💬 Add Line
          </a>
        </div>
      </div>
    </nav>
  );
}
