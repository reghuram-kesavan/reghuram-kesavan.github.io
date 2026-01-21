"use client";

import { useState } from "react";
import {
    Terminal,
    Search,
    Cpu,
    FileText,
    Sparkles,
    Activity,
    Download,
    RotateCcw,
    Globe,
    Briefcase,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { REGHURAM_BRAIN } from "@/data/cv-database";

const STEPS = [
    "Initializing AI Engine...",
    "Loading Profile Fragments...",
    "Analyzing Company Profile...",
    "Scanning Job Requirements...",
    "Synchronizing Skill Matrix...",
    "Optimizing Output Architecture..."
];

export default function CareerSuite() {
    const [jd, setJd] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [result, setResult] = useState<{ cv: string; coverLetter: string } | null>(null);

    const handleGenerate = async () => {
        if (!jd) return;

        setIsGenerating(true);
        setResult(null);
        setProgress(0);
        setCurrentStep(0);

        // Simulate the process
        for (let i = 0; i <= 100; i += 2) {
            await new Promise(r => setTimeout(r, 60));
            setProgress(i);
            if (i % 16 === 0 && i < 100) {
                setCurrentStep(Math.floor(i / 16.6));
            }
        }

        // Keyword Matcher for "Smart Simulation"
        const jdLower = jd.toLowerCase();
        const matches = REGHURAM_BRAIN.profile.core_competencies.filter(skill =>
            jdLower.includes(skill.toLowerCase().split(' ')[0])
        );

        const relevantExp = REGHURAM_BRAIN.experience.find(exp =>
            exp.tech.some(t => jdLower.includes(t.toLowerCase()))
        ) || REGHURAM_BRAIN.experience[0];

        setResult({
            cv: `REGHURAM KESAVAN // MISSION_SPECIFIC_CV\n\nCORE_ALIGNMENT:\n${matches.map(m => `- [MATCHED] ${m}`).join('\n')}\n\nPRIMARY_EXPERIENCE_ORBIT:\n${relevantExp.role} @ ${relevantExp.company}\n- ${relevantExp.impact}\n\nTECHNICAL_STACK_SYNC:\n${relevantExp.tech.join(' | ')}`,
            coverLetter: `Dear Hiring Team,\n\nI am writing to express my strong interest in the role at ${companyUrl || "your organization"}. Having analyzed your requirements for skills in ${matches.slice(0, 2).join(' and ') || "Aerospace Engineering"}, I believe my recent experience at ${relevantExp.company} where I ${relevantExp.impact.toLowerCase()} makes me a unique asset to your mission.\n\nMy dual-degree background at TUM and ISAE-Supaero combined with my hands-on work with ${relevantExp.tech[0]} allows me to bridge the gap between complex theory and validated hardware. I am eager to bring this same precision to your team.\n\nBest regards,\nReghuram Kesavan`
        });
        setIsGenerating(false);
    };

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-4 text-primary mb-4">
                        <Terminal className="h-6 w-6" />
                        <span className="text-xs font-black uppercase tracking-[0.5em]">Command_Center // Mission_Prep</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                        AI <span className="text-primary glow-red">Career_Generator</span>.
                    </h1>
                    <p className="text-white/40 mt-4 max-w-2xl font-medium uppercase tracking-widest text-xs leading-loose">
                        Input target parameters to generate mission-specific documentation.
                        The system analyzes company culture and technical requirements to optimize your profile.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Panel */}
                    <div className="space-y-8">
                        <div className="glass-panel p-8 rounded-3xl border-2 border-white/5 space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    Target_Job_Description
                                </label>
                                <textarea
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    placeholder="Paste the full job description here..."
                                    className="w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-6 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-white/10"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <Globe className="h-4 w-4 text-secondary" />
                                    Company_Uplink (URL)
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                                    <input
                                        type="text"
                                        value={companyUrl}
                                        onChange={(e) => setCompanyUrl(e.target.value)}
                                        placeholder="https://company.career/role..."
                                        className="w-full bg-black/40 border border-white/10 rounded-full h-14 pl-14 pr-6 text-white font-mono text-xs focus:border-secondary outline-none transition-all placeholder:text-white/10"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !jd}
                                className={cn(
                                    "w-full h-20 rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em] transition-all",
                                    isGenerating ? "bg-white/5 text-white/20" : "bg-primary text-black hover:scale-[1.02] active:scale-95 glow-red"
                                )}
                            >
                                {isGenerating ? (
                                    <>
                                        <Cpu className="h-5 w-5 animate-spin" />
                                        Processing_Payload...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-5 w-5" />
                                        Generate_Mission_Materials
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 items-center">
                            <AlertCircle className="h-5 w-5 text-secondary shrink-0" />
                            <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed italic">
                                Data sources: ISAE-Supaero Research Log, TUM Aerospace Archive, Lilium Intern Records.
                            </p>
                        </div>
                    </div>

                    {/* Result Panel */}
                    <div className="relative min-h-[600px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="glass-panel inset-0 flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-primary/20 bg-primary/5"
                                >
                                    <div className="relative mb-12">
                                        <div className="h-32 w-32 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
                                        <Activity className="absolute inset-0 m-auto h-12 w-12 text-primary animate-pulse" />
                                    </div>

                                    <div className="w-full max-w-xs bg-white/5 h-2 rounded-full overflow-hidden mb-8">
                                        <motion.div
                                            className="bg-primary h-full glow-red"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">
                                            {STEPS[currentStep]}
                                        </h3>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                                            Neural_Mapping_in_Progress... {progress}%
                                        </p>
                                    </div>
                                </motion.div>
                            ) : result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="flex gap-4 mb-4">
                                        <button className="flex-1 h-14 rounded-xl glass-panel border border-primary text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-3">
                                            <Download className="h-4 w-4" />
                                            Download_CV
                                        </button>
                                        <button className="flex-1 h-14 rounded-xl glass-panel border border-secondary text-secondary text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-black transition-all flex items-center justify-center gap-3">
                                            <Download className="h-4 w-4" />
                                            Download_Cover_Letter
                                        </button>
                                    </div>

                                    <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-8 bg-black/60 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                            <FileText className="h-20 w-20 text-white" />
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Optimized_Output</h4>
                                            <div className="h-px bg-white/10 w-full" />
                                            <div className="font-mono text-sm text-white/60 space-y-6 whitespace-pre-wrap leading-relaxed">
                                                <span className="text-white font-bold block mb-4">--- COVER_LETTER_PREVIEW ---</span>
                                                {result.coverLetter}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setResult(null)}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-primary transition-colors mx-auto mt-8"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Reset_Simulator
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="glass-panel h-full flex flex-col items-center justify-center p-20 rounded-3xl border-2 border-white/5 text-center border-dashed"
                                >
                                    <Cpu className="h-16 w-16 text-white/5 mb-8" />
                                    <h3 className="text-xl font-black text-white/20 uppercase tracking-[0.2em] italic mb-4">
                                        System_Idle
                                    </h3>
                                    <p className="text-[10px] text-white/10 uppercase tracking-widest leading-loose">
                                        Await_Target_Input_for_Analysis<br />
                                        Select &apos;Execute_Mission&apos; to begin payload optimization.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
