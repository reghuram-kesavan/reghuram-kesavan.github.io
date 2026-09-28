"use client";
import translations from "@/data/project-translations.json";
import { useReaderLanguage } from "./ReaderLanguage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectScene } from "./ProjectScene";
interface Project {
  id: string;
  title: string;
  role: string;
  tags: string[];
  tools: string[];
  impact: string;
}
export function ProjectCard({ project }: { project: Project }) {
  const { language } = useReaderLanguage();
  const translation = (translations as Record<string, string[]>)[project.id];
  return (
    <article className="project-card">
      <ProjectScene id={project.id} />
      <div className="project-body">
        <p className="eyebrow">{project.role}</p>
        <h3>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </h3>
        <p lang={language}>
          {language === "en"
            ? project.impact
            : (translation?.[language === "fr" ? 0 : 1] ?? project.impact)}
        </p>
        <div className="project-bottom">
          <span>{project.tools.slice(0, 2).join(" / ")}</span>
          <Link
            href={`/projects/${project.id}`}
            aria-label={`Explore ${project.title}`}
          >
            <ArrowUpRight size={23} />
          </Link>
        </div>
      </div>
    </article>
  );
}
