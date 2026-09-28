"use client";
import { useState } from "react";
import {
  Crosshair,
  Gamepad2,
  AudioLines,
  Flag,
  Globe2,
  Activity,
  ArrowUpRight,
} from "lucide-react";
const modes = [
  {
    name: "Valorant",
    icon: Crosshair,
    line: "THE NEXT ROUND.",
    copy: "FPS gaming is part of my downtime, especially Valorant. Strategy, communication and adapting to what happens next — that’s the part I enjoy.",
    tag: "01 / FPS & TEAMPLAY",
    word: "CLUTCH",
  },
  {
    name: "FIFA",
    icon: Gamepad2,
    line: "CREATE THE SPACE.",
    copy: "A different competitive arena. Finding space, building a play and enjoying a good match — FIFA is part of my gaming world too.",
    tag: "02 / FOOTBALL & GAMING",
    word: "PLAY",
  },
  {
    name: "Dance",
    icon: AudioLines,
    line: "MOVE WITH INTENT.",
    copy: "Dance and choreography are my creative outlet. Leading a crew means building something together through practice, rhythm and shared ownership.",
    tag: "03 / MOVEMENT & EXPRESSION",
    word: "FLOW",
  },
  {
    name: "Formula 1",
    icon: Flag,
    line: "EVERY DETAIL COUNTS.",
    copy: "An F1 enthusiast with an aerodynamicist’s curiosity: fascinated by the connection between engineering choices, performance and race strategy.",
    tag: "04 / MOTORSPORT & ENGINEERING",
    word: "APEX",
  },
  {
    name: "Travel",
    icon: Globe2,
    line: "CHANGE THE VIEW.",
    copy: "Travel opens up new places and perspectives. My academic and professional journey has also taken me between India, Germany and France.",
    tag: "05 / PLACES & PERSPECTIVES",
    word: "ROAM",
  },
  {
    name: "Badminton",
    icon: Activity,
    line: "COMMIT TO THE SHOT.",
    copy: "Badminton keeps me moving. I enjoy the timing, the focus and the quick decisions — and a little friendly competition.",
    tag: "06 / SPORT & FOCUS",
    word: "REACT",
  },
];
export function PersonalModes() {
  const [active, setActive] = useState(0);
  const item = modes[active];
  const Icon = item.icon;
  return (
    <div className="personality-console">
      <div className="mode-buttons" aria-label="Explore my interests">
        {modes.map((m, i) => (
          <button
            key={m.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <m.icon size={16} />
            {m.name}
          </button>
        ))}
      </div>
      <div className="personality-scene" data-interest={active}>
        <div className="personality-orbit" aria-hidden="true">
          <Icon size={100} strokeWidth={0.7} />
          <span>{item.word}</span>
        </div>
        <div className="mode-copy" aria-live="polite">
          <p className="eyebrow">{item.tag}</p>
          <h3>{item.line}</h3>
          <p>{item.copy}</p>
          <ArrowUpRight size={26} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
