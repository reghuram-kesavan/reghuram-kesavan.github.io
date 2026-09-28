"use client";
import { useState } from "react";
import Link from "next/link";
import projects from "@/data/projects.json";
export default function ProjectMatcher() {
  const [jd, setJd] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const results =
    submitted === null
      ? []
      : projects
          .map((p) => {
            const terms = Array.from(
              new Set([...p.tags, ...p.tools].map((t) => t.toLowerCase())),
            );
            const matched = terms.filter((t) =>
              submitted.toLowerCase().includes(t),
            );
            return { p, matched };
          })
          .filter((x) => x.matched.length)
          .sort((a, b) => b.matched.length - a.matched.length);
  return (
    <div className="shell section">
      <p className="eyebrow">Portfolio utility / Local keyword matching</p>
      <h1 className="page-title">Find the relevant work.</h1>
      <p className="section-description">
        Paste a job description to find projects with matching tool and
        discipline names. This runs locally in your browser: no AI, account,
        external requests or acceptance score.
      </p>
      <form
        className="matcher-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(jd);
        }}
      >
        <label htmlFor="job-description">Job description</label>
        <textarea
          id="job-description"
          rows={9}
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste a job description…"
          required
        />
        <div className="hero-actions">
          <button
            className="button-primary"
            type="submit"
            disabled={!jd.trim()}
          >
            Find matching projects
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setJd("");
              setSubmitted(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {submitted !== null && (
        <section className="matcher-results" aria-live="polite">
          <h2>
            {results.length
              ? `${results.length} projects with keyword matches`
              : "No exact keyword matches"}
          </h2>
          <p className="section-description">
            {results.length
              ? "Matching words help with navigation; they do not establish suitability for a role."
              : "Try the project archive to explore broader relevance."}
          </p>
          {results.map(({ p, matched }) => (
            <article key={p.id}>
              <Link href={`/projects/${p.id}`}>
                <h3>{p.title} ↗</h3>
              </Link>
              <p>Matched: {matched.join(", ")}</p>
            </article>
          ))}
          <Link href="/projects" className="text-link">
            Browse all projects ↗
          </Link>
        </section>
      )}
    </div>
  );
}
