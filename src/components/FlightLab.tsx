"use client";
import { useState } from "react";
export function FlightLab() {
  const [sweep, setSweep] = useState(25);
  const tip = 90 + 220 * Math.tan((sweep * Math.PI) / 180);
  return (
    <div className="flight-lab">
      <div className="lab-heading">
        <span>DESIGN EXPLORER / 01</span>
        <span className="lab-live">Interactive geometry</span>
      </div>
      <svg
        viewBox="0 0 600 360"
        role="img"
        aria-label={`Illustrative wing planform at ${sweep} degrees sweep`}
      >
        <defs>
          <pattern
            id="lab-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0H0V30"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".1"
            />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#lab-grid)" />
        <g stroke="currentColor" fill="none">
          <path
            d={`M300 90 L520 ${tip} L520 ${tip + 55} L300 180 L80 ${tip + 55} L80 ${tip} Z`}
            fill="currentColor"
            fillOpacity=".05"
            strokeWidth="1.7"
          />
          {Array.from({ length: 10 }, (_, i) => {
            const t = (i + 1) / 11;
            return (
              <g key={i} opacity=".45">
                <path
                  d={`M${300 + 220 * t} ${90 + (tip - 90) * t}L${300 + 220 * t} ${180 + (tip - 125) * t}`}
                />
                <path
                  d={`M${300 - 220 * t} ${90 + (tip - 90) * t}L${300 - 220 * t} ${180 + (tip - 125) * t}`}
                />
              </g>
            );
          })}
          <path d="M300 40V310M80 300H520" strokeDasharray="4 7" opacity=".3" />
          <circle cx="300" cy="90" r="5" fill="var(--signal)" stroke="none" />
        </g>
        <text
          x="314"
          y="52"
          fill="currentColor"
          fontSize="9"
          fontFamily="monospace"
        >
          LEADING EDGE
        </text>
        <text
          x="32"
          y="333"
          fill="currentColor"
          fontSize="9"
          fontFamily="monospace"
          opacity=".7"
        >
          GEOMETRY STUDY · NOT A CFD SOLUTION
        </text>
      </svg>
      <div className="lab-controls">
        <label htmlFor="sweep">
          Sweep angle <output htmlFor="sweep">{sweep}°</output>
        </label>
        <input
          id="sweep"
          type="range"
          min="10"
          max="40"
          value={sweep}
          onChange={(e) => setSweep(Number(e.target.value))}
        />
        <p>
          Move the slider to explore the planform. Aerodynamic performance
          requires a separate analysis.
        </p>
      </div>
    </div>
  );
}
