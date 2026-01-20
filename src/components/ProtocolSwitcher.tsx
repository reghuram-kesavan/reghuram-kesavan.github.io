"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Rocket, GraduationCap, Terminal } from "lucide-react";

export function ProtocolSwitcher() {
    const [protocol, setProtocol] = useState<"creative" | "professional">("creative");
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("protocol") as "creative" | "professional";
        if (saved) {
            setProtocol(saved);
            document.documentElement.setAttribute("data-protocol", saved);
        }
    }, []);

    const toggleProtocol = () => {
        setIsTransitioning(true);
        const next = protocol === "creative" ? "professional" : "creative";

        setTimeout(() => {
            setProtocol(next);
            document.documentElement.setAttribute("data-protocol", next);
            localStorage.setItem("protocol", next);
            setTimeout(() => setIsTransitioning(false), 800);
        }, 400);
    };

    return (
        <>
            <div className="fixed top-32 right-8 z-[100] flex flex-col items-center space-y-4">
                <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-2" style={{ writingMode: "vertical-rl" }}>
                    Protocol_Select
                </div>
                <button
                    onClick={toggleProtocol}
                    disabled={isTransitioning}
                    className="group relative flex h-16 w-16 items-center justify-center rounded-3xl bg-black/40 border border-white/10 transition-all hover:bg-primary/20 hover:scale-110 active:scale-95 glow-red overflow-hidden"
                >
                    <div className="absolute inset-x-0 h-[1px] bg-primary/40 top-0 group-hover:top-full transition-all duration-1000" />

                    <motion.div
                        animate={{
                            rotate: protocol === "creative" ? 0 : 180,
                            scale: isTransitioning ? 0.5 : 1
                        }}
                        className="relative flex h-full w-full items-center justify-center"
                    >
                        {protocol === "creative" ? (
                            <Zap className="h-6 w-6 text-primary" />
                        ) : (
                            <GraduationCap className="h-6 w-6 text-primary" />
                        )}
                    </motion.div>

                    <div className="absolute right-24 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all group-hover:right-20 bg-black/90 px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                Switch Protocol
                            </span>
                            <span className="text-[8px] font-medium text-white/40 uppercase tracking-widest mt-1">
                                Target: {protocol === "creative" ? "Academic Mode" : "Stealth Mode"}
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
                        className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-primary/20 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center">
                            <Terminal className="h-12 w-12 text-primary animate-pulse mb-6" />
                            <div className="text-[12px] font-black uppercase tracking-[1em] text-white animate-pulse">
                                Synchronizing_Nodes...
                            </div>
                        </div>

                        <div className="absolute inset-0 scanline opacity-50" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
