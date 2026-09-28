"use client";
import { useReaderLanguage, LanguageNote } from "@/components/ReaderLanguage";
import { useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";
const filters = [
  "All",
  "Aerodynamics",
  "CFD",
  "Research",
  "Testing",
  "Manufacturing",
];
export default function Projects() {
  const { language } = useReaderLanguage();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = projects.filter(
    (p) =>
      (filter === "All" || p.tags.includes(filter)) &&
      `${p.title} ${p.impact} ${p.tools.join(" ")} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="shell section">
      <p className="eyebrow">Engineering / Project archive</p>
      <h1 className="page-title">
        {language === "fr"
          ? "Des idées explorées."
          : language === "de"
            ? "Ideen untersucht."
            : "Ideas, investigated."}
        <br />
        <em>
          {language === "fr"
            ? "Des méthodes développées."
            : language === "de"
              ? "Methoden entwickelt."
              : "Methods, developed."}
        </em>
      </h1>
      <p className="section-description">
        Explore research, scientific software and hands-on engineering. Select a
        discipline or search by project or tool.
      </p>
      <LanguageNote />
      <div className="filter-toolbar">
        <div className="filters" aria-label="Filter by discipline">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="featured-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h2>No matching projects.</h2>
          <p>Try another discipline or search term.</p>
          <button
            className="button-primary"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
