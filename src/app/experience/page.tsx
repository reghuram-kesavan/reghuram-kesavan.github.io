"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import { Briefcase, MapPin, Calendar, Terminal, Target } from "lucide-react";

export default function ExperiencePage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <header className="mb-32 relative">
                <div className="mb-10 inline-flex items-center space-x-6 bg-primary/5 border border-primary/20 px-10 py-4 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-[14px] font-black uppercase tracking-[0.6em] text-primary">
                        Intel_Logs_Archive
                    </span>
                </div>

                <h1 className="font-outfit text-8xl font-black uppercase tracking-tighter md:text-[10rem] mb-12 text-speed text-white drop-shadow-2xl">
                    INDUSTRIAL <span className="text-primary glow-red">PHASES</span>.
                </h1>

                <p className="max-w-4xl text-3xl font-black opacity-40 uppercase tracking-tight leading-tight">
                    Bridging the absolute gap between academic research and high-stakes industrial deployment.
                </p>
            </header>

            <div className="space-y-24">
                {profile.experience.map((exp, idx) => (
                    <motion.section
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative grid gap-16 lg:grid-cols-12"
                    >
                        {/* Timeline Sidebar with High Impact */}
                        <div className="lg:col-span-3 border-l-4 border-primary pl-10 h-max sticky top-48">
                            <div className="flex items-center gap-4 text-2xl font-black text-primary mb-2">
                                <Calendar className="h-6 w-6" />
                                {exp.period}
                            </div>
                            <div className="flex items-center gap-3 text-xl font-bold text-white/30">
                                <MapPin className="h-4 w-4" />
                                {exp.location}
                            </div>
                        </div>

                        {/* Content Card with HUD Overlay */}
                        <div className="glass-panel hud-corner relative rounded-[4rem] p-16 lg:col-span-9 transition-all hover:bg-white/[0.05] border-2 border-white/10">
                            <div className="mb-12 flex flex-wrap items-end justify-between gap-8 border-b border-white/5 pb-10">
                                <div>
                                    <h3 className="text-5xl font-black text-white group-hover:text-primary transition-all tracking-tighter mb-4">
                                        {exp.role}
                                    </h3>
                                    <div className="text-3xl font-black text-white/40 uppercase tracking-tight">
                                        {exp.company}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {exp.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="rounded-2xl bg-white/5 px-6 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-white/60 border border-white/10 group-hover:border-primary/40 group-hover:text-primary transition-all"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white leading-relaxed text-pretty">
                                {exp.description}
                            </p>

                            {/* HUD Background Element */}
                            <div className="absolute top-10 right-10 opacity-[0.03] grayscale pointer-events-none group-hover:opacity-10 transition-all duration-1000 rotate-12">
                                <Target className="h-64 w-64 text-primary" />
                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>

            <footer className="mt-64 text-center opacity-10">
                <div className="text-[12px] font-black tracking-[1.5em] uppercase">End of Operational Intel</div>
            </footer>
        </div>
    );
}
