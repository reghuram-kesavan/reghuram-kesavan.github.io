"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import { GraduationCap, Languages, Target, User, Cpu, Box } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <div className="grid gap-16 lg:grid-cols-12">
                {/* Left Column: Narrative */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <section className="mb-20">
                        <div className="flex items-center gap-4 text-primary text-[12px] font-black uppercase tracking-[0.6em] mb-10">
                            <User className="h-4 w-4" />
                            Identity_Matrix
                        </div>
                        <h1 className="font-outfit text-6xl font-black tracking-tighter md:text-8xl mb-12 text-speed text-white">
                            Engineering is about <span className="text-primary italic">solving</span> the impossible.
                        </h1>
                        <div className="space-y-10 text-2xl font-bold leading-relaxed text-white">
                            <p>
                                My name is <span className="text-primary">Reghuram Kesavan</span>. I am a technically versatile aerospace engineer currently pursuing my Master of Science at the <span className="underline decoration-primary">Technical University of Munich (TUM)</span>.
                            </p>
                            <p>
                                With a year completed at <span className="text-secondary italic">ISAE-Supaero</span> in Toulouse, I bring a unique cross-European perspective to aerospace R&D, focused on the intersection of structural integrity and aerodynamic efficiency.
                            </p>
                            <p>
                                Whether it's calibrating non-linear FEM models for eVTOL battery systems at <span className="text-primary">Lilium</span> or leading a dance crew to national stages, I thrive at the friction point where absolute precision meets pure creative kinetic flow.
                            </p>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="mb-12 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <GraduationCap className="mr-6 h-10 w-10 text-primary" />
                            Academic_Nodes
                        </h2>
                        <div className="space-y-12">
                            {profile.education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-panel hud-corner p-10 rounded-3xl"
                                >
                                    <p className="text-[12px] font-black tracking-[0.4em] text-primary mb-4">{edu.period}</p>
                                    <h3 className="text-3xl font-black text-white mb-2">{edu.degree}</h3>
                                    <div className="mt-4 flex flex-col md:flex-row gap-4 text-xl font-bold text-white/40">
                                        <span className="text-white">{edu.institution}</span>
                                        <span className="hidden md:block">•</span>
                                        <span>{edu.location}</span>
                                    </div>
                                    <p className="mt-8 text-xl text-white/60 leading-relaxed font-medium">{edu.details}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Values & Languages */}
                <div className="lg:col-span-12 xl:col-span-4">
                    <div className="sticky top-32 space-y-10">
                        <div className="glass-panel hud-corner p-10 rounded-[3rem] border-2 border-primary/20">
                            <h3 className="mb-8 flex items-center font-black uppercase tracking-[0.4em] text-xl text-white border-b border-white/10 pb-6">
                                <Target className="mr-4 h-6 w-6 text-primary" />
                                Core_Values
                            </h3>
                            <ul className="space-y-8">
                                <li className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <strong className="text-lg uppercase tracking-widest text-primary">Technical Integrity</strong>
                                    </div>
                                    <p className="text-lg font-bold text-white/60 pl-4">Ensuring every simulation matches physical reality through rigorous validation.</p>
                                </li>
                                <li className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <strong className="text-lg uppercase tracking-widest text-primary">Innovation_Flux</strong>
                                    </div>
                                    <p className="text-lg font-bold text-white/60 pl-4">Leveraging additive manufacturing and digital twins for ultra-fast iteration.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="glass-panel hud-corner p-10 rounded-[3rem] border-2 border-secondary/20">
                            <h3 className="mb-8 flex items-center font-black uppercase tracking-[0.4em] text-xl text-white border-b border-white/10 pb-6">
                                <Languages className="mr-4 h-6 w-6 text-secondary" />
                                Comm_Sync
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {profile.languages.map((lang, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <span className="text-2xl font-black text-white group-hover:text-secondary transition-colors">{lang.language}</span>
                                        <span className="text-[12px] font-black uppercase tracking-widest text-white/30">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
