"use client";
import Image from "next/image";
import { FlightLab } from "./FlightLab";
import { usePortfolioMode } from "./PortfolioMode";
export function HeroVisual() {
  const { mode } = usePortfolioMode();
  return mode === "professional" ? (
    <FlightLab />
  ) : (
    <div className="identity-card">
      <div className="identity-top">
        <span>ENGINEER / PLAYER / CREATOR</span>
        <span>RK · 01</span>
      </div>
      <Image
        src="/profile-hero.png"
        alt="Reghuram Kesavan, wearing a red cap against colourful light trails"
        width={720}
        height={720}
        priority
        sizes="(max-width:700px) 90vw, 45vw"
      />
      <div className="identity-bottom">
        <strong>
          Many interests.
          <br />
          One curious mind.
        </strong>
        <span>
          TOULOUSE, FR
          <br />
          OPEN TO THE WORLD
        </span>
      </div>
    </div>
  );
}
