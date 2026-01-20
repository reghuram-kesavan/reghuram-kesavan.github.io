"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

    return (
        <nav className="fixed top-8 z-50 w-full px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-white/5 bg-black/40 px-8 py-4 backdrop-blur-3xl transition-all hover:bg-black/60">
                <Link href="/" className="flex items-center space-x-6 group">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-outfit font-black text-black transition-transform group-hover:rotate-12 group-hover:scale-110 shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">
                        RK
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase transition-colors group-hover:text-primary">
                            Reghuram Kesavan
                        </span>
                        <span className="text-[8px] font-medium text-white/20 uppercase tracking-widest mt-1">
                            Aerospace Engineer
                        </span>
                    </div>
                </Link>
                <div className="hidden space-x-10 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary",
                                pathname === item.path ? "text-primary" : "text-foreground/30"
                            )}
                        >
                            {item.name}
                            {pathname === item.path && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
                <div>
                    <Link
                        href="/resume"
                        className="flex h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 px-8 text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary hover:text-black hover:border-primary glow-red"
                    >
                        Terminal_Access
                    </Link>
                </div>
            </div>
        </nav>
    );
}
