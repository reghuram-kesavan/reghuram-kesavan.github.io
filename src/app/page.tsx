"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { usePortfolioMode } from "@/components/PortfolioMode";
import { useReaderLanguage } from "@/components/ReaderLanguage";
import { ProjectScene } from "@/components/ProjectScene";
import projects from "@/data/projects.json";
import translations from "@/data/project-translations.json";
const selection = [
  {
    id: "vorom-x-aerodynamics",
    name: "VOROM-X",
    type: "Aerodynamic methods",
    question: "How much can a simpler model tell us?",
    discipline: "01 / SCIENTIFIC COMPUTING",
  },
  {
    id: "high-lift-aerodynamics",
    name: "High-lift",
    type: "Transition & separation",
    question: "When models disagree, look at the flow.",
    discipline: "02 / AIRCRAFT AERODYNAMICS",
  },
  {
    id: "trace-fangeo",
    name: "TRACE FanGEO",
    type: "Throughflow & geometry",
    question: "From a design requirement to a blade.",
    discipline: "03 / PROPULSION",
  },
  {
    id: "apexsim-aerodynamics",
    name: "ApexSim",
    type: "CFD workflow development",
    question: "A better workflow before a faster lap.",
    discipline: "04 / MOTORSPORT METHODS",
  },
  {
    id: "lilium-sandwich-structures",
    name: "Lilium",
    type: "Mechanical test hardware",
    question: "The model has to meet the hardware.",
    discipline: "05 / INDUSTRY",
  },
];
export default function Home() {
  const [active, setActive] = useState(0);
  const { mode } = usePortfolioMode();
  const { language } = useReaderLanguage();
  const pro = mode === "professional";
  const tr = (en: string, fr: string, de: string) =>
    language === "fr" ? fr : language === "de" ? de : en;
  const item = selection[active];
  const project = projects.find((p) => p.id === item.id)!;
  const summary =
    language === "en"
      ? project.impact
      : (translations as Record<string, string[]>)[item.id][
          language === "fr" ? 0 : 1
        ];
  return (
    <div className={`portfolio-edition ${pro ? "edition-professional" : ""}`}>
      <section className="edition-hero">
        <div className="edition-hero-top">
          <span>REGHURAM KESAVAN</span>
          <span>TOULOUSE, FRANCE ↗</span>
        </div>
        <div className="edition-hero-grid">
          <div className="edition-headline">
            <p className="edition-kicker">
              {tr(
                "AEROSPACE ENGINEER / MECHANICAL ROOTS",
                "INGÉNIEUR AÉROSPATIAL / FORMATION MÉCANIQUE",
                "LUFT- UND RAUMFAHRT / MASCHINENBAU",
              )}
            </p>
            <h1>
              {tr("Engineering", "Ingénierie", "Engineering")}
              <br />
              <span>{tr("in motion.", "en mouvement.", "in Bewegung.")}</span>
            </h1>
            <p className="edition-intro">
              {pro
                ? tr(
                    "Aerodynamics, propulsion and scientific computing. Research at ISAE-SUPAERO. Graduate studies at TUM. Industry experience at Lilium.",
                    "Aérodynamique, propulsion et calcul scientifique. Recherche à l’ISAE-SUPAERO, études à la TUM et expérience chez Lilium.",
                    "Aerodynamik, Antrieb und wissenschaftliches Rechnen. Forschung an der ISAE-SUPAERO, Studien an der TUM und Industrieerfahrung bei Lilium.",
                  )
                : tr(
                    "Curious about how things move. Relentless about understanding why. I connect aerodynamic thinking, computational methods and the reality of building things.",
                    "Comprendre le mouvement. Chercher ses causes. Je relie réflexion aérodynamique, méthodes numériques et réalité de la conception.",
                    "Neugierig, wie sich Dinge bewegen. Entschlossen, das Warum zu verstehen. Ich verbinde Aerodynamik, numerische Methoden und praktische Konstruktion.",
                  )}
            </p>
            <a className="edition-main-cta" href="#selected-work">
              {tr(
                "Explore the work",
                "Explorer les projets",
                "Arbeiten entdecken",
              )}
              <ArrowDown size={20} />
            </a>
          </div>
          <div className="edition-portrait">
            <Image
              src="/profile-hero.png"
              alt="Reghuram Kesavan"
              width={1024}
              height={1024}
              priority
              sizes="(max-width:760px) 95vw, 48vw"
            />
            <div className="portrait-credit">
              <span>THE PERSON BEHIND THE WORK</span>
              <span>RK / 01</span>
            </div>
            <span className="portrait-orbit" aria-hidden="true" />
          </div>
        </div>
        <div className="edition-baseline">
          <span>
            INDIA <i /> GERMANY <i /> FRANCE
          </span>
          <p>
            {tr(
              "A mechanical foundation. An aerospace direction.",
              "Une base mécanique. Un cap aérospatial.",
              "Ein Fundament im Maschinenbau. Ein Weg in die Luft- und Raumfahrt.",
            )}
          </p>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>
      <section id="selected-work" className="edition-work">
        <div className="edition-section-top">
          <p>
            01 —{" "}
            {tr("SELECTED WORK", "PROJETS CHOISIS", "AUSGEWÄHLTE ARBEITEN")}
          </p>
          <Link href="/projects">
            {tr("All case studies", "Tous les projets", "Alle Projekte")}{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="edition-work-heading">
          <h2>
            {tr("Ideas into", "Des idées aux", "Von Ideen zu")}
            <br />
            <em>{tr("engineering.", "réalisations.", "Ingenieurarbeit.")}</em>
          </h2>
          <p>
            {tr(
              "Five perspectives on the same ambition: understand the physics, develop the method, question the result.",
              "Cinq perspectives, une ambition : comprendre la physique, développer la méthode, interroger le résultat.",
              "Fünf Perspektiven, ein Anspruch: Physik verstehen, Methoden entwickeln, Ergebnisse hinterfragen.",
            )}
          </p>
        </div>
        <div
          className="edition-selector"
          aria-label="Choose a featured project"
        >
          {selection.map((s, i) => (
            <button
              key={s.id}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <small>0{i + 1}</small>
              {s.name}
              <span>↗</span>
            </button>
          ))}
        </div>
        <div className="edition-feature" key={item.id}>
          <div className="edition-feature-art">
            <ProjectScene id={item.id} />
          </div>
          <div className="edition-feature-copy" aria-live="polite">
            <span className="edition-kicker">{item.discipline}</span>
            <h3>
              {item.name}
              <span>{item.type}</span>
            </h3>
            <p lang={language}>{summary}</p>
            <div className="edition-tools">
              {project.tools.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href={`/projects/${item.id}`} className="edition-case-link">
              {tr("Inside the project", "Explorer le projet", "Zum Projekt")}{" "}
              <ArrowUpRight />
            </Link>
            <div className="edition-pager">
              <button
                aria-label="Previous featured project"
                onClick={() =>
                  setActive((active + selection.length - 1) % selection.length)
                }
              >
                <ArrowLeft size={18} />
              </button>
              <span>0{active + 1} / 05</span>
              <button
                aria-label="Next featured project"
                onClick={() => setActive((active + 1) % selection.length)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="edition-journey">
        <div className="edition-section-top">
          <p>02 — {tr("THE JOURNEY", "LE PARCOURS", "DER WEG")}</p>
          <Link href="/profile">
            {tr("Full profile", "Profil complet", "Vollständiges Profil")}{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="edition-journey-grid">
          <h2>
            {tr("Built across", "Un parcours", "Geprägt durch")}
            <br />
            <em>{tr("disciplines.", "pluridisciplinaire.", "Vielfalt.")}</em>
          </h2>
          <div>
            {[
              [
                "01",
                "ISAE-SUPAERO",
                "Aerodynamics & propulsion",
                "Toulouse · Master’s candidate",
              ],
              [
                "02",
                "Lilium",
                "Mechanical design & test hardware",
                "Munich · Industry experience",
              ],
              ["03", "TUM", "Graduate aerospace studies", "Munich · 57 ECTS"],
              [
                "04",
                "KTU",
                "Mechanical engineering",
                "India · B.Tech (Honours)",
              ],
            ].map(([n, title, focus, detail]) => (
              <Link href="/profile" key={n} className="edition-journey-row">
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{focus}</p>
                  <small>{detail}</small>
                </div>
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="edition-contact">
        <p>03 — {tr("WHAT’S NEXT", "LA SUITE", "WAS KOMMT")}</p>
        <h2>
          {tr("Let’s build", "Construisons", "Gemeinsam")}
          <br />
          <em>{tr("something real.", "du concret.", "etwas schaffen.")}</em>
        </h2>
        <a href="mailto:rgkreghu989@gmail.com">
          rgkreghu989@gmail.com <ArrowUpRight size={25} />
        </a>
        <Link href="/resume">
          {tr("View my CV", "Voir mon CV", "Mein Lebenslauf")} ↗
        </Link>
      </section>
    </div>
  );
}
