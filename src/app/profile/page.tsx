"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ReaderIntro,
  useReaderLanguage,
  LanguagePicker,
  LanguageNote,
} from "@/components/ReaderLanguage";
import { Search, ArrowUpRight } from "lucide-react";
import records from "@/data/profile-archive.json";
import profile from "@/data/profile.json";
import { usePortfolioMode } from "@/components/PortfolioMode";
const categories = ["All", ...new Set(records.map((r) => r.category))];
export default function FullProfile() {
  const { language } = useReaderLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { mode } = usePortfolioMode();
  const eligible = records.filter(
    (r) =>
      mode !== "professional" || !["G44", "G45"].includes(r.id.slice(0, 3)),
  );
  const visible = eligible.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      `${r.title} ${r.summary} ${r.institution} ${r.kind}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="shell section profile-archive">
      <div className="profile-portrait">
        <Image
          src="/profile-hero.png"
          alt="Reghuram Kesavan"
          width={400}
          height={400}
          priority
        />
        <div>
          <p className="eyebrow">Reghuram Kesavan</p>
          <ReaderIntro />
        </div>
      </div>
      <p className="eyebrow">Profile / The complete picture</p>
      <h1 className="page-title">
        {language === "fr"
          ? "Une base en mécanique."
          : language === "de"
            ? "Ein Fundament im Maschinenbau."
            : "A mechanical foundation."}
        <br />
        <em>
          {language === "fr"
            ? "Un cap vers l’aérospatiale."
            : language === "de"
              ? "Ein Weg in die Luft- und Raumfahrt."
              : "An aerospace direction."}
        </em>
      </h1>
      <p className="section-description">
        A connected record of research, industry, engineering projects and
        learning — from aircraft flow physics to hardware, energy and systems.
      </p>
      <div className="profile-reader">
        <LanguagePicker />
        <LanguageNote />
      </div>
      <div className="profile-index">
        <a href="#record-library">Work & learning ↘</a>
        <a href="#education">Education ↘</a>
        <a href="#capabilities">Capabilities ↘</a>
        <a href="#languages">Languages ↘</a>
        <Link href="/resume">
          CV <ArrowUpRight size={15} />
        </Link>
      </div>
      <section id="record-library">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Work & learning</p>
            <h2>The full collection.</h2>
          </div>
          <Link className="text-link" href="/projects">
            Project case studies ↗
          </Link>
        </div>
        <p className="archive-context">
          Projects, coursework and related work packages are identified
          separately. Entries describe their scope; research prototypes are not
          presented as validated products.
        </p>
        <div className="filter-toolbar">
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Search full profile"
              placeholder="Search work, subjects or institutions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="archive-select">
            Browse by area
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" role="status">
          {visible.length} {visible.length === 1 ? "record" : "records"}
          {mode === "professional" ? " · professional view" : ""}
        </p>
        <div className="archive-records">
          {visible.map((r, i) => (
            <details key={r.id}>
              <summary>
                <span className="record-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <small>{r.kind}</small>
                  <strong>{r.title}</strong>
                  <span className="record-meta">
                    {r.institution} · {r.period}
                  </span>
                </span>
                <span className="record-expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="record-body">
                <p>{r.summary}</p>
                <small>{r.category}</small>
              </div>
            </details>
          ))}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <h3>No matching records.</h3>
            <button
              className="button-primary"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <section id="education" className="section">
        <p className="eyebrow">02 / Education</p>
        <h2>
          Across disciplines.
          <br />
          <em>Across borders.</em>
        </h2>
        {profile.education.map((e) => (
          <article className="education-row" key={e.institution}>
            <p className="eyebrow">
              {e.period} · {e.location}
            </p>
            <h3>{e.institution}</h3>
            <p>{e.degree}</p>
            <p>{e.details}</p>
          </article>
        ))}
      </section>
      <section id="capabilities">
        <p className="eyebrow">03 / Technical capabilities</p>
        <h2>Methods behind the work.</h2>
        <div className="skills-grid">
          {Object.entries(profile.skills).map(([name, skills]) => (
            <article key={name}>
              <h3>{name}</h3>
              <ul>
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section id="languages" className="section">
        <p className="eyebrow">04 / Communication</p>
        <h2>Languages.</h2>
        <div className="language-strip">
          {profile.languages.map((l) => (
            <div key={l.language}>
              <strong>{l.language}</strong>
              <span>{l.level}</span>
            </div>
          ))}
        </div>
        <p className="archive-context">Proficiency levels are self-reported.</p>
        <Link href="/contact" className="text-link">
          Start a conversation ↗
        </Link>
      </section>
    </div>
  );
}
