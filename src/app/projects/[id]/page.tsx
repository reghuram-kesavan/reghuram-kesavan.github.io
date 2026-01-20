"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Info, Layout, Layers, Lightbulb, TrendingUp, Cpu, Target } from "lucide-react";
import Link from "next/link";
import projects from "@/data/projects.json";

export default function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const project = projects.find((p) => p.id === resolvedParams.id);

    if (!project) notFound();

    return (
        <div className="container mx-auto px-6 py-24">
            <Link
                href="/projects"
                className="mb-16 inline-flex items-center text-[12px] font-black uppercase tracking-[0.5em] text-primary hover:tracking-[0.8em] group transition-all"
            >
                <ArrowLeft className="mr-4 h-5 w-5 transition-transform group-hover:-translate-x-2" />
                Return_To_Archive
            </Link>

            <header className="mb-24 relative">
                <div className="mb-8 flex flex-wrap gap-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-primary/10 border border-primary/30 px-6 py-2 text-[10px] font-black uppercase tracking-widest text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="font-outfit text-7xl font-black uppercase tracking-tighter md:text-9xl mb-10 text-white drop-shadow-2xl">
                    {project.title}
                </h1>
                <p className="text-3xl font-black text-white/40 max-w-5xl uppercase tracking-tight leading-tight">
                    {project.summary}
                </p>

                <div className="absolute top-0 right-0 opacity-10 blur-3xl rounded-full bg-primary w-96 h-96 z-[-1]" />
            </header>

            <div className="grid gap-16 lg:grid-cols-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-24">
                    <section>
                        <h2 className="mb-10 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <Info className="mr-6 h-10 w-10 text-primary" />
                            The_Problem
                        </h2>
                        <p className="text-2xl font-bold text-white/80 leading-relaxed">
                            {project.problem}
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-10 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <Layout className="mr-6 h-10 w-10 text-primary" />
                            Deployment_Strategy
                        </h2>
                        <p className="text-2xl font-bold text-white/80 leading-relaxed">
                            {project.approach}
                        </p>
                    </section>

                    <section className="glass-panel hud-corner p-12 rounded-[3.5rem] border-2 border-white/5">
                        <h2 className="mb-10 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <Layers className="mr-6 h-10 w-10 text-secondary" />
                            Numeric_Methods
                        </h2>
                        <p className="text-2xl font-bold text-white/80 leading-relaxed mb-10">
                            {project.methods}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {project.tools.map((tool) => (
                                <div key={tool} className="rounded-2xl bg-white/5 px-6 py-4 text-[12px] font-black uppercase tracking-widest text-white border border-white/10 shadow-2xl">
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-10 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <CheckCircle2 className="mr-6 h-10 w-10 text-primary" />
                            V&V_Protocol
                        </h2>
                        <p className="text-2xl font-bold text-white/80 leading-relaxed">
                            {project.validation}
                        </p>
                    </section>

                    <section className="relative">
                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -top-12" />
                        <h2 className="mb-10 flex items-center text-4xl font-black uppercase tracking-tighter text-white">
                            <TrendingUp className="mr-6 h-10 w-10 text-accent" />
                            Core_Impact
                        </h2>
                        <p className="text-4xl font-black text-primary mb-8 tracking-tighter uppercase italic">
                            {project.impact}
                        </p>
                        <p className="text-2xl font-bold text-white/80 leading-relaxed">
                            {project.results}
                        </p>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32 space-y-10">
                        <div className="glass-panel hud-corner rounded-[3rem] p-10 border-2 border-primary/20">
                            <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Operational_Role</h3>
                            <p className="text-3xl font-black text-white">{project.role}</p>
                        </div>

                        <div className="glass-panel hud-corner rounded-[3rem] p-10 border-2 border-white/5">
                            <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Archival_Period</h3>
                            <p className="text-3xl font-black text-white">Current / R&D</p>
                        </div>

                        <button className="w-full h-24 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.4em] text-[12px] transition-all hover:scale-[1.05] active:scale-95 glow-red shadow-2xl">
                            Download_Technical_Report.pdf
                        </button>

                        <div className="flex justify-center opacity-10">
                            <Cpu className="h-24 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
