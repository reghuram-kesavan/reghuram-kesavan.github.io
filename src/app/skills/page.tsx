"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import { PenTool, Wind, Hammer, Cpu, ShieldCheck } from "lucide-react";

const icons = {
    "CAD/PLM": PenTool,
    "Simulation & CFD": Wind,
    "Manufacturing & NDT": Hammer,
    "Software & Tools": Cpu,
};

export default function SkillsPage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <header className="mb-32 relative text-center">
                <div className="mb-10 inline-flex items-center space-x-4 bg-primary/5 border border-primary/20 px-8 py-3 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-primary">
                        Arsenel_Certification_v4
                    </span>
                </div>

                <h1 className="font-outfit text-8xl font-black uppercase tracking-tighter md:text-[10rem] mb-12 text-speed text-white drop-shadow-2xl">
                    SYSTEM <span className="text-primary glow-red">STACKS</span>.
                </h1>

                <p className="mx-auto max-w-4xl text-3xl font-black opacity-40 uppercase tracking-tight leading-tight">
                    Structured by domain_ Reflecting high-fidelity R&D workflows from archival CAD to numeric validation.
                </p>
            </header>

            <div className="grid gap-12 md:grid-cols-2">
                {Object.entries(profile.skills).map(([category, items], idx) => {
                    const Icon = icons[category as keyof typeof icons] || Cpu;
                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-panel hud-corner p-12 rounded-[3.5rem] border-2 border-white/10 hover:border-primary/50 transition-all group"
                        >
                            <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 text-primary border-2 border-primary/20 transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                                <Icon className="h-10 w-10" />
                            </div>
                            <h3 className="mb-12 text-5xl font-black tracking-tighter text-white uppercase">{category}</h3>

                            <ul className="space-y-10">
                                {items.map((skill) => (
                                    <li key={skill} className="flex flex-col gap-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">{skill}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Operational</span>
                                        </div>
                                        {/* Visual Progress/Indicator */}
                                        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_20px_rgba(var(--color-primary),0.5)]"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>

            {/* Industrial Highlight */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-48 glass-panel p-20 rounded-[4rem] text-center border-2 border-white/5"
            >
                <h3 className="mb-10 text-5xl font-black uppercase tracking-tighter text-white">INDUSTRIAL_COMPLIANCE</h3>
                <p className="max-w-4xl mx-auto text-2xl font-bold text-white/40 leading-relaxed">
                    Proficient in <span className="text-white">GD&T (ASME Y14.5)</span>, <span className="text-white">Teamcenter PLM</span> workflows, and specialized aerospace documentation standards.
                    Proven track record with high-fidelity solvers including <span className="text-primary italic">Ansys Fluent</span> and <span className="text-secondary italic">Simcenter</span>.
                </p>
            </motion.div>
        </div>
    );
}
