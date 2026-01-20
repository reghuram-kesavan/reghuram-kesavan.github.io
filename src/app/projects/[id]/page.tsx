import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import ProjectClient from "./ProjectClient";

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = projects.find((p) => p.id === resolvedParams.id);

    if (!project) notFound();

    return <ProjectClient project={project} />;
}
