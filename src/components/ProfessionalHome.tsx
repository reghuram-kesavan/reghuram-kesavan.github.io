"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, FileText, Check } from "lucide-react";
import projects from "@/data/projects.json";
import { useReaderLanguage, LanguageNote } from "./ReaderLanguage";
import translations from "@/data/project-translations.json";
const tracks = [
  {
    name: "Aircraft aerodynamics",
    ids: [
      "high-lift-aerodynamics",
      "vorom-x-aerodynamics",
      "dep-aircraft-aero",
    ],
    note: "Transition, separation, wing loading and configuration studies.",
  },
  {
    name: "Propulsion & methods",
    ids: ["trace-fangeo", "vorom-x-aerodynamics", "apexsim-aerodynamics"],
    note: "Throughflow, geometry, numerical methods and reproducible workflows.",
  },
  {
    name: "Mechanical & testing",
    ids: [
      "lilium-sandwich-structures",
      "warr-cryotank-fea",
      "feynman-fixed-wing-uav",
    ],
    note: "Test hardware, structural analysis and practical aerospace design.",
  },
];
export function ProfessionalHome() {
  const [track, setTrack] = useState(0);
  const [opened, setOpened] = useState<string | null>(null);
  const { language } = useReaderLanguage();
  const tr = (en: string, fr: string, de: string) =>
    language === "fr" ? fr : language === "de" ? de : en;
  return (
    <div className="research-home">
      <aside className="research-rail">
        <span>RK / ENGINEERING</span>
        <a href="#research-overview">01 Overview</a>
        <a href="#research-work">02 Selected evidence</a>
        <a href="#research-experience">03 Experience</a>
        <Link href="/profile">04 Full profile ↗</Link>
        <small>
          TOULOUSE
          <br />
          FRANCE
        </small>
      </aside>
      <div className="research-main">
        <section id="research-overview" className="research-intro">
          <div className="research-topline">
            <span>
              {tr(
                "PROFESSIONAL PORTFOLIO",
                "PORTFOLIO PROFESSIONNEL",
                "BERUFLICHES PORTFOLIO",
              )}
            </span>
            <Link href="/resume">
              <FileText size={14} /> {tr("Open CV", "Voir le CV", "Lebenslauf")}
            </Link>
          </div>
          <div className="research-identity">
            <Image
              src="/profile-hero.png"
              alt="Reghuram Kesavan"
              width={100}
              height={100}
              priority
            />
            <div>
              <h1>Reghuram Kesavan</h1>
              <p>
                {tr(
                  "Aerospace engineer · Mechanical engineering foundation",
                  "Ingénieur aérospatial · Formation en génie mécanique",
                  "Luft- und Raumfahrtingenieur · Hintergrund im Maschinenbau",
                )}
              </p>
            </div>
          </div>
          <h2>
            {tr("Aerodynamics.", "Aérodynamique.", "Aerodynamik.")}
            <br />
            {tr("Propulsion.", "Propulsion.", "Antrieb.")}
            <br />
            <em>
              {tr(
                "Computational methods.",
                "Méthodes numériques.",
                "Numerische Methoden.",
              )}
            </em>
          </h2>
          <p className="research-summary">
            {tr(
              "Research at ISAE-SUPAERO, graduate aerospace studies at TUM and mechanical design experience at Lilium. I work across physical modelling, scientific Python and aerospace test hardware.",
              "Recherche à l’ISAE-SUPAERO, études aérospatiales à la TUM et expérience en conception mécanique chez Lilium. Modélisation physique, Python scientifique et dispositifs d’essai aérospatiaux.",
              "Forschung an der ISAE-SUPAERO, Luft- und Raumfahrtstudien an der TUM und Konstruktionserfahrung bei Lilium. Physikalische Modellierung, wissenschaftliches Python und Prüfvorrichtungen für die Luftfahrt.",
            )}
          </p>
          <div className="research-facts">
            <div>
              <span>CURRENT RESEARCH</span>
              <strong>TRACE FanGEO</strong>
              <small>ISAE-SUPAERO · DAEP</small>
            </div>
            <div>
              <span>INDUSTRY</span>
              <strong>Lilium eAircraft</strong>
              <small>Mechanical design & testing</small>
            </div>
            <div>
              <span>EDUCATION</span>
              <strong>Master’s candidate</strong>
              <small>Expected December 2026</small>
            </div>
          </div>
        </section>
        <section id="research-work" className="research-work">
          <div className="research-section-label">
            <span>02 / SELECTED EVIDENCE</span>
            <Link href="/projects">
              All case studies <ArrowUpRight size={15} />
            </Link>
          </div>
          <h2>
            {tr(
              "Explore by engineering focus",
              "Explorer par domaine",
              "Nach Fachgebiet erkunden",
            )}
          </h2>
          <div className="research-tracks" aria-label="Engineering focus">
            {tracks.map((t, i) => (
              <button
                aria-pressed={i === track}
                key={t.name}
                onClick={() => {
                  setTrack(i);
                  setOpened(null);
                }}
              >
                {i === track && <Check size={14} />} {t.name}
              </button>
            ))}
          </div>
          <p className="research-track-note" role="status">
            {tracks[track].note}
          </p>
          <div className="research-records">
            {tracks[track].ids.map((id, i) => {
              const p = projects.find((p) => p.id === id)!;
              const tx = (translations as Record<string, string[]>)[id];
              return (
                <article key={id}>
                  <span className="research-record-index">0{i + 1}</span>
                  <div>
                    <p className="research-role">{p.role}</p>
                    <h3>
                      <Link href={`/projects/${id}`}>
                        {p.title}
                        <ArrowUpRight size={18} />
                      </Link>
                    </h3>
                    <p>
                      {language === "en"
                        ? p.impact
                        : (tx?.[language === "fr" ? 0 : 1] ?? p.impact)}
                    </p>
                    <div className="research-tools">
                      {p.tools.slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <button
                      className="research-evidence"
                      onClick={() => setOpened(opened === id ? null : id)}
                      aria-expanded={opened === id}
                      aria-controls={`evidence-${id}`}
                    >
                      {opened === id ? "−" : "+"} Verification & limitations
                    </button>
                    <div
                      id={`evidence-${id}`}
                      hidden={opened !== id}
                      className="research-evidence-body"
                    >
                      <p>{p.validation}</p>
                      <Link href={`/projects/${id}`}>
                        Read methods and results <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="research-experience" className="research-experience">
          <div className="research-section-label">
            <span>03 / INDUSTRY & ACADEMIC CONTEXT</span>
            <Link href="/experience">Career timeline ↗</Link>
          </div>
          <div className="research-two">
            <div>
              <h2>Industry experience</h2>
              <h3>Lilium eAircraft GmbH</h3>
              <p>Mechanical Design Engineer Intern</p>
              <small>April–November 2024 · Munich</small>
              <p>
                Test requirements, composite sandwich test fixtures, Siemens NX,
                GD&T and pre-test finite element analysis.
              </p>
              <h3>Feynman Aerospace LLP</h3>
              <p>Aircraft Design Intern</p>
              <small>April–October 2021 · India</small>
              <p>
                Low-Reynolds-number aerodynamic analysis, airframe CAD and
                prototype flight-test support.
              </p>
            </div>
            <div>
              <h2>Academic foundation</h2>
              <h3>ISAE-SUPAERO</h3>
              <p>
                Master in Aerospace Engineering · Advanced Aerodynamics &
                Propulsion
              </p>
              <h3>Technical University of Munich</h3>
              <p>Graduate Aerospace Engineering Studies · 57 ECTS</p>
              <h3>APJ Abdul Kalam Technological University</h3>
              <p>B.Tech (Honours) · Mechanical Engineering</p>
              <Link href="/profile">
                Education, coursework & full inventory ↗
              </Link>
            </div>
          </div>
        </section>
        <section className="research-contact">
          <div>
            <span>RESEARCH · ENGINEERING · COLLABORATION</span>
            <h2>Let’s discuss the work.</h2>
          </div>
          <a href="mailto:rgkreghu989@gmail.com">
            Get in touch <ArrowUpRight size={20} />
          </a>
        </section>
        <LanguageNote />
      </div>
    </div>
  );
}
