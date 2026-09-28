"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Rocket, Terminal } from "lucide-react";
import { usePortfolioMode } from "./PortfolioMode";

export function ProtocolSwitcher() {
  const { mode, setMode } = usePortfolioMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<string>("");

  const toggleProtocol = () => {
    if (isTransitioning) return;
    const nextMode = mode === "personal" ? "professional" : "personal";
    setTransitionTarget(
      nextMode === "professional"
        ? "INITIALIZING AEROSPACE COCKPIT // PROTOCOL 02"
        : "INITIALIZING TACTICAL & LIFESTYLE ARENA // PROTOCOL 01"
    );
    setIsTransitioning(true);

    setTimeout(() => {
      setMode(nextMode);
      setTimeout(() => setIsTransitioning(false), 550);
    }, 350);
  };

  // Keyboard shortcut: Press 'M' to toggle modes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
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
      {/* Floating HUD Controller */}
      <aside
        aria-label="Mode switcher"
        className="fixed bottom-8 right-8 z-[90] flex items-center gap-3"
      >
        <button
          onClick={toggleProtocol}
          disabled={isTransitioning}
          className={`protocol-hud-pill ${mode === "professional" ? "aero-active" : "personal-active"}`}
          title="Switch protocol or press [M]"
          aria-label={`Current protocol: ${
            mode === "personal" ? "Tactical & Lifestyle" : "Aerospace Cockpit"
          }. Click or press M to toggle.`}
        >
          <div className="hud-icon-wrap">
            {mode === "personal" ? (
              <Zap className="h-5 w-5 text-amber-400 animate-pulse" />
            ) : (
              <Rocket className="h-5 w-5 text-cyan-400 animate-pulse" />
            )}
          </div>

          <div className="hud-text-wrap">
            <span className="hud-protocol-id">
              {mode === "personal" ? "PROTOCOL 01 // LIFESTYLE" : "PROTOCOL 02 // AEROSPACE"}
            </span>
            <span className="hud-sub-label">
              {mode === "personal"
                ? "Switch to Aerospace Cockpit [M]"
                : "Switch to Tactical Arena [M]"}
            </span>
          </div>
        </button>
      </aside>

      {/* Futuristic Scanline HUD Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-black/85 backdrop-blur-md"
          >
            <div className="flex flex-col items-center px-6 text-center">
              <Terminal className="h-12 w-12 text-primary animate-bounce mb-4 text-cyan-400" />
              <div className="text-[14px] font-black uppercase tracking-[0.4em] text-white animate-pulse">
                {transitionTarget}
              </div>
              <div className="mt-2 text-[10px] font-mono text-neutral-400 tracking-widest">
                SYNCHRONIZING TELEMETRY · RECONFIGURING SYSTEM NODES
              </div>
            </div>

            <div className="absolute inset-0 scanline-hud opacity-30 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
