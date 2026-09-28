import { ProjectScene } from "@/components/ProjectScene";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  problem: string;
  approach: string;
  methods: string;
  tools: string[];
  validation: string;
  impact: string;
  results: string;
  role: string;
}
export default function ProjectClient({ project: p }: { project: Project }) {
  return (
    <article className="shell section case-study">
      <Link href="/projects" className="text-link">
        <ArrowLeft size={17} /> All projects
      </Link>
      <header>
        <p className="eyebrow">{p.tags.join(" / ")}</p>
        <h1 className="page-title">{p.title}</h1>
        <p className="section-description">{p.summary}</p>
      </header>
      <div className="case-explorer">
        <ProjectScene id={p.id} />
      </div>
      <div className="case-grid">
        <div>
          {[
            ["01", "The question", p.problem],
            ["02", "The approach", p.approach],
            ["03", "Methods & implementation", p.methods],
            ["04", "Verification & limitations", p.validation],
            ["05", "Results & reflection", p.results],
          ].map(([n, title, body]) => (
            <section key={n} className="case-section">
              <span className="eyebrow">{n}</span>
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </section>
          ))}
        </div>
        <aside>
          <p className="eyebrow">My role</p>
          <h3>{p.role}</h3>
          <p className="eyebrow">Tools & methods</p>
          <div className="tool-tags">
            {p.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <Link href="/contact" className="text-link">
            Discuss this project <ArrowUpRight size={17} />
          </Link>
        </aside>
      </div>
    </article>
  );
}
