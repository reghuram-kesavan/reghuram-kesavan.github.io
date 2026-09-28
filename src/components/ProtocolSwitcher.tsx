"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, GraduationCap, Terminal } from "lucide-react";
import { usePortfolioMode } from "./PortfolioMode";

export function ProtocolSwitcher() {
  const { mode, setMode } = usePortfolioMode();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-protocol",
      mode === "professional" ? "professional" : "creative"
    );
  }, [mode]);

  const toggleProtocol = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextMode = mode === "personal" ? "professional" : "personal";
    const nextProto = nextMode === "professional" ? "professional" : "creative";

    setTimeout(() => {
      setMode(nextMode);
      document.documentElement.setAttribute("data-protocol", nextProto);
      setTimeout(() => setIsTransitioning(false), 700);
    }, 350);
  };

  // Keyboard shortcut: Press 'M' to toggle modes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleProtocol();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, isTransitioning]);

  return (
    <>
      <div className="fixed top-32 right-8 z-[100] flex flex-col items-center space-y-4">
        <div
          className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-2"
          style={{ writingMode: "vertical-rl" }}
        >
          Protocol_Select
        </div>
        <button
          onClick={toggleProtocol}
          disabled={isTransitioning}
          className="group relative flex h-16 w-16 items-center justify-center rounded-3xl bg-black/60 border border-white/20 transition-all hover:bg-primary/20 hover:scale-110 active:scale-95 glow-red overflow-hidden shadow-2xl backdrop-blur-2xl"
          title="Toggle protocol or press [M]"
        >
          <div className="absolute inset-x-0 h-[1px] bg-primary/60 top-0 group-hover:top-full transition-all duration-1000" />

          <motion.div
            animate={{
              rotate: mode === "personal" ? 0 : 180,
              scale: isTransitioning ? 0.5 : 1,
            }}
            className="relative flex h-full w-full items-center justify-center"
          >
            {mode === "personal" ? (
              <Zap className="h-6 w-6 text-primary" />
            ) : (
              <GraduationCap className="h-6 w-6 text-primary" />
            )}
          </motion.div>

          <div className="absolute right-24 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all group-hover:right-20 bg-black/95 px-6 py-3 rounded-2xl border border-white/20 shadow-2xl pointer-events-none">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Switch Protocol [M]
              </span>
              <span className="text-[8px] font-medium text-white/50 uppercase tracking-widest mt-1">
                Target: {mode === "personal" ? "Aerospace Cockpit" : "Tactical Arena"}
              </span>
            </div>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center">
              <Terminal className="h-12 w-12 text-primary animate-pulse mb-6 text-primary" />
              <div className="text-[12px] font-black uppercase tracking-[1em] text-white animate-pulse">
                Synchronizing_Nodes...
              </div>
              <div className="mt-3 text-[9px] font-mono tracking-widest text-white/40">
                {mode === "personal"
                  ? "INITIALIZING AEROSPACE COCKPIT // PROTOCOL 02"
                  : "INITIALIZING TACTICAL ARENA // PROTOCOL 01"}
              </div>
            </div>

            <div className="absolute inset-0 scanline-hud opacity-40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
