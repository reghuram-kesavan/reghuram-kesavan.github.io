"use client";

import { Download, FileText, ExternalLink } from "lucide-react";

export default function ResumePage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <h1 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl mb-2">
                        Curriculum Vitae
                    </h1>
                    <p className="text-lg text-foreground/60">
                        Last updated: January 2026
                    </p>
                </div>
                <div className="flex gap-4">
                    <a
                        href="/resume.pdf"
                        download
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-black transition-transform hover:scale-105"
                    >
                        <Download className="h-4 w-4" />
                        Download PDF
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-bold transition-colors hover:bg-white/10"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open in Tab
                    </a>
                </div>
            </header>

            <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-2xl glass-card border border-white/10">
                <iframe
                    src="/resume.pdf"
                    className="h-full w-full"
                    title="Reghuram Kesavan CV"
                />
                {/* Support for browsers that don't display iframes/PDFs well */}
                <div className="absolute inset-0 z-[-1] flex flex-col items-center justify-center text-center p-12">
                    <FileText className="h-16 w-16 text-primary/20 mb-4" />
                    <p className="text-foreground/60 mb-6">PDF preview not available in this browser.</p>
                    <a
                        href="/resume.pdf"
                        className="text-primary hover:underline font-bold"
                    >
                        Download to view file
                    </a>
                </div>
            </div>
        </div>
    );
}
