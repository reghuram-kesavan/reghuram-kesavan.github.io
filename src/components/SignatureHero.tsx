"use client";
import { ReaderIntro, useReaderLanguage } from "./ReaderLanguage";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePortfolioMode } from "./PortfolioMode";

export function SignatureHero() {
  const { t } = useReaderLanguage();
  const { mode } = usePortfolioMode();
  const professional = mode === "professional";
  return (
    <section className="signature-hero">
      <div className="signature-inner">
        <div className="signature-kicker">
          <span>
            <i /> TOULOUSE, FRANCE
          </span>
          <span>
            {professional
              ? "AERODYNAMICS / PROPULSION / SCIENTIFIC COMPUTING"
              : "AERODYNAMICS / PROPULSION / DESIGN"}
          </span>
          <span>PORTFOLIO — 2026</span>
        </div>
        <div className="signature-stage">
          <div className="signature-copy">
            <p className="signature-label">
              {professional
                ? "ENGINEERING PORTFOLIO"
                : "ONE PERSON. MULTIPLE WORLDS."}
            </p>
            <h1>
              REGHURAM
              <br />
              <span>KESAVAN</span>
              <b>.</b>
            </h1>
            <div className="signature-subtitle">
              {professional
                ? "AERODYNAMICS & PROPULSION"
                : "AEROSPACE ENGINEERING. A DIFFERENT PERSPECTIVE."}
            </div>
            <div className="signature-description">
              <ReaderIntro />
            </div>
            <div className="signature-actions">
              <Link href="#selected-work" className="signature-cta">
                {t(professional ? "Explore engineering" : "Enter my world")}
                <ArrowDown size={19} />
              </Link>
              <Link
                href={professional ? "/resume" : "/profile"}
                className="signature-secondary"
              >
                {t(professional ? "View CV" : "Full profile")}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className={`signature-art ${professional ? "technical" : ""}`}>
            <>
              <svg
                viewBox="0 0 600 700"
                className="speed-field"
                aria-hidden="true"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${-150 + i * 33} 750 Q${50 + i * 20} ${160 + i * 10} 700 ${-110 + i * 34}`}
                    fill="none"
                    stroke="currentColor"
                    opacity={0.12 + (i % 3) * 0.09}
                  />
                ))}
              </svg>
              <div className="portrait-cutout">
                <Image
                  src="/profile-hero.png"
                  alt="Reghuram Kesavan in a red cap and sunglasses, framed by colourful light trails"
                  width={900}
                  height={900}
                  priority
                  sizes="(max-width:760px) 95vw, 48vw"
                />
              </div>
              <div className="portrait-corner tl" />
              <div className="portrait-corner br" />
              <div className="art-index">RK / MULTIDISCIPLINARY BY NATURE</div>
              <div className="portrait-coordinate">
                INDIA → GERMANY → FRANCE
              </div>
              <div className="portrait-stamp">
                AERO
                <br />
                <span>& BEYOND</span>
              </div>
            </>
          </div>
        </div>
        <div className="signature-bottom">
          <span className="scroll-cue">
            <ArrowDown size={15} /> SCROLL TO EXPLORE
          </span>
          <div>
            <span>
              ISAE–SUPAERO <small>Master’s candidate</small>
            </span>
            <span>
              TUM <small>Graduate studies</small>
            </span>
            <span>
              LILIUM <small>Industry experience</small>
            </span>
          </div>
          <span className="signature-counter">01 — 04</span>
        </div>
      </div>
    </section>
  );
}
