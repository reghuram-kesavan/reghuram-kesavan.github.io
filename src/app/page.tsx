"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal as TerminalIcon, Eye } from "lucide-react";
import Link from "next/link";
import { QuickView } from "@/components/QuickView";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";
import profile from "@/data/profile.json";

export default function Home() {
  return (
    <div className="container mx-auto px-6 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col lg:flex-row items-center justify-between gap-16 py-20">

        {/* Profile Image - The "Aero-Pilot" Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1 flex-1 max-w-2xl"
        >
          <div className="relative group perspective-view">
            {/* HUD Viewfinder Overlay */}
            <div className="absolute -inset-4 z-20 border border-primary/20 pointer-events-none transition-all group-hover:-inset-6">
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
              <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
              <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
            </div>

            {/* Main Image with Mask */}
            <div className="relative z-10 overflow-hidden rounded-[4rem] border-4 border-white/10 shadow-2xl glass-panel">
              <img
                src="/profile-hero.png"
                alt="Reghuram Kesavan"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Stealth Tint Overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />

              {/* Scanning Line */}
              <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_30px_rgba(var(--color-primary),1)] z-20"
              />
            </div>

            {/* Floating Bio Tag */}
            <div className="absolute -bottom-10 -right-10 z-30 glass-panel hud-corner p-6 rounded-2xl border-2 border-primary group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Identity_Verified</div>
                  <div className="text-xl font-black text-white">reghuram.kesavan.portfolio</div>
                </div>
              </div>
            </div>

            {/* Decorative Tech Rings */}
            <div className="absolute -inset-20 z-0 animate-[spin_60s_linear_infinite] pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 5" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="0.5 2" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="z-10 order-1 lg:order-2 flex-1"
        >
          <div className="mb-10 flex flex-wrap gap-4">
            {["AEROSPACE", "HIPHOP", "GAMING", "F1"].map((tag) => (
              <span key={tag} className="text-[12px] font-black tracking-[0.6em] text-primary border-l-2 border-primary/40 pl-4">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-10 font-outfit text-6xl font-black leading-[0.8] tracking-tighter md:text-8xl lg:text-[10rem] text-speed text-white drop-shadow-2xl">
            REGHURAM<br />
            <span className="text-primary/40">KESAVAN.</span>
          </h1>

          <div className="glass-panel hud-corner mb-12 max-w-xl p-10 rounded-tr-[4rem] group border-2 border-white/10">
            <div className="flex items-center gap-3 text-secondary mb-6 border-b border-white/5 pb-4">
              <TerminalIcon className="h-5 w-5" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">Active_Operational_Profile</span>
            </div>
            <p className="text-xl font-bold leading-relaxed text-white">
              {profile.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-10">
            <Link
              href="/projects"
              className="group relative flex h-20 items-center justify-center overflow-hidden rounded-2xl bg-primary px-16 transition-all hover:scale-110 active:scale-95 glow-red shadow-2xl"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.4em] text-black">
                Execute_Mission
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Grid High-Detail Section (QuickView integrated further down or adjacent) */}
      <section className="mb-48 grid gap-16 lg:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <QuickView />
        </motion.div>

        <div className="space-y-12 py-10">
          <h2 className="font-outfit text-6xl font-black uppercase tracking-tighter text-white">
            Core <span className="text-primary glow-red">Telemetry</span>.
          </h2>
          <div className="grid gap-8">
            {[
              { label: "Research Focus", val: "Parametric Fan Blade Modelling & BFM (Python/B-splines)" },
              { label: "Industrial Phase", val: "Structural Design at Lilium (eVTOL Battery Systems)" },
              { label: "Validated Skills", val: "CFRP Testing, FEM Correlation, Siemens NX, CFD" }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl border-l-4 border-primary">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">{item.label}</div>
                <div className="text-xl font-bold text-white">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Divider Dashboard */}
      <div className="my-48 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "RPM_SYNC", val: "12,400", color: "primary" },
            { label: "DRS_STATUS", val: "ACTIVE", color: "secondary" },
            { label: "BPM_PROTOCOL", val: "128_SYNC", color: "primary" },
            { label: "AERO_STABILITY", val: "0.98_M", color: "accent" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl text-center border-b-2 border-white/10 hover:border-primary transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-3">{stat.label}</div>
              <div className={`text-3xl font-black italic tracking-tighter text-white`}>{stat.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Gallery */}
      <section className="mt-64 relative">
        <div className="mb-24 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <h2 className="font-outfit text-[6rem] font-black uppercase tracking-tighter md:text-[8rem] text-white">
              PROJECT <span className="text-primary glow-red">MATRIX</span>.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center space-x-6 text-[14px] font-black uppercase tracking-[1em] text-primary transition-all hover:tracking-[1.2em]"
          >
            <span>FULL_ARCHIVE</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
