"use client";
import { useId, useState } from "react";
const specs: Record<string, [string, string, string, string]> = {
  "vorom-x-aerodynamics": ["Lifting surface", "Planform spread", "", "#80bfff"],
  "high-lift-aerodynamics": ["Airfoil incidence", "Incidence", "°", "#ffb48c"],
  "apexsim-aerodynamics": [
    "Ground-effect study",
    "Ride-height view",
    "",
    "#b6a0ff",
  ],
  "trace-fangeo": ["Fan blade geometry", "Rotor orientation", "°", "#72e1d0"],
  "lilium-sandwich-structures": [
    "Sandwich panel assembly",
    "Layer separation",
    "",
    "#d4c29c",
  ],
  "feynman-fixed-wing-uav": ["Fixed-wing UAV", "Bank angle", "°", "#a1cf8b"],
  "dep-aircraft-aero": [
    "Distributed nacelles",
    "Nacelle spacing",
    "",
    "#6bd9fb",
  ],
  "warr-cryotank-fea": [
    "Composite tank section",
    "Section position",
    "%",
    "#cdacff",
  ],
  "gpr-defect-mapping": [
    "Radar survey section",
    "Scan position",
    "%",
    "#e5bb67",
  ],
  "rc-water-carrier": [
    "RC transport vehicle",
    "Payload position",
    "%",
    "#81ced0",
  ],
  "leo-satellite-power": [
    "Spacecraft power",
    "Solar array angle",
    "°",
    "#ffcf7c",
  ],
  "baja-sae-buggy": ["Suspension geometry", "Steering angle", "°", "#ff8f91"],
};
export function ProjectScene({ id }: { id: string }) {
  const [value, setValue] = useState(20);
  const key = useId().replace(/:/g, "");
  const [title, control, unit, color] = specs[id] ?? [
    "Engineering study",
    "View",
    "°",
    "#abc",
  ];
  const displayed =
    id === "high-lift-aerodynamics"
      ? (value / 4).toFixed(1)
      : id === "trace-fangeo"
        ? value * 3
        : [
              "feynman-fixed-wing-uav",
              "leo-satellite-power",
              "baja-sae-buggy",
            ].includes(id)
          ? value - 20
          : value;
  const aircraft = (
    <g
      fill="currentColor"
      fillOpacity=".13"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M280 65 Q300 38 320 65 L320 150 495 220 495 242 318 207 318 275 370 310 370 322 300 300 230 322 230 310 282 275 282 207 105 242 105 220 280 150Z" />
      <path d="M300 65V300" opacity=".4" />
    </g>
  );
  return (
    <div
      className="project-scene"
      style={{ "--scene-color": color } as React.CSSProperties}
    >
      <div className="scene-caption">
        <span>{title}</span>
        <span>EXPLORE ↘</span>
      </div>
      <svg
        viewBox="0 0 600 360"
        role="img"
        aria-label={`${title}: interactive conceptual illustration`}
      >
        <defs>
          <radialGradient id={key}>
            <stop stopColor={color} stopOpacity=".17" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="360" fill={`url(#${key})`} />
        {id === "vorom-x-aerodynamics" && (
          <g stroke="currentColor" fill="none">
            <path
              d={`M300 65 L${90 - value} 285 300 220 ${510 + value} 285Z`}
              fill="currentColor"
              fillOpacity=".08"
            />
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d={`M${100 + i * 17} ${280 - i * 17}L${300 + i * 17} ${220 + i * 5} l40 45`}
                opacity=".5"
              />
            ))}
            <path d="M60 315 Q300 160 540 315" strokeDasharray="5 6" />
            <text x="65" y="340">
              planform / wake
            </text>
          </g>
        )}
        {id === "high-lift-aerodynamics" && (
          <g stroke="currentColor" fill="none">
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M20 ${50 + i * 35} C150 ${45 + i * 35} 160 ${i * 40 - 30} 300 ${55 + i * 32} S470 ${65 + i * 32} 580 ${65 + i * 32}`}
                opacity=".2"
              />
            ))}
            <g transform={`rotate(${-value / 4} 300 180)`}>
              <path
                d="M100 200 C130 70 300 140 510 200 C310 215 160 235 100 200Z"
                fill="currentColor"
                fillOpacity=".2"
                strokeWidth="3"
              />
              <path d="M100 200H510" strokeDasharray="4 5" />
            </g>
          </g>
        )}
        {id === "apexsim-aerodynamics" && (
          <g stroke="currentColor" strokeWidth="2">
            <path d="M50 295H550" />
            <g
              transform={`translate(0 ${-value / 2})`}
              fill="currentColor"
              fillOpacity=".15"
            >
              <path d="M95 260L120 225 220 218 257 158 325 158 345 210 445 221 510 255 510 269H95Z" />
              <circle cx="160" cy="252" r="34" fill="#10121d" />
              <circle cx="433" cy="252" r="38" fill="#10121d" />
              <path d="M100 205H182M408 184H490M458 184V223" />
            </g>
            <path
              d="M80 320Q270 265 520 320"
              fill="none"
              strokeDasharray="8 8"
            />
            <text x="65" y="70">
              RIDE HEIGHT / GEOMETRY
            </text>
          </g>
        )}
        {id === "trace-fangeo" && (
          <g
            transform={`translate(300 180) rotate(${value * 3})`}
            stroke="currentColor"
          >
            <circle r="125" fill="none" opacity=".4" />
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${i * 30})`}
                d="M38 0 Q60 -65 118 -42 L128 -14 Q65 -15 40 15Z"
                fill="currentColor"
                fillOpacity=".25"
              />
            ))}
            <circle r="38" fill="#10191f" />
            <circle r="10" fill="currentColor" />
          </g>
        )}
        {id === "lilium-sandwich-structures" && (
          <g stroke="currentColor" fill="currentColor" fillOpacity=".15">
            {[-1, 0, 1].map((n) => (
              <g key={n} transform={`translate(0 ${n * (20 + value)})`}>
                <path d="M120 150L360 90 500 170 260 240Z" />
                {n === 0 &&
                  Array.from({ length: 9 }, (_, i) => (
                    <path
                      key={i}
                      d={`M${150 + i * 25} ${150 - i * 5}l60 36-15 10-60-35Z`}
                    />
                  ))}
              </g>
            ))}
            <path d="M300 20V85m-10-10 10 10 10-10" fill="none" />
          </g>
        )}
        {id === "feynman-fixed-wing-uav" && (
          <g transform={`rotate(${value - 20} 300 180)`}>
            {aircraft}
            <circle
              cx="300"
              cy="65"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeDasharray="5 7"
            />
          </g>
        )}
        {id === "dep-aircraft-aero" && (
          <g stroke="currentColor" fill="currentColor" fillOpacity=".12">
            <path d="M65 200L280 120 325 120 535 200 535 228 325 185 280 185 65 228Z" />
            {[-3, -2, -1, 1, 2, 3].map((n) => (
              <g
                key={n}
                transform={`translate(${300 + n * (40 + value / 3)} ${145 + Math.abs(n) * 14})`}
              >
                <rect x="-10" y="-25" width="20" height="65" rx="10" />
                <ellipse rx="16" ry="6" cy="-20" />
              </g>
            ))}
            <path d="M285 300V75Q300 40 315 75V300Z" />
          </g>
        )}
        {id === "warr-cryotank-fea" && (
          <g stroke="currentColor" fill="none">
            <path
              d="M205 90Q300 0 395 90V275Q300 355 205 275Z"
              fill="currentColor"
              fillOpacity=".08"
            />
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M205 ${95 + i * 25}Q300 ${145 + i * 25} 395 ${95 + i * 25}`}
                opacity=".4"
              />
            ))}
            <ellipse
              cx="300"
              cy={90 + value * 3}
              rx="95"
              ry="30"
              strokeWidth="3"
            />
            <path d="M300 25V335" strokeDasharray="4 7" />
          </g>
        )}
        {id === "gpr-defect-mapping" && (
          <g stroke="currentColor" fill="none">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M60 ${110 + i * 23} Q190 ${95 + i * 20} 290 ${105 + i * 22} T540 ${110 + i * 23}`}
                opacity=".25"
              />
            ))}
            {[160, 310, 430].map((x) => (
              <path key={x} d={`M${x - 60} 270Q${x} 80 ${x + 60} 270`} />
            ))}
            <path d={`M${80 + value * 7} 60V320`} strokeWidth="3" />
            <rect
              x={65 + value * 7}
              y="45"
              width="30"
              height="20"
              fill="currentColor"
            />
          </g>
        )}
        {id === "rc-water-carrier" && (
          <g>
            <g stroke="currentColor" fill="currentColor" fillOpacity=".15">
              <path d="M130 130H470V245H130Z" />
              <rect x="110" y="140" width="35" height="85" rx="10" />
              <rect x="455" y="140" width="35" height="85" rx="10" />
              <path d="M150 185H450" />
            </g>
            <rect
              x={255 + value}
              y="185"
              width="45"
              height="65"
              rx="8"
              fill="currentColor"
              fillOpacity=".7"
            />
            <path
              d="M320 215H520"
              stroke="currentColor"
              strokeDasharray="4 6"
            />
            <text x="420" y="205" fill="currentColor">
              PAYLOAD
            </text>
          </g>
        )}
        {id === "leo-satellite-power" && (
          <g
            stroke="currentColor"
            fill="currentColor"
            fillOpacity=".18"
            transform="translate(300 180)"
          >
            <rect x="-40" y="-50" width="80" height="100" />
            <g transform={`rotate(${value - 20})`}>
              {[-1, 1].map((n) => (
                <g key={n}>
                  <rect
                    x={n === 1 ? 55 : -215}
                    y="-40"
                    width="160"
                    height="80"
                  />
                  {Array.from({ length: 5 }, (_, i) => (
                    <path
                      key={i}
                      d={`M${(n === 1 ? 55 : -215) + i * 32} -40V40`}
                    />
                  ))}
                </g>
              ))}
            </g>
            <circle r="145" fill="none" strokeDasharray="4 12" opacity=".3" />
          </g>
        )}
        {id === "baja-sae-buggy" && (
          <g stroke="currentColor" fill="none" strokeWidth="3">
            <path d="M220 100H380V270H220ZM220 130L135 110V230L220 250M380 130L465 110V230L380 250M220 130L135 230M380 130L465 230" />
            {[130, 470].map((x) => (
              <rect
                key={x}
                x={x - 20}
                y="140"
                width="40"
                height="65"
                rx="10"
                fill="currentColor"
                fillOpacity=".2"
                transform={`rotate(${value - 20} ${x} 172)`}
              />
            ))}
            <path d="M250 280H350" />
          </g>
        )}
      </svg>
      <div className="scene-control">
        <label htmlFor={key + "-slider"}>
          {control}
          <output>
            {displayed}
            {unit}
          </output>
        </label>
        <input
          id={key + "-slider"}
          type="range"
          aria-valuetext={`${displayed}${unit}`}
          min="0"
          max="40"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <small>
          Interactive geometry illustration · not simulation results
        </small>
      </div>
    </div>
  );
}
