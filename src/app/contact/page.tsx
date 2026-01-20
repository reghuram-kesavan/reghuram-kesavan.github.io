"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import { Mail, Linkedin, Github, Send, ExternalLink, Globe, HardDrive, Cpu } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <header className="mb-32 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 inline-flex items-center space-x-4 bg-primary/5 border border-primary/20 px-6 py-2 rounded-full"
                    >
                        <Cpu className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                            Comm_Protocol_Active
                        </span>
                    </motion.div>

                    <h1 className="font-outfit text-8xl font-black uppercase tracking-tighter md:text-[10rem] mb-12 text-speed">
                        INITIALIZE <span className="text-primary glow-red">CONTACT</span>.
                    </h1>

                    <p className="mx-auto max-w-3xl text-2xl text-white/30 font-medium leading-relaxed">
                        Ready to synchronize on high-fidelity aerospace challenges, rhythmic collaborations, or digital infrastructure.
                    </p>
                </header>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Social Matrix Container */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
                            <HardDrive className="h-4 w-4" />
                            Direct_Link_Interface
                        </div>

                        {[
                            { icon: Mail, label: "Neural_Link", val: profile.email, href: `mailto:${profile.email}`, color: "primary" },
                            { icon: Linkedin, label: "Network_Node", val: "LinkedIn/reghuram", href: profile.linkedin, color: "secondary" },
                            { icon: Github, label: "Codebase_Root", val: "GitHub/reghuram", href: profile.github, color: "primary" },
                        ].map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel hud-corner group flex items-center justify-between rounded-3xl p-10 transition-all hover:bg-white/[0.05]"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-${item.color}/10 text-${item.color} transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(var(--color-${item.color}),0.1)]`}>
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">{item.label}</div>
                                        <div className="text-2xl font-bold transition-colors group-hover:text-primary">{item.val}</div>
                                    </div>
                                </div>
                                <ExternalLink className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Global Inquiry Hub */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel hud-corner flex flex-col items-center justify-center rounded-[4rem] p-20 text-center group"
                    >
                        <div className="mb-12 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                            <div className="relative rounded-full bg-primary/10 p-12 glow-red transition-transform group-hover:scale-110">
                                <Globe className="h-20 w-20 text-primary" />
                            </div>
                        </div>

                        <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            GLOBAL_INQUIRY<br /><span className="text-primary/40">ESTABLISH_UPLINK</span>
                        </h3>

                        <p className="text-white/40 mb-16 text-xl max-w-sm">
                            "Precision in communication is the first stage of aerospace success."
                        </p>

                        <a
                            href={`mailto:${profile.email}`}
                            className="w-full flex items-center justify-center gap-4 h-20 bg-primary rounded-full text-black text-[12px] font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.02] active:scale-[0.98] glow-red"
                        >
                            <Send className="h-5 w-5" />
                            Synch_Now_
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent z-[-1] mask-image:linear-gradient(to_bottom,transparent,black)" />
        </div>
    );
}
