"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    role: string;
    tags: string[];
    tools: string[];
    impact: string;
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            whileHover={{ y: -12, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[2.5rem] hud-glass transition-all duration-500"
        >
            <div className="p-8">
                <div className="mb-6 flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/5 border border-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-foreground/40 transition-colors group-hover:border-primary/50 group-hover:text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter transition-colors group-hover:text-primary">
                    {project.title}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/50 mb-6">{project.role}</p>

                <p className="text-sm text-foreground/60 line-clamp-2 mb-8 leading-relaxed">
                    {project.impact}
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                    {project.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[9px] font-mono text-foreground/30 flex items-center gap-1">
                            <Target className="h-2 w-2 text-primary" /> {tool}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/projects/${project.id}`}
                    className="group/btn relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary hover:text-black"
                >
                    <span className="relative z-10">Deep Dive_</span>
                    <ArrowUpRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </Link>
            </div>

            {/* F1 Speed decoration */}
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rotate-45 bg-gradient-to-br from-primary/20 to-transparent p-0.5 opacity-0 transition-opacity group-hover:opacity-100" />

            {/* HUD Corner accents */}
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40 opacity-20" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-primary/40 opacity-20" />
        </motion.div>
    );
}
