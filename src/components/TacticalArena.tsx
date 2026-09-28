"use client";

import { useState, useEffect, useRef } from "react";
import {
  Crosshair,
  Gamepad2,
  AudioLines,
  Flag,
  Globe2,
  Activity,
  Zap,
  Flame,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  ChevronRight,
  Shield,
  Layers,
  Award,
} from "lucide-react";

export function TacticalArena() {
  const [activeTab, setActiveTab] = useState<
    "valorant" | "fifa" | "dance" | "f1" | "travel" | "badminton"
  >("valorant");

  // Valorant Reflex Game State
  const [reflexState, setReflexState] = useState<
    "idle" | "waiting" | "ready" | "clicked"
  >("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestReflex, setBestReflex] = useState<number | null>(null);
  const [crosshairStyle, setCrosshairStyle] = useState<"dot" | "classic" | "tactical">("tactical");
  const waitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // FIFA Tactics State
  const [formation, setFormation] = useState<"4-3-3" | "3-5-2" | "4-2-3-1">("4-3-3");

  // Dance Beats State
  const [tempo, setTempo] = useState<number>(128);
  const [isPlayingBeat, setIsPlayingBeat] = useState<boolean>(true);

  // F1 Telemetry State
  const [cornerSpeed, setCornerSpeed] = useState<number>(245);
  const [aeroBalance, setAeroBalance] = useState<number>(48.5);

  // Travel Active Node
  const [activeCity, setActiveCity] = useState<string>("Toulouse");

  // Reflex test logic
  const startReflexTest = () => {
    setReflexState("waiting");
    setReactionTime(null);
    const delay = 1200 + Math.random() * 2500;
    waitTimeoutRef.current = setTimeout(() => {
      setReflexState("ready");
      startTimeRef.current = performance.now();
    }, delay);
  };

  const handleReflexClick = () => {
    if (reflexState === "waiting") {
      if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
      setReflexState("idle");
      setReactionTime(-1); // False start
    } else if (reflexState === "ready") {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setReflexState("clicked");
      setBestReflex((prev) => (prev === null ? elapsed : Math.min(prev, elapsed)));
    }
  };

  useEffect(() => {
    return () => {
      if (waitTimeoutRef.current) clearTimeout(waitTimeoutRef.current);
    };
  }, []);

  return (
    <section className="tactical-arena-section shell">
      {/* Header Banner */}
      <div className="tactical-header">
        <div className="tactical-kicker">
          <span className="live-pulse">
            <span className="pulse-dot" /> LIVE ARENA PROTOCOL
          </span>
          <span className="mono-sub">PERSONALITY & COMPETITIVE PROFILE</span>
        </div>
        <h2 className="tactical-title">
          ONE MIND.
          <br />
          <em>INFINITE VECTORS.</em>
        </h2>
        <p className="tactical-lead">
          Engineering is not confined to equations in a silo. High-stakes FPS clutch reflex,
          tactical football pitch geometry, 25-dancer national stage choreography, and Formula 1
          downforce dynamics share the exact same foundation: <strong>spatial intuition, micro-second timing, and calm execution under pressure.</strong>
        </p>
      </div>

      {/* Mode Navigation Bar */}
      <div className="tactical-nav" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "valorant"}
          onClick={() => setActiveTab("valorant")}
          className={`tab-btn ${activeTab === "valorant" ? "active val" : ""}`}
        >
          <Crosshair className="tab-icon" size={18} />
          <span>FPS & Valorant</span>
          <span className="tab-tag">AIM & CLUTCH</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "fifa"}
          onClick={() => setActiveTab("fifa")}
          className={`tab-btn ${activeTab === "fifa" ? "active fifa" : ""}`}
        >
          <Gamepad2 className="tab-icon" size={18} />
          <span>FIFA & Football</span>
          <span className="tab-tag">PITCH TACTICS</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "dance"}
          onClick={() => setActiveTab("dance")}
          className={`tab-btn ${activeTab === "dance" ? "active dance" : ""}`}
        >
          <AudioLines className="tab-icon" size={18} />
          <span>Dance & Choreography</span>
          <span className="tab-tag">WOD 2019 FINALIST</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "f1"}
          onClick={() => setActiveTab("f1")}
          className={`tab-btn ${activeTab === "f1" ? "active f1" : ""}`}
        >
          <Flag className="tab-icon" size={18} />
          <span>Formula 1 Racing</span>
          <span className="tab-tag">DOWNFORCE & APEX</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "travel"}
          onClick={() => setActiveTab("travel")}
          className={`tab-btn ${activeTab === "travel" ? "active travel" : ""}`}
        >
          <Globe2 className="tab-icon" size={18} />
          <span>Global Expeditions</span>
          <span className="tab-tag">5 NATIONS</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "badminton"}
          onClick={() => setActiveTab("badminton")}
          className={`tab-btn ${activeTab === "badminton" ? "active badm" : ""}`}
        >
          <Activity className="tab-icon" size={18} />
          <span>Kinetic Agility</span>
          <span className="tab-tag">300 KM/H SMASH</span>
        </button>
      </div>

      {/* Main Console Canvas */}
      <div className="tactical-viewport">
        {/* ================= TAB 1: VALORANT ================= */}
        {activeTab === "valorant" && (
          <div className="console-panel valorant-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill val-pill">
                  <Flame size={14} /> CLUTCH ARCHITECTURE
                </div>
                <h3>Tactical Reflex & Headshot Discipline</h3>
                <p>
                  In competitive FPS, victory is decided in 180 milliseconds. Under a 1v3 post-plant
                  scenario, panic is immediate defeat. Isolating 1v1 angles, reading enemy rotations,
                  and tracking crosshair placement at head-level is the digital equivalent of
                  solving a complex boundary-layer problem under severe time constraints.
                </p>

                <div className="spec-table">
                  <div className="spec-row">
                    <span className="spec-k">PRIMARY ROLE</span>
                    <span className="spec-v">Controller / Initiator (Map Control & Utility Timing)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">TACTICAL ETHOS</span>
                    <span className="spec-v">Crosshair discipline, site anchor & post-plant calm</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">CROSSHAIR SETUP</span>
                    <div className="crosshair-toggles">
                      <button
                        className={crosshairStyle === "dot" ? "active" : ""}
                        onClick={() => setCrosshairStyle("dot")}
                      >
                        Cyan Dot
                      </button>
                      <button
                        className={crosshairStyle === "classic" ? "active" : ""}
                        onClick={() => setCrosshairStyle("classic")}
                      >
                        Static Cross
                      </button>
                      <button
                        className={crosshairStyle === "tactical" ? "active" : ""}
                        onClick={() => setCrosshairStyle("tactical")}
                      >
                        Tactical Gap
                      </button>
                    </div>
                  </div>
                </div>

                <div className="synergy-box">
                  <Sparkles size={16} className="text-cyan-400" />
                  <div>
                    <strong>The Aerospace Connection:</strong>
                    <span> High-G flight dynamics and tactical gaming demand the same cognitive trait: keeping physiological heart rate low while processing rapid multi-channel telemetry.</span>
                  </div>
                </div>
              </div>

              {/* Interactive Reflex Simulator */}
              <div className="panel-interactive">
                <div className="interactive-card val-card">
                  <div className="card-header">
                    <span className="mono-label">TACTICAL_REFLEX_TRAINER v2.4</span>
                    <span className="status-indicator">
                      {reflexState === "idle" && "READY TO TEST"}
                      {reflexState === "waiting" && "HOLD POSITION..."}
                      {reflexState === "ready" && "FIRE NOW!"}
                      {reflexState === "clicked" && "TARGET ACQUIRED"}
                    </span>
                  </div>

                  <div
                    onClick={reflexState !== "idle" ? handleReflexClick : undefined}
                    className={`reflex-target-area state-${reflexState}`}
                  >
                    {reflexState === "idle" && (
                      <div className="target-idle-content">
                        {/* Custom Crosshair Display */}
                        <div className={`crosshair-preview style-${crosshairStyle}`}>
                          <div className="ch-center" />
                          {crosshairStyle !== "dot" && (
                            <>
                              <div className="ch-top" />
                              <div className="ch-bottom" />
                              <div className="ch-left" />
                              <div className="ch-right" />
                            </>
                          )}
                        </div>
                        <button onClick={startReflexTest} className="btn-fire">
                          <Zap size={18} /> START REFLEX TEST
                        </button>
                        <span className="sub-prompt">Tests neuromuscular reaction latency</span>
                      </div>
                    )}

                    {reflexState === "waiting" && (
                      <div className="target-waiting">
                        <div className="pulse-ring" />
                        <span className="wait-text">WAIT FOR CYAN RETICLE...</span>
                        <span className="penalty-warn">Clicking now causes false-fire penalty</span>
                      </div>
                    )}

                    {reflexState === "ready" && (
                      <div className="target-ready">
                        <div className="flash-target">
                          <Crosshair size={72} strokeWidth={2.5} />
                          <span>CLICK!</span>
                        </div>
                      </div>
                    )}

                    {reflexState === "clicked" && (
                      <div className="target-result">
                        {reactionTime === -1 ? (
                          <div className="false-start">
                            <span className="text-red-400 text-3xl font-black">FALSE START!</span>
                            <p>You fired before target confirmation. Re-center and reset.</p>
                          </div>
                        ) : (
                          <div className="score-display">
                            <Timer size={36} className="text-cyan-400" />
                            <div className="time-number">{reactionTime} ms</div>
                            <span className="rank-tag">
                              {reactionTime! < 200
                                ? "⚡ RADIANT TIER REFLEX"
                                : reactionTime! < 240
                                ? "🎯 IMMORTAL PRECISION"
                                : "👍 SOLID REACTION"}
                            </span>
                          </div>
                        )}
                        <button onClick={startReflexTest} className="btn-retry">
                          <RotateCcw size={16} /> TEST AGAIN
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <span>Best Session: <strong>{bestReflex ? `${bestReflex} ms` : "—"}</strong></span>
                    <span>Pro Avg: <strong>195 ms</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: FIFA & FOOTBALL ================= */}
        {activeTab === "fifa" && (
          <div className="console-panel fifa-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill fifa-pill">
                  <Gamepad2 size={14} /> PITCH DYNAMICS
                </div>
                <h3>Fluid Spatial Geometry & Half-Space Infiltration</h3>
                <p>
                  Football is dynamic geometry in motion. Whether controlling the pitch on FIFA or
                  reading the game in real life, success lies in creating overloads, drawing defensive
                  markers out of shape, and threading passes into unoccupied zones.
                </p>

                <div className="formation-picker">
                  <span className="mono-sub">SELECT TACTICAL FORMATION:</span>
                  <div className="formation-buttons">
                    <button
                      className={formation === "4-3-3" ? "active" : ""}
                      onClick={() => setFormation("4-3-3")}
                    >
                      4-3-3 Attacking
                    </button>
                    <button
                      className={formation === "3-5-2" ? "active" : ""}
                      onClick={() => setFormation("3-5-2")}
                    >
                      3-5-2 Wingback Overload
                    </button>
                    <button
                      className={formation === "4-2-3-1" ? "active" : ""}
                      onClick={() => setFormation("4-2-3-1")}
                    >
                      4-2-3-1 High Press
                    </button>
                  </div>
                </div>

                <div className="spec-table mt-6">
                  <div className="spec-row">
                    <span className="spec-k">TACTICAL SETUP</span>
                    <span className="spec-v">{formation} High Line Possession</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">PLAYING PHILOSOPHY</span>
                    <span className="spec-v">Tiki-taka progression, quick 1-2 passing, half-space runs</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">KEY ASSET</span>
                    <span className="spec-v">High football IQ & calm spatial awareness under pressure</span>
                  </div>
                </div>
              </div>

              {/* Interactive Pitch Diagram */}
              <div className="panel-interactive">
                <div className="interactive-card pitch-card">
                  <div className="card-header">
                    <span className="mono-label">TACTICAL_PITCH_BOARD // {formation}</span>
                    <span className="status-indicator">OFFENSIVE SHIFT</span>
                  </div>

                  <svg viewBox="0 0 500 340" className="pitch-svg" aria-label="Football pitch tactics">
                    {/* Pitch Turf & Lines */}
                    <rect x="10" y="10" width="480" height="320" rx="8" fill="#0d1f14" stroke="#22543d" strokeWidth="2" />
                    {/* Halfway line */}
                    <line x1="250" y1="10" x2="250" y2="330" stroke="#2f855a" strokeWidth="1.5" strokeDasharray="4 4" />
                    {/* Center circle */}
                    <circle cx="250" cy="170" r="45" fill="none" stroke="#2f855a" strokeWidth="1.5" />
                    <circle cx="250" cy="170" r="3" fill="#48bb78" />

                    {/* Penalty Boxes */}
                    <rect x="10" y="80" width="70" height="180" fill="none" stroke="#2f855a" strokeWidth="1.5" />
                    <rect x="420" y="80" width="70" height="180" fill="none" stroke="#2f855a" strokeWidth="1.5" />

                    {/* Dynamic Formation Vectors & Players */}
                    {formation === "4-3-3" && (
                      <g className="formation-nodes">
                        {/* GK */}
                        <circle cx="35" cy="170" r="7" fill="#ecc94b" />
                        {/* Back 4 */}
                        <circle cx="110" cy="50" r="7" fill="#4299e1" />
                        <circle cx="95" cy="120" r="7" fill="#4299e1" />
                        <circle cx="95" cy="220" r="7" fill="#4299e1" />
                        <circle cx="110" cy="290" r="7" fill="#4299e1" />
                        {/* Mid 3 */}
                        <circle cx="180" cy="170" r="8" fill="#48bb78" />
                        <circle cx="230" cy="100" r="8" fill="#48bb78" />
                        <circle cx="230" cy="240" r="8" fill="#48bb78" />
                        {/* Front 3 */}
                        <circle cx="370" cy="65" r="8" fill="#f56565" />
                        <circle cx="390" cy="170" r="9" fill="#f56565" />
                        <circle cx="370" cy="275" r="8" fill="#f56565" />

                        {/* Passing Vectors */}
                        <path d="M180 170 L230 100 L370 65" stroke="#ecc94b" strokeWidth="2" strokeDasharray="5 3" fill="none" />
                        <path d="M180 170 L390 170" stroke="#48bb78" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                        <path d="M230 240 L370 275" stroke="#48bb78" strokeWidth="1.5" fill="none" />
                      </g>
                    )}

                    {formation === "3-5-2" && (
                      <g className="formation-nodes">
                        <circle cx="35" cy="170" r="7" fill="#ecc94b" />
                        {/* Back 3 */}
                        <circle cx="95" cy="90" r="7" fill="#4299e1" />
                        <circle cx="90" cy="170" r="7" fill="#4299e1" />
                        <circle cx="95" cy="250" r="7" fill="#4299e1" />
                        {/* Mid 5 */}
                        <circle cx="210" cy="35" r="8" fill="#48bb78" />
                        <circle cx="190" cy="120" r="8" fill="#48bb78" />
                        <circle cx="180" cy="170" r="8" fill="#48bb78" />
                        <circle cx="190" cy="220" r="8" fill="#48bb78" />
                        <circle cx="210" cy="305" r="8" fill="#48bb78" />
                        {/* Front 2 */}
                        <circle cx="380" cy="130" r="9" fill="#f56565" />
                        <circle cx="380" cy="210" r="9" fill="#f56565" />

                        <path d="M210 35 L380 130" stroke="#ecc94b" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                        <path d="M210 305 L380 210" stroke="#ecc94b" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                      </g>
                    )}

                    {formation === "4-2-3-1" && (
                      <g className="formation-nodes">
                        <circle cx="35" cy="170" r="7" fill="#ecc94b" />
                        <circle cx="105" cy="50" r="7" fill="#4299e1" />
                        <circle cx="95" cy="125" r="7" fill="#4299e1" />
                        <circle cx="95" cy="215" r="7" fill="#4299e1" />
                        <circle cx="105" cy="290" r="7" fill="#4299e1" />
                        {/* Double Pivot */}
                        <circle cx="170" cy="130" r="8" fill="#48bb78" />
                        <circle cx="170" cy="210" r="8" fill="#48bb78" />
                        {/* Attacking 3 */}
                        <circle cx="270" cy="65" r="8" fill="#48bb78" />
                        <circle cx="280" cy="170" r="8" fill="#ecc94b" />
                        <circle cx="270" cy="275" r="8" fill="#48bb78" />
                        {/* Striker */}
                        <circle cx="400" cy="170" r="9" fill="#f56565" />

                        <path d="M170 170 L280 170 L400 170" stroke="#ecc94b" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                      </g>
                    )}

                    {/* Attacking Arrow */}
                    <path d="M 430 170 L 465 170 M 455 160 L 465 170 L 455 180" stroke="#f56565" strokeWidth="3" fill="none" />
                  </svg>

                  <div className="card-footer">
                    <span>Attack Direction: <strong>Left to Right ➔</strong></span>
                    <span>Tactic: <strong>Invert & Overload</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DANCE & CHOREOGRAPHY ================= */}
        {activeTab === "dance" && (
          <div className="console-panel dance-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill dance-pill">
                  <Award size={14} /> WOD INDIA 2019 FINALIST
                </div>
                <h3>Urban Dance, Kinetic Synchrony & Leadership</h3>
                <p>
                  Dance is structural mechanics expressed through the human body. As the Head and
                  Choreographer of <strong>&quot;Abrupt Family&quot;</strong>, leading a 25+ member crew all the way
                  to the <strong>World of Dance (WOD) India Finals 2019</strong>, choreography taught me
                  leadership at scale: aligning individual talents into seamless, synchronized momentum.
                </p>

                <div className="dance-achievements">
                  <div className="achieve-card">
                    <span className="achieve-num">25+</span>
                    <span className="achieve-label">Dancers Synchronized</span>
                  </div>
                  <div className="achieve-card">
                    <span className="achieve-num">WOD 2019</span>
                    <span className="achieve-label">National Stage Finalist</span>
                  </div>
                  <div className="achieve-card">
                    <span className="achieve-num">CREW LEAD</span>
                    <span className="achieve-label">Choreography & Vision</span>
                  </div>
                </div>

                <div className="spec-table mt-6">
                  <div className="spec-row">
                    <span className="spec-k">DANCE DISCIPLINES</span>
                    <span className="spec-v">Urban Choreography, Popping, Isolations, House Footwork</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">LEADERSHIP ROLE</span>
                    <span className="spec-v">Head Choreographer & Artistic Director of &quot;Abrupt Family&quot;</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">AERO SYNERGY</span>
                    <span className="spec-v">Kinematic fluidity, stage pressure gradients, harmonic cohesion</span>
                  </div>
                </div>
              </div>

              {/* Interactive Beat & Rhythm Studio */}
              <div className="panel-interactive">
                <div className="interactive-card dance-card">
                  <div className="card-header">
                    <span className="mono-label">KINETIC_RHYTHM_STUDIO // ABRUPT_FAMILY</span>
                    <button
                      className="beat-toggle-btn"
                      onClick={() => setIsPlayingBeat(!isPlayingBeat)}
                    >
                      {isPlayingBeat ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      <span>{isPlayingBeat ? "BEAT ACTIVE" : "MUTED"}</span>
                    </button>
                  </div>

                  <div className="rhythm-visualizer">
                    <div className="tempo-display">
                      <span className="tempo-val">{tempo}</span>
                      <span className="tempo-unit">BPM // GROOVE</span>
                    </div>

                    {/* Animated Equalizer Waveform */}
                    <div className="equalizer-bars">
                      {[65, 95, 40, 80, 100, 55, 85, 30, 90, 70, 45, 95, 60, 80, 100, 75].map(
                        (h, i) => (
                          <div
                            key={i}
                            className={`eq-bar ${isPlayingBeat ? "animating" : ""}`}
                            style={{
                              height: isPlayingBeat ? `${h}%` : "15%",
                              animationDelay: `${(i * 0.08) % 1}s`,
                            }}
                          />
                        )
                      )}
                    </div>

                    <div className="tempo-controls">
                      <button
                        className={tempo === 100 ? "active" : ""}
                        onClick={() => setTempo(100)}
                      >
                        100 BPM Funk
                      </button>
                      <button
                        className={tempo === 128 ? "active" : ""}
                        onClick={() => setTempo(128)}
                      >
                        128 BPM Kinetic
                      </button>
                      <button
                        className={tempo === 145 ? "active" : ""}
                        onClick={() => setTempo(145)}
                      >
                        145 BPM Footwork
                      </button>
                    </div>

                    <div className="quote-badge">
                      &quot;Every beat is a structural boundary condition; the motion is how we resolve it.&quot;
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>Crew: <strong>Abrupt Family</strong></span>
                    <span>Arena: <strong>World of Dance India</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FORMULA 1 ================= */}
        {activeTab === "f1" && (
          <div className="console-panel f1-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill f1-pill">
                  <Flag size={14} /> MOTORSPORT AERO DYNAMICS
                </div>
                <h3>Downforce, Ground Effect & Apex Telemetry</h3>
                <p>
                  As an aerodynamicist and avid Formula 1 follower, modern motorsport is an incredible
                  laboratory of fluid dynamics: 3D underfloor Venturi tunnels, complex front wing vortex
                  shedding, ground-effect porpoising limits, and high-speed cornering balance.
                </p>

                <div className="telemetry-sliders">
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Corner Entry Speed</span>
                      <strong>{cornerSpeed} km/h</strong>
                    </div>
                    <input
                      type="range"
                      min="160"
                      max="315"
                      value={cornerSpeed}
                      onChange={(e) => setCornerSpeed(Number(e.target.value))}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Aero Downforce Balance (% Front)</span>
                      <strong>{aeroBalance.toFixed(1)}% Front</strong>
                    </div>
                    <input
                      type="range"
                      min="42"
                      max="55"
                      step="0.5"
                      value={aeroBalance}
                      onChange={(e) => setAeroBalance(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="spec-table mt-4">
                  <div className="spec-row">
                    <span className="spec-k">AERODYNAMIC REGIME</span>
                    <span className="spec-v">Ground-effect Venturi tunnel suction & beam wing expansion</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">ESTIMATED DOWNFORCE</span>
                    <span className="spec-v">
                      {Math.round((cornerSpeed / 100) ** 2 * 280)} kgf @ {cornerSpeed} km/h
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">LATERAL ACCELERATION</span>
                    <span className="spec-v">
                      {(1.2 + (cornerSpeed / 300) * 3.8).toFixed(2)} G peak cornering
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Telemetry Deck */}
              <div className="panel-interactive">
                <div className="interactive-card f1-card">
                  <div className="card-header">
                    <span className="mono-label">TELEMETRY_STREAM // HIGH_SPEED_APEX</span>
                    <span className="status-indicator">SILVERSTONE COPSE</span>
                  </div>

                  <div className="telemetry-display">
                    {/* Simulated Telemetry Traces */}
                    <svg viewBox="0 0 450 200" className="telemetry-svg">
                      <defs>
                        <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e53e3e" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#e53e3e" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="20" y1="30" x2="430" y2="30" stroke="#333" strokeDasharray="3 3" />
                      <line x1="20" y1="80" x2="430" y2="80" stroke="#333" strokeDasharray="3 3" />
                      <line x1="20" y1="130" x2="430" y2="130" stroke="#333" strokeDasharray="3 3" />

                      {/* Speed curve */}
                      <path
                        d={`M 20 50 Q 150 40 220 ${160 - (cornerSpeed / 320) * 80} T 430 45`}
                        fill="none"
                        stroke="#e53e3e"
                        strokeWidth="3"
                      />
                      {/* Downforce curve */}
                      <path
                        d={`M 20 140 Q 150 150 220 ${60 + (320 - cornerSpeed) * 0.3} T 430 145`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Annotations */}
                      <text x="25" y="45" fill="#e53e3e" fontSize="10" fontFamily="monospace">
                        SPEED: {cornerSpeed} KM/H
                      </text>
                      <text x="25" y="155" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                        DOWNFORCE: {Math.round((cornerSpeed / 100) ** 2 * 280)} KGF
                      </text>
                    </svg>

                    <div className="telemetry-readouts">
                      <div className="readout-box">
                        <span className="ro-lbl">THROTTLE</span>
                        <span className="ro-val text-green-400">92%</span>
                      </div>
                      <div className="readout-box">
                        <span className="ro-lbl">BRAKE</span>
                        <span className="ro-val text-neutral-400">0%</span>
                      </div>
                      <div className="readout-box">
                        <span className="ro-lbl">LATERAL G</span>
                        <span className="ro-val text-red-400">
                          {(1.2 + (cornerSpeed / 300) * 3.8).toFixed(1)} G
                        </span>
                      </div>
                      <div className="readout-box">
                        <span className="ro-lbl">AERO BIAS</span>
                        <span className="ro-val text-cyan-400">{aeroBalance.toFixed(1)}% F</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>Track Simulation: <strong>Silverstone Sector 1</strong></span>
                    <span>Handling: <strong>Neutral Balance</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: GLOBAL EXPEDITIONS ================= */}
        {activeTab === "travel" && (
          <div className="console-panel travel-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill travel-pill">
                  <Globe2 size={14} /> CROSS-CULTURAL HORIZONS
                </div>
                <h3>International Expeditions & Academic Mobility</h3>
                <p>
                  Engineering is a global human dialogue. Living and working across <strong>India, Germany, and France</strong>, with travels across the <strong>UK and Italy</strong>, has given me adaptability, fluency in international technical teams, and a profound appreciation for diverse creative cultures.
                </p>

                <div className="city-selector">
                  {["Kerala", "Munich", "Toulouse", "London", "Milan"].map((city) => (
                    <button
                      key={city}
                      className={activeCity === city ? "active" : ""}
                      onClick={() => setActiveCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                <div className="city-story-card">
                  {activeCity === "Kerala" && (
                    <div>
                      <h4>🇮🇳 Kerala & Mumbai, India — Roots & Mechanical Foundations</h4>
                      <p>
                        Where the engineering obsession began. Completed B.Tech (Honours) in Mechanical
                        Engineering at APJ Abdul Kalam Technological University with a <strong>9.28 CGPA</strong>.
                        Conducted aircraft design and flight tests at Feynman Aerospace and led 25+ dancers in WOD India.
                      </p>
                    </div>
                  )}
                  {activeCity === "Munich" && (
                    <div>
                      <h4>🇩🇪 Munich & Bavaria, Germany — Precision & eVTOL Hardware</h4>
                      <p>
                        Completed 57 ECTS of graduate aerospace coursework at <strong>TUM (Technical University of Munich)</strong>.
                        Engineered physical test fixtures with ASME Y14.5 GD&T and nonlinear FEA at <strong>Lilium eAircraft</strong>,
                        and evaluated carbon-composite cryo-tanks with WARR Rocketry.
                      </p>
                    </div>
                  )}
                  {activeCity === "Toulouse" && (
                    <div>
                      <h4>🇫🇷 Toulouse, France — Europe&apos;s Aerospace Capital</h4>
                      <p>
                        Currently completing Master in Aerospace Engineering at <strong>ISAE-SUPAERO</strong>,
                        specializing in Advanced Aerodynamics & Propulsion. Conducting thesis research at DAEP
                        on requirement-driven turbomachinery and body-force model preprocessing (TRACE FanGEO).
                      </p>
                    </div>
                  )}
                  {activeCity === "London" && (
                    <div>
                      <h4>🇬🇧 London & UK — Heritage of Speed & Flight</h4>
                      <p>
                        Exploring motorsport heritage, aerospace legacy, and international collaboration.
                        Visiting iconic circuits and connecting with European engineering networks.
                      </p>
                    </div>
                  )}
                  {activeCity === "Milan" && (
                    <div>
                      <h4>🇮🇹 Milan & Monza, Italy — Design Artistry & Speed</h4>
                      <p>
                        Experiencing Italian industrial design, motorsport culture at the Temple of Speed
                        (Autodromo Nazionale Monza), and European architectural elegance.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Expedition Interactive Nodes */}
              <div className="panel-interactive">
                <div className="interactive-card travel-card">
                  <div className="card-header">
                    <span className="mono-label">EXPEDITION_MAP // CONTINENTAL_TRANSIT</span>
                    <span className="status-indicator">GLOBAL CITIZEN</span>
                  </div>

                  <div className="journey-nodes">
                    <div className="journey-track">
                      <div className="track-step">
                        <span className="step-flag">🇮🇳</span>
                        <span className="step-name">India</span>
                        <small>B.Tech Honours · CGPA 9.28</small>
                      </div>
                      <ChevronRight className="track-arrow" size={20} />
                      <div className="track-step">
                        <span className="step-flag">🇩🇪</span>
                        <span className="step-name">Germany</span>
                        <small>TUM (57 ECTS) · Lilium</small>
                      </div>
                      <ChevronRight className="track-arrow" size={20} />
                      <div className="track-step current">
                        <span className="step-flag">🇫🇷</span>
                        <span className="step-name">France</span>
                        <small>ISAE-SUPAERO M2 · DAEP</small>
                      </div>
                    </div>

                    <div className="language-badge-grid">
                      <div className="lang-box">
                        <span className="lang-name">English</span>
                        <span className="lang-lvl">C1 Fluent</span>
                      </div>
                      <div className="lang-box">
                        <span className="lang-name">German</span>
                        <span className="lang-lvl">A1 Basic</span>
                      </div>
                      <div className="lang-box">
                        <span className="lang-name">French</span>
                        <span className="lang-lvl">A1 Improving</span>
                      </div>
                      <div className="lang-box">
                        <span className="lang-name">Malayalam</span>
                        <span className="lang-lvl">Native</span>
                      </div>
                      <div className="lang-box">
                        <span className="lang-name">Hindi</span>
                        <span className="lang-lvl">Fluent</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>Relocation: <strong>Open Globally (EU, UK, International)</strong></span>
                    <span>Passports: <strong>Valid International Travel</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: BADMINTON ================= */}
        {activeTab === "badminton" && (
          <div className="console-panel badm-panel">
            <div className="panel-grid">
              <div className="panel-info">
                <div className="badge-pill badm-pill">
                  <Activity size={14} /> EXPLOSIVE KINETICS
                </div>
                <h3>Reaction Speed, Court Physics & 300 km/h Dynamics</h3>
                <p>
                  Badminton is one of the fastest racket sports on the planet. A high-speed smash leaves the
                  racket at over 300 km/h, decelerating rapidly due to high aerodynamic drag on the conical
                  feather skirt. Playing badminton keeps my split-second reactions, footwork agility, and
                  explosive deceleration sharp.
                </p>

                <div className="spec-table">
                  <div className="spec-row">
                    <span className="spec-k">SMASH VELOCITY</span>
                    <span className="spec-v">300+ km/h initial release velocity</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">DECELERATION REGIME</span>
                    <span className="spec-v">Extreme bluff-body drag on feather skirt geometry</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">PHYSICAL BENEFIT</span>
                    <span className="spec-v">Explosive agility, split-second court positioning & timing</span>
                  </div>
                </div>
              </div>

              <div className="panel-interactive">
                <div className="interactive-card badm-card">
                  <div className="card-header">
                    <span className="mono-label">AERODYNAMICS_OF_THE_SHUTTLECOCK</span>
                    <span className="status-indicator">FLUID RESISTANCE</span>
                  </div>
                  <div className="shuttlecock-sketch">
                    <svg viewBox="0 0 400 220" className="shuttle-svg">
                      {/* Cork Nose */}
                      <path d="M 90 110 C 90 90 110 80 130 80 L 130 140 C 110 140 90 130 90 110 Z" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" />
                      {/* Feathers Skirt */}
                      <path d="M 130 80 L 290 40 L 290 180 L 130 140 Z" fill="rgba(255,255,255,0.06)" stroke="#cbd5e0" strokeWidth="1.5" />
                      {/* Feather ribs */}
                      {[60, 80, 100, 120, 140, 160].map((y, i) => (
                        <line key={i} x1="130" y1="110" x2="290" y2={y} stroke="#a0aec0" strokeWidth="1" strokeDasharray="3 3" />
                      ))}
                      {/* Drag Wake Eddies */}
                      <path d="M 290 60 Q 340 70 330 90 Q 320 110 350 120" stroke="#f6ad55" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                      <path d="M 290 160 Q 340 150 330 130 Q 320 110 350 100" stroke="#f6ad55" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                      <text x="100" y="200" fill="#f6ad55" fontSize="11" fontFamily="monospace">
                        HIGH DRAG COEFFICIENT: C_D ≈ 0.6 – 0.8
                      </text>
                    </svg>
                  </div>
                  <div className="card-footer">
                    <span>Physics: <strong>High bluff drag enables rapid deceleration</strong></span>
                    <span>Discipline: <strong>Kinetic Agility</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The Fusion Manifesto */}
      <div className="fusion-manifesto">
        <div className="fusion-header">
          <p className="eyebrow">THE MULTIDISCIPLINARY EDGE</p>
          <h3>Why Diverse Arenas Create a Superior Engineer</h3>
        </div>
        <div className="fusion-grid">
          <div className="fusion-col">
            <div className="fusion-icon-box val-box">
              <Crosshair size={22} />
            </div>
            <h4>Competitive Reflex & Calm</h4>
            <p>
              In high-stakes FPS rounds, panic induces fatal errors. Composure under stress, fast
              decision trees, and mental resilience translate directly to experimental flight-test
              debugging and computational problem-solving.
            </p>
          </div>

          <div className="fusion-col">
            <div className="fusion-icon-box dance-box">
              <AudioLines size={22} />
            </div>
            <h4>Kinetic Synchronization</h4>
            <p>
              Leading 25+ dancers taught me that complex systems must move in harmony. Every individual
              element has its boundary condition; success is achieved through structural rhythm,
              clear communication, and shared ownership.
            </p>
          </div>

          <div className="fusion-col">
            <div className="fusion-icon-box aero-box">
              <Shield size={22} />
            </div>
            <h4>Aerospace Mathematical Rigor</h4>
            <p>
              Underneath the energy lies hard physical discipline: solving Navier-Stokes equations,
              refining boundary-layer meshes with $y^+ &lt; 1$, and designing ASME Y14.5 GD&T
              composite hardware that meets certified aerospace safety margins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
