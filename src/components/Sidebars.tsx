"use client";

import { Linkedin, Github, Mail, Instagram, Twitter, Music, Gamepad2, Flag } from "lucide-react";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";

const socials = [
    { icon: Linkedin, href: profile.linkedin, label: "PROFESSIONAL_GRID" },
    { icon: Github, href: profile.github, label: "SOURCE_CONTROLS" },
    { icon: Flag, href: "#", label: "F1_PULSE" }, // F1 Enthusiast
    { icon: Music, href: "#", label: "RHYTHM_SYNC" }, // HipHop Dancer
    { icon: Gamepad2, href: "#", label: "GAMER_LINK" }, // Gamer
];

export function SocialSidebar() {
    return (
        <div className="fixed left-8 bottom-0 z-50 hidden flex-col items-center space-y-8 md:flex">
            <div className="flex flex-col space-y-6">
                {socials.map((social, i) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.2, color: "var(--color-primary)" }}
                        className="group relative flex items-center justify-center p-2 text-foreground/40 transition-all"
                    >
                        <social.icon className="h-5 w-5" />
                        <span className="absolute left-12 whitespace-nowrap bg-primary px-2 py-1 text-[8px] font-black text-black opacity-0 transition-opacity group-hover:opacity-100 uppercase tracking-tighter">
                            {social.label}
                        </span>
                    </motion.a>
                ))}
            </div>
            <div className="h-32 w-px bg-gradient-to-t from-primary/50 to-transparent" />
        </div>
    );
}

export function StatusSidebar() {
    return (
        <div className="fixed right-8 bottom-0 z-50 hidden flex-col items-center space-y-8 md:flex">
            <div className="flex flex-col space-y-12 py-8">
                {[
                    { label: "MISSION", val: "ACTIVE" },
                    { label: "SYNC", val: "BPM_128" },
                    { label: "PING", val: "22ms" },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="vertical-text text-[8px] font-black uppercase tracking-[0.4em] text-foreground/40" style={{ writingMode: "vertical-rl" }}>
                            {stat.label}
                        </span>
                        <span className="mt-2 text-[10px] font-black text-primary glow-red">{stat.val}</span>
                    </div>
                ))}
            </div>
            <div className="h-32 w-px bg-gradient-to-t from-secondary/50 to-transparent" />
        </div>
    );
}
