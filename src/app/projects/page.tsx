"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";
import { useState } from "react";
import { Layers, Database, Cpu } from "lucide-react";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function ProjectsPage() {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const filteredProjects = activeTag
        ? projects.filter((p) => p.tags.includes(activeTag))
        : projects;

    return (
        <div className="container mx-auto px-6 py-24">
            <header className="mb-24 relative">
                <div className="flex items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">
                    <Database className="h-4 w-4" />
                    Archive_Index_v3.0
                </div>
                <h1 className="font-outfit text-7xl font-black uppercase tracking-tighter md:text-9xl text-speed">
                    ENGINEERING <span className="text-primary glow-red">LOGS</span>.
                </h1>

                {/* HUD Filter Bar */}
                <div className="mt-16 flex flex-wrap gap-4 glass-panel p-6 rounded-2xl hud-corner">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`flex items-center gap-3 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full ${activeTag === null ? "bg-primary text-black" : "text-white/40 hover:text-white"
                            }`}
                    >
                        <Layers className="h-3 w-3" />
                        ALL_STATION
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full border border-white/5 ${activeTag === tag ? "bg-secondary text-black" : "text-white/40 hover:text-secondary group-hover:border-secondary/20"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div
                layout
                className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
            >
                {filteredProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-48 glass-panel rounded-3xl border-dashed">
                    <Cpu className="h-16 w-16 text-white/10 mb-6 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">No matching telemetry found.</p>
                </div>
            )}

            <footer className="mt-48 text-center opacity-20">
                <div className="text-[8px] font-mono tracking-[1em] uppercase">End of Encrypted Archive</div>
            </footer>
        </div>
    );
}
