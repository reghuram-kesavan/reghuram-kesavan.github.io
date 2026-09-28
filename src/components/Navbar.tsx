"use client";
import { LanguagePicker, useReaderLanguage } from "./ReaderLanguage";
import Link from "next/link";
import { ModeSwitch, usePortfolioMode } from "./PortfolioMode";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Profile", "/profile"],
  ["Contact", "/contact"],
];

export function Navbar() {
  const { t } = useReaderLanguage();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { mode } = usePortfolioMode();

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Reghuram Kesavan — home">
          <span className="brand-mark">
            rk<span>.</span>
          </span>
          <span className="brand-name">
            Reghuram Kesavan
            <small>
              {mode === "personal"
                ? "Aerospace engineer"
                : "Aerodynamics & propulsion"}
            </small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, url]) => (
            <Link
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
            >
              {t(name)}
            </Link>
          ))}
        </nav>
        <ModeSwitch />
        <LanguagePicker />
        <a
          className="nav-cv"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          {t("View CV")} <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <div className="mobile-mode-wrap mb-4">
            <ModeSwitch />
            <LanguagePicker />
          </div>
          {links.map(([name, url]) => (
            <Link key={url} href={url} onClick={() => setOpen(false)}>
              {t(name)}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
