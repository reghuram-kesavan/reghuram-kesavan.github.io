"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
                >
                    <div className="relative w-72">
                        <div className="mb-4 flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                            <span>System.Boot();</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"
                            />
                        </div>
                        <div className="mt-8 flex flex-col space-y-2 opacity-40">
                            {[
                                "Initializing Aerospace Solvers...",
                                "Syncing Rhythmic Metadata...",
                                "Loading Aerodynamic Grids...",
                                "Deploying F1 Telemetry...",
                            ].slice(0, Math.floor(progress / 25) + 1).map((text, i) => (
                                <div key={i} className="text-[8px] font-mono tracking-widest text-foreground">
                                    {">"} {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-0 grid-bg opacity-20" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
