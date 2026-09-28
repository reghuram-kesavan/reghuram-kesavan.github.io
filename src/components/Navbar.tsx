"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePortfolioMode } from "./PortfolioMode";
import { Zap, Rocket } from "lucide-react";

const navItems = [
  { name: "Story", path: "/about" },
  { name: "Intel", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Awards", path: "/awards" },
  { name: "Mission Prep", path: "/mission-prep" },
];

export function Navbar() {
  const pathname = usePathname();
  const { mode, setMode } = usePortfolioMode();

  return (
    <nav className="fixed top-8 z-50 w-full px-4 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-black/50 px-6 sm:px-8 py-4 backdrop-blur-3xl transition-all hover:bg-black/70 shadow-2xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-4 sm:space-x-6 group">
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-primary font-outfit font-black text-black transition-transform group-hover:rotate-12 group-hover:scale-110 shadow-[0_0_25px_rgba(var(--color-primary),0.4)]">
            RK
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase transition-colors group-hover:text-primary text-white">
              Reghuram Kesavan
            </span>
            <span className="text-[8px] font-medium text-white/40 uppercase tracking-widest mt-1">
              {mode === "personal"
                ? "Tactical Gamer · Dancer · Aero"
                : "Aerospace Engineer · CFD"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary",
                pathname === item.path ? "text-primary" : "text-foreground/50"
              )}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 h-[2px] w-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mode Switch & Resume Terminal */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setMode(mode === "personal" ? "professional" : "personal")}
            className="flex h-11 items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 sm:px-5 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary/20 hover:border-primary text-white"
            title="Toggle protocol or press [M]"
          >
            {mode === "personal" ? (
              <>
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline">Tactical_Arena</span>
              </>
            ) : (
              <>
                <Rocket className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline">Cockpit_Aero</span>
              </>
            )}
          </button>

          <Link
            href="/resume"
            className="flex h-11 items-center justify-center rounded-full bg-white/5 border border-white/10 px-5 sm:px-7 text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary hover:text-black hover:border-primary glow-red text-white"
          >
            Terminal_Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
