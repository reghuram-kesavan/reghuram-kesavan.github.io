"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal as TerminalIcon, Eye, Zap, Rocket } from "lucide-react";
import Link from "next/link";
import { QuickView } from "@/components/QuickView";
import { ProjectCard } from "@/components/ProjectCard";
import { TacticalArena } from "@/components/TacticalArena";
import { AerospaceCockpit } from "@/components/AerospaceCockpit";
import { usePortfolioMode } from "@/components/PortfolioMode";
import projects from "@/data/projects.json";
import profile from "@/data/profile.json";

export default function Home() {
  const { mode, setMode } = usePortfolioMode();
  const isPersonal = mode === "personal";

  return (
    <div className="container mx-auto px-6 pb-24">
      {/* ========================================================================= */}
      {/* SICK HERO SECTION (RESTORED ULTRA-HIGH-OCTANE AERO-PILOT VISUAL)         */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col lg:flex-row items-center justify-between gap-16 py-12 lg:py-20">
        {/* Profile Image - The "Aero-Pilot" Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1 flex-1 max-w-2xl w-full"
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
            <div className="relative z-10 overflow-hidden rounded-[3.5rem] lg:rounded-[4rem] border-4 border-white/10 shadow-2xl glass-panel aspect-square max-h-[580px] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-hero.png"
                alt="Reghuram Kesavan"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Stealth Tint Overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />

              {/* Scanning Laser Line */}
              <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-primary/70 shadow-[0_0_30px_rgba(var(--color-primary),1)] z-20"
              />
            </div>

            {/* Floating Bio Tag */}
            <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 z-30 glass-panel hud-corner p-5 sm:p-6 rounded-2xl border-2 border-primary group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                    Identity_Verified
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white">
                    reghuram.kesavan.portfolio
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Tech Rings */}
            <div className="absolute -inset-16 sm:-inset-20 z-0 animate-[spin_60s_linear_infinite] pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.1"
                  strokeDasharray="1 5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.05"
                  strokeDasharray="0.5 2"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="z-10 order-1 lg:order-2 flex-1 w-full"
        >
          {/* Subtitle Tags */}
          <div className="mb-8 sm:mb-10 flex flex-wrap gap-4 sm:gap-6">
            {[
              "AEROSPACE",
              "HIPHOP & DANCE",
              "GAMING & VALORANT",
              "F1 MOTORSPORT",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] sm:text-[12px] font-black tracking-[0.4em] sm:tracking-[0.6em] text-primary border-l-2 border-primary/40 pl-3 sm:pl-4 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Huge Title */}
          <h1 className="mb-8 sm:mb-10 font-outfit text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black leading-[0.82] tracking-tighter text-speed text-white drop-shadow-2xl">
            REGHURAM
            <br />
            <span className="text-primary/40">KESAVAN.</span>
          </h1>

          {/* Active Profile HUD Box */}
          <div className="glass-panel hud-corner mb-10 sm:mb-12 max-w-xl p-8 sm:p-10 rounded-tr-[3.5rem] sm:rounded-tr-[4rem] group border-2 border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 text-secondary mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4">
              <TerminalIcon className="h-5 w-5 text-primary" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-primary">
                Active_Operational_Profile
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold leading-relaxed text-white">
              {profile.summary}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link
              href="/projects"
              className="group relative flex h-16 sm:h-20 items-center justify-center overflow-hidden rounded-2xl bg-primary px-10 sm:px-16 transition-all hover:scale-105 active:scale-95 glow-red shadow-2xl"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <span className="relative z-10 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-black">
                Execute_Mission
              </span>
            </Link>

            <button
              onClick={() =>
                setMode(isPersonal ? "professional" : "personal")
              }
              className="flex h-16 sm:h-20 items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 sm:px-10 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/10 hover:border-primary transition-all"
            >
              {isPersonal ? (
                <>
                  <Rocket className="h-5 w-5 text-primary" />
                  <span>Enter Cockpit Mode [M]</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Enter Tactical Arena [M]</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* STATS DIVIDER DASHBOARD (RPM, DRS, BPM, AERO)                            */}
      {/* ========================================================================= */}
      <div className="my-24 sm:my-32 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "RPM_SYNC", val: "12,400", sub: "Turbomachinery Redline" },
            { label: "DRS_STATUS", val: "ACTIVE", sub: "F1 High-Speed Drag" },
            { label: "BPM_PROTOCOL", val: "128_SYNC", sub: "Abrupt Family / WOD" },
            { label: "AERO_STABILITY", val: "0.98_M", sub: "Static Margin Kn" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-6 sm:p-8 rounded-3xl text-center border-b-2 border-white/10 hover:border-primary transition-all duration-300 shadow-xl"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-2">
                {stat.label}
              </div>
              <div className="text-2xl sm:text-4xl font-black italic tracking-tighter text-white mb-1">
                {stat.val}
              </div>
              <div className="text-[8px] font-mono tracking-widest text-primary/70 uppercase">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC PROTOCOL SECTION: TACTICAL ARENA VS AEROSPACE COCKPIT             */}
      {/* ========================================================================= */}
      <div className="my-16 sm:my-24">
        {isPersonal ? (
          <div id="tactical-arena">
            <TacticalArena />
          </div>
        ) : (
          <div id="aerospace-cockpit">
            <AerospaceCockpit />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CORE TELEMETRY & SYSTEM SPECIFICATIONS (QUICKVIEW)                       */}
      {/* ========================================================================= */}
      <section className="my-28 sm:my-36 grid gap-16 lg:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <QuickView />
        </motion.div>

        <div className="space-y-8 sm:space-y-10 py-6">
          <h2 className="font-outfit text-5xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            Core <span className="text-primary glow-red">Telemetry</span>.
          </h2>
          <div className="grid gap-6">
            {[
              {
                label: "Research Focus",
                val: "Parametric Fan Blade Modelling & BFM (ISAE-SUPAERO Thesis)",
              },
              {
                label: "Industrial Phase",
                val: "Mechanical Test Hardware at Lilium (ASME Y14.5 GD&T & FEA)",
              },
              {
                label: "Validated Skills",
                val: "RANS CFD, Structured Meshing (y+ < 1), Siemens NX, Python",
              },
              {
                label: "Academic Ledger",
                val: "ISAE-SUPAERO M2 · TUM 57 ECTS · KTU B.Tech Honours 9.28 CGPA",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-panel p-6 sm:p-8 rounded-2xl border-l-4 border-primary shadow-xl"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">
                  {item.label}
                </div>
                <div className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECT MATRIX (SICK 3D CASE STUDY CARDS)                                 */}
      {/* ========================================================================= */}
      <section className="mt-36 sm:mt-48 relative">
        <div className="mb-16 sm:mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <h2 className="font-outfit text-5xl sm:text-7xl md:text-[6.5rem] font-black uppercase tracking-tighter text-white leading-[0.88]">
              PROJECT <span className="text-primary glow-red">MATRIX</span>.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center space-x-4 sm:space-x-6 text-[12px] sm:text-[14px] font-black uppercase tracking-[0.6em] sm:tracking-[0.8em] text-primary transition-all hover:tracking-[1em]"
          >
            <span>FULL_ARCHIVE (48)</span>
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
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
