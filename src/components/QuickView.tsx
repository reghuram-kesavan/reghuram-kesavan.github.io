import { MapPin, GraduationCap, Wrench, FileText, Activity, Terminal as TerminalIcon, Shield } from "lucide-react";
import profile from "@/data/profile.json";
import Link from "next/link";

export function QuickView() {
    return (
        <div className="glass-panel rounded-[3rem] p-12 transition-all hover:bg-white/[0.04] border-2 border-white/20">
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-8">
                <h2 className="flex items-center text-[16px] font-black uppercase tracking-[0.5em] text-white">
                    <Activity className="mr-4 h-6 w-6 text-primary animate-pulse" />
                    SYSTEM_SPECIFICATIONS_v4.2
                </h2>
                <div className="h-4 w-4 rounded-full bg-primary animate-ping" />
            </div>

            <div className="space-y-12">
                <ul className="grid gap-8">
                    {profile.quick_view.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start group">
                            <span className="mr-6 mt-3 h-[2px] w-10 shrink-0 bg-primary/40 transition-all group-hover:w-14 group-hover:bg-primary" />
                            <span className="text-xl font-bold text-white transition-colors group-hover:text-primary leading-snug">
                                {bullet}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="h-px w-full bg-white/20" />

                <div className="grid gap-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.4em] text-primary">
                            <GraduationCap className="h-5 w-5" />
                            <span>ACADEMIC_PROTOCOLS</span>
                        </div>
                        <span className="text-2xl font-black text-white">{profile.quick_view.education}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.4em] text-secondary">
                            <MapPin className="h-5 w-5" />
                            <span>DEPLOYMENT_NODES</span>
                        </div>
                        <span className="text-2xl font-black text-white">{profile.quick_view.locations}</span>
                    </div>
                </div>

                <div className="mt-16 flex gap-6">
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        className="flex-1 flex h-24 items-center justify-center gap-4 rounded-3xl bg-primary text-[14px] font-black uppercase tracking-[0.4em] text-black transition-all hover:scale-105 active:scale-95 glow-red"
                    >
                        <Shield className="h-6 w-6" />
                        UPLINK_NODE
                    </a>
                    <Link
                        href="/resume"
                        className="flex-1 flex h-24 items-center justify-center gap-4 rounded-3xl bg-white/10 text-[14px] font-black uppercase tracking-[0.4em] text-white transition-all hover:bg-white/20 border-2 border-white/10"
                    >
                        <FileText className="h-6 w-6" />
                        ACCESS_CV
                    </Link>
                </div>
            </div>
        </div>
    );
}
