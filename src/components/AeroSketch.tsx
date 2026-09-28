export function AeroSketch({ variant = "wing" }: { variant?: string }) {
  return (
    <svg
      className="aero-sketch"
      viewBox="0 0 600 360"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" opacity=".12">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${i * 50} 0V360`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M0 ${i * 50}H600`} />
        ))}
      </g>
      {variant === "fan" ? (
        <g transform="translate(300 180)">
          <circle r="116" stroke="currentColor" opacity=".25" />
          <circle r="37" stroke="currentColor" />
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 24})`}
              d="M35 0 Q80 -20 118 -2 L110 22 Q65 8 35 9Z"
              fill="currentColor"
              fillOpacity=".06"
              stroke="currentColor"
              strokeWidth=".8"
            />
          ))}
          <circle r="8" fill="currentColor" />
        </g>
      ) : variant === "airfoil" ? (
        <g>
          <path
            d="M70 210 C115 90 250 120 530 205 C290 213 130 242 70 210Z"
            fill="currentColor"
            fillOpacity=".08"
            stroke="currentColor"
            strokeWidth="2"
          />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M0 ${90 + i * 22} C140 ${-20 + i * 30} 245 ${85 + i * 19} 600 ${125 + i * 19}`}
              stroke="currentColor"
              opacity={0.12 + i * 0.05}
            />
          ))}
        </g>
      ) : (
        <g>
          <path
            d="M85 253L345 99L520 183L283 235Z"
            fill="currentColor"
            fillOpacity=".06"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {Array.from({ length: 14 }, (_, i) => {
            const t = i / 13;
            return (
              <path
                key={i}
                d={`M${85 + 260 * t} ${253 - 154 * t}L${283 + 237 * t} ${235 - 52 * t}`}
                stroke="currentColor"
                opacity=".45"
              />
            );
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const t = i / 5;
            return (
              <path
                key={i}
                d={`M${85 + 198 * t} ${253 - 18 * t}L${345 + 175 * t} ${99 + 84 * t}`}
                stroke="currentColor"
                opacity=".45"
              />
            );
          })}
          <path
            d="M85 253L128 303M283 235L326 285M520 183L563 233"
            stroke="currentColor"
            strokeDasharray="4 6"
            opacity=".35"
          />
        </g>
      )}
      <path d="M30 318h38m-38 0v-38" stroke="currentColor" opacity=".6" />
      <text
        x="77"
        y="323"
        fill="currentColor"
        fontSize="10"
        fontFamily="monospace"
        opacity=".55"
      >
        SCHEMATIC / NOT SIMULATION DATA
      </text>
    </svg>
  );
}
