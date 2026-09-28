"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wind,
  Layers,
  Cpu,
  Compass,
  FileText,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  Terminal,
  Activity,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export function AerospaceCockpit() {
  const [activeTab, setActiveTab] = useState<
    "wind-tunnel" | "apexsim" | "trace-fangeo" | "vorom-x" | "hardware"
  >("wind-tunnel");

  // Tool 1: Wind Tunnel / Airfoil State
  const [aoa, setAoa] = useState<number>(4.0);
  const [viewCp, setViewCp] = useState<boolean>(false);

  // Tool 2: ApexSim State
  const [frontRideHeight, setFrontRideHeight] = useState<number>(25);
  const [rearRideHeight, setRearRideHeight] = useState<number>(50);
  const [remediationActive, setRemediationActive] = useState<boolean>(true);

  // Tool 3: TRACE FanGEO Active Layer
  const [selectedLayer, setSelectedLayer] = useState<number>(3); // L3 Radial Equilibrium

  // Tool 4: VOROM-X Wing State
  const [sweep, setSweep] = useState<number>(25);
  const [washout, setWashout] = useState<number>(-3.0);
  const [aspectRatio, setAspectRatio] = useState<number>(8.5);

  // Airfoil aerodynamic calculations based on HLHLSD4 data
  // Lift slope: ~ 0.105 per degree. Stall around 13-14 deg.
  const isStalled = aoa > 13.5;
  const cl =
    aoa <= 13.5
      ? Math.max(-0.2, 0.25 + 0.105 * aoa)
      : Math.max(0.6, 0.25 + 0.105 * 13.5 - 0.08 * (aoa - 13.5));
  const cd =
    0.012 +
    0.045 * Math.pow(Math.max(0, cl), 2) +
    (isStalled ? 0.025 * Math.pow(aoa - 13.5, 1.6) : 0);
  const lod = cd > 0 ? (cl / cd).toFixed(1) : "0.0";

  // ApexSim calculations (Downforce, Drag, Aero Balance)
  const pitch = (rearRideHeight - frontRideHeight) / 100; // rake angle proxy
  const groundClA =
    -(2.4 + 0.03 * (35 - frontRideHeight) + 0.02 * (rearRideHeight - 40));
  const groundCdA = 0.95 + 0.012 * pitch * 10;
  const aeroBalanceFront = Math.min(
    55,
    Math.max(38, 44.5 + (35 - frontRideHeight) * 0.45 - (rearRideHeight - 40) * 0.2)
  );

  // 14 Layers of TRACE FanGEO
  const layers = [
    {
      id: "L0",
      title: "Design Specifications & Duty",
      cat: "Requirements",
      desc: "Mass flow rate, pressure ratio (FPR), tip speed, and intake boundary profiles defined.",
      eq: "FPR = (P_{02} / P_{01})_{target}",
      gate: "Thermodynamic cycle feasibility verified against mass continuity.",
    },
    {
      id: "L1",
      title: "1D Meridional Sizing & Velocity Triangles",
      cat: "Throughflow",
      desc: "Hub-to-tip radius ratio, axial velocity profiles, and rotor inlet/exit blade speed sizing.",
      eq: "U = \\omega \\cdot r, \\quad C_m = \\dot{m} / (\\rho A)",
      gate: "Inlet tip relative Mach number check (transonic shock threshold).",
    },
    {
      id: "L2",
      title: "Spanwise Work Distribution",
      cat: "Throughflow",
      desc: "Radial enthalpy distribution \\Delta h_0(r) prescribed to control spanwise stage loading.",
      eq: "\\Delta h_0(r) = U(r) \\cdot [C_{\\theta 2}(r) - C_{\\theta 1}(r)]",
      gate: "Euler work balance verified across 41 radial streamlines.",
    },
    {
      id: "L3",
      title: "Radial Equilibrium Equation (RE3/RE4)",
      cat: "Throughflow",
      desc: "Semi-analytical integration of radial momentum equation to balance centrifugal and pressure forces.",
      eq: "\\frac{1}{\\rho} \\frac{\\partial P}{\\partial r} = \\frac{C_\\theta^2}{r} + C_m \\frac{\\partial C_r}{\\partial z}",
      gate: "Static pressure curvature consistency across spanwise stations.",
    },
    {
      id: "L4",
      title: "Velocity Triangle Closure",
      cat: "Throughflow",
      desc: "Extraction of relative flow angles \\beta_1(r), \\beta_2(r) and absolute vectors.",
      eq: "\\tan \\beta = \\frac{W_\\theta}{C_m} = \\frac{C_\\theta - U}{C_m}",
      gate: "Diffusion factor (Lieblein DF < 0.45) checked to prevent premature separation.",
    },
    {
      id: "L5",
      title: "Empirical Deviation & Incidence Modeling",
      cat: "Aero Rules",
      desc: "Carter's rule and empirical loss correlation applied to translate flow angles to metal angles.",
      eq: "\\delta = m \\cdot \\theta \\cdot \\sqrt{s/c}, \\quad \\kappa_1 = \\beta_1 + i",
      gate: "Metal camber \\theta and stagger angle \\gamma established per streamline.",
    },
    {
      id: "L6",
      title: "Meanline Camber B-Spline Generation",
      cat: "Geometry",
      desc: "Parametric cubic B-spline curvature curves generated across 41 distinct spanwise sections.",
      eq: "C(u) = \\sum_{i=0}^n N_{i,p}(u) P_i",
      gate: "Monotonic second-derivative curvature check (zero inflection points).",
    },
    {
      id: "L7",
      title: "Thickness Profile & LE/TE Blending",
      cat: "Geometry",
      desc: "Superposition of customized NACA 65-series or controlled-diffusion thickness profiles.",
      eq: "y_{profile}(x) = y_{camber}(x) \\pm \\frac{t(x)}{2} \\vec{n}",
      gate: "Continuous curvature blending at elliptical leading edge (LE).",
    },
    {
      id: "L8",
      title: "3D Blade Stagger & Lean/Sweep Transformation",
      cat: "Geometry",
      desc: "3D stacking axis transformation: forward acoustic sweep and compound circumferential lean.",
      eq: "(x, y, z) = \\mathbf{R}_{stagger} (x', y', z') + (x_{lean}, y_{sweep}, z)",
      gate: "Tip clearance and casing interface clearance verified.",
    },
    {
      id: "L9",
      title: "Hub & Shroud Axisymmetric Contouring",
      cat: "Geometry",
      desc: "Meridional endwall contouring parameterized with cubic splines for secondary flow reduction.",
      eq: "r_{hub}(z), \\quad r_{shroud}(z)",
      gate: "Tangency continuity with upstream intake and downstream bypass duct.",
    },
    {
      id: "L10",
      title: "Multi-Section 3D Lofting",
      cat: "Geometry",
      desc: "Lofting of 41 individual airfoils into a watertight 3D B-rep CAD surface.",
      eq: "S(u, v) = \\text{B-Spline Lofting across 41 sections}",
      gate: "Self-intersection and chord/stagger interface consistency audit.",
    },
    {
      id: "L11",
      title: "Surface Normal & Curvature Verification",
      cat: "Verification",
      desc: "Rigorous analytical calculation of surface normal vectors \\vec{n} and Gaussian curvature.",
      eq: "\\vec{n} = \\frac{\\partial S / \\partial u \\times \\partial S / \\partial v}{|\\partial S / \\partial u \\times \\partial S / \\partial v|}",
      gate: "Passes normal continuity and maximum twist gradient checks.",
    },
    {
      id: "L12",
      title: "Metal Blockage ($B_m$) & BFM Source Terms",
      cat: "BFM Extraction",
      desc: "Volumetric extraction of blade metal blockage and normal body-force source terms for throughflow CFD.",
      eq: "B_m(r, z) = 1 - \\frac{N \\cdot t_\\theta(r, z)}{2\\pi r}",
      gate: "Dual-branch verification (Analytic ParaBlade vs VTK mesh integration).",
    },
    {
      id: "L13",
      title: "Solver-Agnostic Output & Packaging",
      cat: "Packaging",
      desc: "Structured packaging into standardized HDF5/CGNS format for downstream CFD coupling.",
      eq: "\\text{Export: } (f_r, f_\\theta, f_z, B_m, \\vec{n})",
      gate: "Schema validation against DAEP throughflow solver requirements.",
    },
  ];

  return (
    <section className="aerospace-cockpit-section shell">
      {/* Cockpit HUD Banner */}
      <div className="cockpit-hud-banner">
        <div className="hud-line">
          <span className="hud-tag">
            <span className="hud-beacon" /> FLIGHT_PHYSICS_COCKPIT // PROTOCOL 02
          </span>
          <span className="hud-telemetry">
            AERODYNAMICS · PROPULSION · SCIENTIFIC COMPUTING
          </span>
        </div>
        <h2 className="cockpit-title">
          AEROSPACE RESEARCH.
          <br />
          <em>FLIGHT PHYSICS RIGOR.</em>
        </h2>
        <p className="cockpit-desc">
          Interactive computational wind tunnel, high-throughput surrogate aero-mapping,
          and requirement-driven turbomachinery architecture. Grounded strictly in the
          laws of fluid mechanics, structural continuum, and verified numerical gates.
        </p>
      </div>

      {/* Cockpit Top Navigation */}
      <div className="cockpit-nav" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "wind-tunnel"}
          onClick={() => setActiveTab("wind-tunnel")}
          className={`c-tab ${activeTab === "wind-tunnel" ? "active" : ""}`}
        >
          <Wind size={18} />
          <span>Wind Tunnel Lab</span>
          <small>HLHLSD4 AIRFOIL CFD</small>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "apexsim"}
          onClick={() => setActiveTab("apexsim")}
          className={`c-tab ${activeTab === "apexsim" ? "active" : ""}`}
        >
          <Compass size={18} />
          <span>ApexSim Aero Map</span>
          <small>MOVING-GROUND SST-RANS</small>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "trace-fangeo"}
          onClick={() => setActiveTab("trace-fangeo")}
          className={`c-tab ${activeTab === "trace-fangeo" ? "active" : ""}`}
        >
          <Layers size={18} />
          <span>TRACE FanGEO 14-Layer</span>
          <small>TURBOMACHINERY THESIS</small>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "vorom-x"}
          onClick={() => setActiveTab("vorom-x")}
          className={`c-tab ${activeTab === "vorom-x" ? "active" : ""}`}
        >
          <Cpu size={18} />
          <span>VOROM-X VLM Solver</span>
          <small>3D TREFFTZ WING STUDY</small>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "hardware"}
          onClick={() => setActiveTab("hardware")}
          className={`c-tab ${activeTab === "hardware" ? "active" : ""}`}
        >
          <ShieldCheck size={18} />
          <span>Lilium Test Hardware</span>
          <small>ASME Y14.5 GD&T & FEA</small>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="cockpit-stage">
        {/* ================= 1. WIND TUNNEL AIRFOIL LAB ================= */}
        {activeTab === "wind-tunnel" && (
          <div className="stage-panel wind-tunnel-stage">
            <div className="stage-grid">
              <div className="stage-controls">
                <div className="hud-badge">
                  <Activity size={14} /> HLHLSD4 HIGH-LIFT SECTION // Re = 1,000,000
                </div>
                <h3>Transition-SST RANS & XFOIL Flow Lab</h3>
                <p>
                  Explore the flow physics over the HLHLSD4 high-lift airfoil studied at ISAE-SUPAERO.
                  Adjust the angle of attack $\alpha$ to examine boundary layer development, suction peaks,
                  and stall separation mechanics.
                </p>

                <div className="aoa-slider-box">
                  <div className="slider-header">
                    <span>Angle of Attack ($\alpha$)</span>
                    <strong>{aoa.toFixed(1)}°</strong>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="20"
                    step="0.5"
                    value={aoa}
                    onChange={(e) => setAoa(Number(e.target.value))}
                  />
                  <div className="slider-ticks">
                    <span>-5°</span>
                    <span>0°</span>
                    <span>5°</span>
                    <span>10°</span>
                    <span>15° (Stall)</span>
                    <span>20°</span>
                  </div>
                </div>

                <div className="toggle-view-box">
                  <button
                    className={`btn-view ${!viewCp ? "active" : ""}`}
                    onClick={() => setViewCp(false)}
                  >
                    Flow Streamlines
                  </button>
                  <button
                    className={`btn-view ${viewCp ? "active" : ""}`}
                    onClick={() => setViewCp(true)}
                  >
                    Surface $C_p$ Distribution
                  </button>
                </div>

                <div className="aero-telemetry-grid">
                  <div className="aero-tele-card">
                    <span className="tele-lbl">LIFT COEFF ($C_L$)</span>
                    <span className="tele-val text-cyan-400">{cl.toFixed(3)}</span>
                    <small>{isStalled ? "⚠ Separation loss" : "Linear attached"}</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">DRAG COEFF ($C_D$)</span>
                    <span className="tele-val text-amber-400">{cd.toFixed(4)}</span>
                    <small>{isStalled ? "Pressure stall drag" : "Skin friction + induced"}</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">EFFICIENCY ($L/D$)</span>
                    <span className="tele-val text-green-400">{lod}</span>
                    <small>Aerodynamic glide ratio</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">FLOW REGIME</span>
                    <span className="tele-val text-purple-300">
                      {isStalled ? "UNSTEADY STALL" : "ATTACHED FLOW"}
                    </span>
                    <small>y⁺ &lt; 1 structured mesh</small>
                  </div>
                </div>
              </div>

              {/* Interactive Visual Canvas */}
              <div className="stage-canvas">
                <div className="canvas-header">
                  <span className="mono-sub">NUMERICAL_WIND_TUNNEL // V_inf = 50 m/s</span>
                  <span className={`status-pill ${isStalled ? "stalled" : "healthy"}`}>
                    {isStalled ? "SEPARATED WAKE" : "ATTACHED BOUNDARY LAYER"}
                  </span>
                </div>

                <div className="canvas-body">
                  {!viewCp ? (
                    <svg viewBox="0 0 550 320" className="airfoil-svg" aria-label="Airfoil flow streamlines">
                      <defs>
                        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>

                      {/* Background Flow Grid */}
                      {Array.from({ length: 9 }, (_, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={35 + i * 32}
                          x2="550"
                          y2={35 + i * 32}
                          stroke="#ffffff08"
                          strokeDasharray="4 6"
                        />
                      ))}

                      {/* Streamlines flowing around airfoil */}
                      {Array.from({ length: 8 }, (_, i) => {
                        const yBase = 50 + i * 30;
                        const deflect = aoa * 3.2;
                        return (
                          <g key={i}>
                            {!isStalled || i > 3 ? (
                              <path
                                d={`M 10 ${yBase} Q 200 ${yBase - deflect * (1 - i / 10)} 300 ${
                                  yBase + deflect * (i / 12)
                                } T 540 ${yBase + deflect * 0.4}`}
                                fill="none"
                                stroke="url(#streamGrad)"
                                strokeWidth="1.8"
                                className="streamline-anim"
                              />
                            ) : (
                              // Detached, turbulent recirculating wake above stall
                              <path
                                d={`M 10 ${yBase} Q 200 ${yBase - 15} 320 ${yBase + 25} Q 380 ${
                                  yBase - 20 + i * 15
                                } 440 ${yBase + 40} T 540 ${yBase + 50}`}
                                fill="none"
                                stroke="#f87171"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                className="streamline-stall"
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* Airfoil geometry rotated at Angle of Attack */}
                      <g transform={`translate(260, 160) rotate(${-aoa}) translate(-140, -25)`}>
                        {/* High-Lift Airfoil Path */}
                        <path
                          d="M 20 25 C 40 5, 120 -5, 270 23 C 180 27, 90 35, 20 25 Z"
                          fill="#1e293b"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        {/* Chord Line */}
                        <line x1="20" y1="25" x2="270" y2="23" stroke="#64748b" strokeDasharray="3 3" strokeWidth="1" />
                        {/* Leading edge stagnation point */}
                        <circle cx="20" cy="25" r="4" fill="#38bdf8" />
                      </g>

                      {/* Stagnation & Separation Annotations */}
                      {isStalled && (
                        <g>
                          <text x="320" y="80" fill="#f87171" fontSize="11" fontFamily="monospace" fontWeight="bold">
                            FLOW SEPARATION BUBBLE
                          </text>
                          <path d="M 330 90 L 300 130" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        </g>
                      )}
                    </svg>
                  ) : (
                    // Surface Cp distribution plot
                    <svg viewBox="0 0 550 320" className="cp-svg" aria-label="Surface pressure coefficient distribution">
                      <rect x="50" y="20" width="460" height="260" fill="#0b0f17" stroke="#334155" />
                      <line x1="50" y1="150" x2="510" y2="150" stroke="#475569" strokeDasharray="3 3" />
                      <text x="60" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        -Cp (Suction Peak)
                      </text>
                      <text x="60" y="270" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        +Cp (Pressure)
                      </text>
                      <text x="470" y="145" fill="#64748b" fontSize="10" fontFamily="monospace">
                        Cp = 0
                      </text>

                      {/* Upper Surface Cp Curve */}
                      <path
                        d={`M 70 150 Q 120 ${150 - Math.min(125, aoa * 8.5 + 40)} 260 ${
                          150 - Math.min(40, aoa * 2.5)
                        } T 490 150`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                      />
                      {/* Lower Surface Cp Curve */}
                      <path
                        d={`M 70 150 Q 150 ${150 + Math.max(10, aoa * 2.0)} 300 160 T 490 150`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />

                      <text x="140" y={Math.max(45, 130 - aoa * 8)} fill="#38bdf8" fontSize="11" fontFamily="monospace">
                        Upper Surface Suction Peak: Cp_min = {(-0.4 - aoa * 0.18).toFixed(2)}
                      </text>
                    </svg>
                  )}
                </div>

                <div className="canvas-footer">
                  <span>Re = 10⁶ · Incompressible SST-RANS</span>
                  <span>Grid Sensitivity: <strong>0.15% Lift / 2% Drag</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. APEXSIM AERO MAP ================= */}
        {activeTab === "apexsim" && (
          <div className="stage-panel apexsim-stage">
            <div className="stage-grid">
              <div className="stage-controls">
                <div className="hud-badge">
                  <Compass size={14} /> APEXSIM v0.9 // SURROGATE AERO-MAP EXPLORER
                </div>
                <h3>Automated CFD Pipeline & Domain Remediation</h3>
                <p>
                  ApexSim orchestrates automated RANS runs across full ride-height envelopes.
                  By detecting domain boundary layer truncation, an automated remediation gate
                  reduced boundary-layer numerical error from <strong>7.22% to 1.52%</strong>.
                </p>

                <div className="ride-height-sliders">
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Front Ride Height ($h_f$)</span>
                      <strong>{frontRideHeight} mm</strong>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="45"
                      value={frontRideHeight}
                      onChange={(e) => setFrontRideHeight(Number(e.target.value))}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Rear Ride Height ($h_r$)</span>
                      <strong>{rearRideHeight} mm</strong>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="80"
                      value={rearRideHeight}
                      onChange={(e) => setRearRideHeight(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="remediation-toggle-box">
                  <button
                    className={`remed-btn ${remediationActive ? "on" : "off"}`}
                    onClick={() => setRemediationActive(!remediationActive)}
                  >
                    <CheckCircle2 size={16} />
                    <span>Boundary Remediation Gate: {remediationActive ? "ENFORCED (1.52% Error)" : "DISABLED (7.22% Error)"}</span>
                  </button>
                  <small>Enforces moving ground & inlet turbulence boundary consistency.</small>
                </div>

                <div className="aero-telemetry-grid mt-4">
                  <div className="aero-tele-card">
                    <span className="tele-lbl">TOTAL DOWNFORCE (-C_L A)</span>
                    <span className="tele-val text-cyan-400">{Math.abs(groundClA).toFixed(3)} m²</span>
                    <small>High downforce suction</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">TOTAL DRAG (C_D A)</span>
                    <span className="tele-val text-amber-400">{groundCdA.toFixed(3)} m²</span>
                    <small>Rake angle influence</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">AERO BALANCE (% FRONT)</span>
                    <span className="tele-val text-green-400">{aeroBalanceFront.toFixed(1)}%</span>
                    <small>Target: 42% – 48%</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">SURROGATE MODEL</span>
                    <span className="tele-val text-purple-300">POLYNOMIAL RIDGE</span>
                    <small>RBF Cross-Validation</small>
                  </div>
                </div>
              </div>

              {/* ApexSim 2D Floor Ride Height & Ground Suction Visualizer */}
              <div className="stage-canvas">
                <div className="canvas-header">
                  <span className="mono-sub">GROUND_EFFECT_VENTURI_TUNNEL // RAKE ANGLE = {pitch.toFixed(2)}°</span>
                  <span className="status-pill healthy">SURROGATE INFERENCE</span>
                </div>

                <div className="canvas-body">
                  <svg viewBox="0 0 520 280" className="apexsim-svg">
                    {/* Ground Plane (Moving Ground) */}
                    <rect x="20" y="240" width="480" height="25" fill="#1e293b" />
                    <line x1="20" y1="240" x2="500" y2="240" stroke="#e2e8f0" strokeWidth="2" />
                    {Array.from({ length: 15 }, (_, i) => (
                      <line
                        key={i}
                        x1={30 + i * 32}
                        y1="240"
                        x2={20 + i * 32}
                        y2="255"
                        stroke="#64748b"
                        strokeWidth="1.5"
                      />
                    ))}
                    <text x="30" y="272" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      MOVING GROUND BOUNDARY (V_ground = V_inf)
                    </text>

                    {/* Underfloor Profile with Rake */}
                    <g transform="translate(60, 0)">
                      {/* Car Underfloor Contour */}
                      <path
                        d={`M 20 ${240 - frontRideHeight * 1.8} Q 180 ${
                          240 - frontRideHeight * 1.2
                        } 260 ${240 - (frontRideHeight + rearRideHeight) * 0.9} L 380 ${
                          240 - rearRideHeight * 1.8
                        } L 380 ${240 - rearRideHeight * 1.8 - 45} L 20 ${
                          240 - frontRideHeight * 1.8 - 35
                        } Z`}
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Venturi Suction Field Gradient */}
                      <path
                        d={`M 20 ${240 - frontRideHeight * 1.8} Q 180 ${
                          240 - frontRideHeight * 1.2
                        } 260 ${240 - (frontRideHeight + rearRideHeight) * 0.9} L 380 ${
                          240 - rearRideHeight * 1.8
                        } L 380 240 L 20 240 Z`}
                        fill="rgba(56, 189, 248, 0.08)"
                      />

                      {/* Dimension arrows */}
                      <line x1="20" y1="240" x2="20" y2={240 - frontRideHeight * 1.8} stroke="#f59e0b" strokeWidth="2" />
                      <text x="25" y={235 - frontRideHeight} fill="#f59e0b" fontSize="10" fontFamily="monospace">
                        hf: {frontRideHeight}mm
                      </text>

                      <line x1="380" y1="240" x2="380" y2={240 - rearRideHeight * 1.8} stroke="#f59e0b" strokeWidth="2" />
                      <text x="325" y={235 - rearRideHeight} fill="#f59e0b" fontSize="10" fontFamily="monospace">
                        hr: {rearRideHeight}mm
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="canvas-footer">
                  <span>Regression Gates: <strong>Stationary Residual Convergence</strong></span>
                  <span>Sensitivity Error: <strong>{remediationActive ? "1.52% Remediation Verified" : "7.22% Unremediated"}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. TRACE FANGEO 14-LAYER ARCHITECTURE ================= */}
        {activeTab === "trace-fangeo" && (
          <div className="stage-panel fangeo-stage">
            <div className="fangeo-header-box">
              <div className="hud-badge">
                <Layers size={14} /> MASTER&apos;S THESIS @ ISAE-SUPAERO // DAEP TURBOMACHINERY
              </div>
              <h3>TRACE FanGEO: Requirement-Driven Turbomachinery Chain</h3>
              <p>
                From 1D cycle thermodynamic duty to 3D B-spline blade geometry, surface normals, and Body Force Model (BFM) metal blockage extraction across 14 rigorous engineering layers.
              </p>
            </div>

            {/* 14-Layer Interactive Selector Bar */}
            <div className="layers-timeline">
              {layers.map((lay, idx) => (
                <button
                  key={lay.id}
                  className={`layer-node-btn ${selectedLayer === idx ? "active" : ""}`}
                  onClick={() => setSelectedLayer(idx)}
                >
                  <span className="l-id">{lay.id}</span>
                  <span className="l-cat">{lay.cat}</span>
                </button>
              ))}
            </div>

            {/* Selected Layer Deep-Dive Inspection Panel */}
            <div className="layer-inspection-card">
              <div className="inspect-header">
                <div className="inspect-title-group">
                  <span className="inspect-id">{layers[selectedLayer].id}</span>
                  <div>
                    <h4>{layers[selectedLayer].title}</h4>
                    <span className="inspect-cat-badge">{layers[selectedLayer].cat}</span>
                  </div>
                </div>
                <div className="nav-step-btns">
                  <button
                    disabled={selectedLayer === 0}
                    onClick={() => setSelectedLayer((prev) => Math.max(0, prev - 1))}
                  >
                    ← Previous Layer
                  </button>
                  <button
                    disabled={selectedLayer === layers.length - 1}
                    onClick={() => setSelectedLayer((prev) => Math.min(layers.length - 1, prev + 1))}
                  >
                    Next Layer →
                  </button>
                </div>
              </div>

              <div className="inspect-body-grid">
                <div className="inspect-desc-col">
                  <h5>STAGE PURPOSE & IMPLEMENTATION</h5>
                  <p>{layers[selectedLayer].desc}</p>

                  <div className="math-formula-box">
                    <span className="f-label">GOVERNING FORMULATION:</span>
                    <code>{layers[selectedLayer].eq}</code>
                  </div>
                </div>

                <div className="inspect-gate-col">
                  <h5>NUMERICAL VERIFICATION GATE</h5>
                  <div className="gate-box">
                    <CheckCircle2 className="gate-icon" size={20} />
                    <div>
                      <strong>Pass Condition:</strong>
                      <p>{layers[selectedLayer].gate}</p>
                    </div>
                  </div>

                  <div className="scope-clarity">
                    <AlertTriangle size={15} />
                    <span>Scope: Analytical throughflow & BFM preprocessing. Downstream 3D RANS and rig testing are separate solver stages.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. VOROM-X VLM SOLVER ================= */}
        {activeTab === "vorom-x" && (
          <div className="stage-panel vorom-stage">
            <div className="stage-grid">
              <div className="stage-controls">
                <div className="hud-badge">
                  <Cpu size={14} /> VOROM-X V6 // 3D VORTEX LATTICE METHOD (196+1 TESTS)
                </div>
                <h3>Blended-Wing-Body Trim & Induced Drag Trade</h3>
                <p>
                  VOROM-X solves 3D potential flow using horseshoe vortex panels and Trefftz-plane
                  momentum integration. Applied to a tailless BWB design trade (20° sweep / −3° washout).
                </p>

                <div className="vlm-sliders">
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Leading-Edge Sweep (Λ_LE)</span>
                      <strong>{sweep}°</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      value={sweep}
                      onChange={(e) => setSweep(Number(e.target.value))}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Tip Washout / Twist (ε_tip)</span>
                      <strong>{washout.toFixed(1)}°</strong>
                    </div>
                    <input
                      type="range"
                      min="-6"
                      max="0"
                      step="0.5"
                      value={washout}
                      onChange={(e) => setWashout(Number(e.target.value))}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Aspect Ratio ($AR$)</span>
                      <strong>{aspectRatio.toFixed(1)}</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="12"
                      step="0.5"
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="aero-telemetry-grid mt-4">
                  <div className="aero-tele-card">
                    <span className="tele-lbl">OSWALD EFFICIENCY ($e$)</span>
                    <span className="tele-val text-cyan-400">
                      {(0.96 - Math.abs(washout + 3.0) * 0.03 - (sweep - 20) * 0.003).toFixed(3)}
                    </span>
                    <small>Trefftz integration</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">STATIC MARGIN ($K_n$)</span>
                    <span className="tele-val text-amber-400">
                      {(5.2 + (sweep - 20) * 0.25 + washout * 0.4).toFixed(1)}% MAC
                    </span>
                    <small>Tailless pitch stability</small>
                  </div>
                  <div className="aero-tele-card">
                    <span className="tele-lbl">TEST SUITE COVERAGE</span>
                    <span className="tele-val text-green-400">196 + 1</span>
                    <small>Unit & regression tests</small>
                  </div>
                </div>
              </div>

              {/* 3D Planform SVG */}
              <div className="stage-canvas">
                <div className="canvas-header">
                  <span className="mono-sub">PLANFORM_GEOMETRY // TREFFTZ_PLANE_WAKE</span>
                  <span className="status-pill healthy">TRIMMED & STATICALLY STABLE</span>
                </div>

                <div className="canvas-body">
                  <svg viewBox="0 0 520 300" className="vlm-svg">
                    {/* Background Grid */}
                    <defs>
                      <pattern id="vlmGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#ffffff08" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="520" height="300" fill="url(#vlmGrid)" />

                    {/* Symmetric BWB / Wing Planform */}
                    <g transform="translate(260, 40)">
                      {/* Wing Surface */}
                      <path
                        d={`M 0 0 L ${180} ${180 * Math.tan((sweep * Math.PI) / 180)} L ${180} ${
                          180 * Math.tan((sweep * Math.PI) / 180) + 40
                        } L 0 100 L ${-180} ${180 * Math.tan((sweep * Math.PI) / 180) + 40} L ${-180} ${
                          180 * Math.tan((sweep * Math.PI) / 180)
                        } Z`}
                        fill="rgba(56, 189, 248, 0.08)"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />

                      {/* Horseshoe Vortex Filaments */}
                      {Array.from({ length: 9 }, (_, i) => {
                        const t = (i + 1) / 10;
                        const x = 180 * t;
                        const yLe = x * Math.tan((sweep * Math.PI) / 180);
                        const yTe = yLe + 100 - t * 60;
                        return (
                          <g key={i}>
                            {/* Right wing panels */}
                            <line x1={x} y1={yLe} x2={x} y2={yTe + 80} stroke="#38bdf8" strokeOpacity="0.4" strokeDasharray="3 3" />
                            {/* Left wing panels */}
                            <line x1={-x} y1={yLe} x2={-x} y2={yTe + 80} stroke="#38bdf8" strokeOpacity="0.4" strokeDasharray="3 3" />
                          </g>
                        );
                      })}

                      {/* Centerline & Neutral Point */}
                      <line x1="0" y1="-10" x2="0" y2="240" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="0" cy={55 + sweep * 1.5} r="5" fill="#f59e0b" />
                      <text x="10" y={55 + sweep * 1.5} fill="#f59e0b" fontSize="10" fontFamily="monospace">
                        NEUTRAL POINT (x_np)
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="canvas-footer">
                  <span>Method: <strong>Trefftz-Plane Circulation Integration</strong></span>
                  <span>Application: <strong>BWB Configuration Synthesis</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. LILIUM TEST HARDWARE ================= */}
        {activeTab === "hardware" && (
          <div className="stage-panel hardware-stage">
            <div className="stage-grid">
              <div className="stage-controls">
                <div className="hud-badge">
                  <ShieldCheck size={14} /> LILIUM eAIRCRAFT // MECHANICAL DESIGN INTERNSHIP
                </div>
                <h3>Structural Test Fixture Engineering & GD&T</h3>
                <p>
                  Designed custom test fixtures and support hardware for lightweight composite
                  sandwich panels in <strong>Siemens NX</strong> with <strong>ASME Y14.5 GD&T</strong>.
                  Pre-test nonlinear FEA in <strong>ANSYS Workbench</strong> ensured accurate stress transfer and avoided premature fixture yield.
                </p>

                <div className="spec-table mt-4">
                  <div className="spec-row">
                    <span className="spec-k">CAD ENVIRONMENT</span>
                    <span className="spec-v">Siemens NX (Parametric Assemblies & Drawings)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">TOLERANCING STANDARD</span>
                    <span className="spec-v">ASME Y14.5-2018 (Position, Profile of Surface, Runout)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">FEA VALIDATION</span>
                    <span className="spec-v">ANSYS Workbench (Nonlinear Contact & Pre-Test Margins)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-k">PDM ECO WORKFLOW</span>
                    <span className="spec-v">Teamcenter (Released Drawings & Engineering Change Orders)</span>
                  </div>
                </div>

                <div className="synergy-box mt-6">
                  <ShieldCheck size={18} className="text-cyan-400" />
                  <div>
                    <strong>Bridging Code to Metal:</strong>
                    <span> Aerodynamic algorithms mean nothing if the physical airframe cannot sustain certification flight loads. Combining CFD with structural test design ensures engineering realism.</span>
                  </div>
                </div>
              </div>

              {/* Hardware Test Rig CAD Schematic */}
              <div className="stage-canvas">
                <div className="canvas-header">
                  <span className="mono-sub">FIXTURE_SCHEMATIC // COMPOSITE_INSERT_PULLOUT</span>
                  <span className="status-pill healthy">TEST BENCH READY</span>
                </div>

                <div className="canvas-body">
                  <svg viewBox="0 0 520 280" className="hardware-svg">
                    {/* Test Bench Base Plate */}
                    <rect x="50" y="210" width="420" height="35" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                    <text x="210" y="232" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      UNIVERSAL TEST BENCH INTERFACE
                    </text>

                    {/* Clamping Jaws / Fixture Base */}
                    <rect x="110" y="140" width="80" height="70" fill="#334155" stroke="#94a3b8" />
                    <rect x="330" y="140" width="80" height="70" fill="#334155" stroke="#94a3b8" />

                    {/* Composite Sandwich Panel */}
                    <rect x="140" y="120" width="240" height="20" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="140" y1="120" x2="380" y2="120" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="140" y1="140" x2="380" y2="140" stroke="#f59e0b" strokeWidth="2" />

                    {/* Central Loading Actuator Rod */}
                    <rect x="250" y="30" width="20" height="90" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
                    {/* Load Arrow */}
                    <path d="M 260 15 L 260 45 M 250 35 L 260 45 L 270 35" stroke="#f87171" strokeWidth="3" fill="none" />
                    <text x="280" y="35" fill="#f87171" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ACTUATOR LOAD (F_z)
                    </text>

                    {/* GD&T Datum Callouts */}
                    <g transform="translate(70, 170)">
                      <rect x="0" y="0" width="30" height="20" fill="#0f172a" stroke="#38bdf8" />
                      <text x="8" y="15" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        -A-
                      </text>
                    </g>
                    <g transform="translate(430, 170)">
                      <rect x="0" y="0" width="30" height="20" fill="#0f172a" stroke="#38bdf8" />
                      <text x="8" y="15" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        -B-
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="canvas-footer">
                  <span>Standard: <strong>ASME Y14.5 GD&T Verification</strong></span>
                  <span>Analysis: <strong>Nonlinear FEA Interface Deflection &lt; 0.05 mm</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verified Academic & Industry Credentials */}
      <div className="verified-credentials-band">
        <div className="creds-header">
          <p className="eyebrow">VERIFIED ACADEMIC & PROFESSIONAL LEDGER</p>
          <h3>Grounded Credentials & Audit Gate Compliance</h3>
        </div>

        <div className="creds-grid">
          <div className="cred-card">
            <span className="cred-inst">ISAE-SUPAERO // FRANCE</span>
            <h4>Master in Aerospace Engineering (Year 2)</h4>
            <p className="cred-major">Advanced Aerodynamics & Propulsion</p>
            <ul className="cred-grades">
              <li>Advanced Aerodynamics: <strong>15 / 20</strong></li>
              <li>Numerical Fluid Mechanics: <strong>15 / 20</strong></li>
              <li>Fluid-Structure Interaction: <strong>16 / 20</strong></li>
              <li>Project Management: <strong>20 / 20</strong></li>
            </ul>
          </div>

          <div className="cred-card">
            <span className="cred-inst">TUM // GERMANY</span>
            <h4>Graduate Aerospace Engineering Coursework</h4>
            <p className="cred-major">Technical University of Munich</p>
            <ul className="cred-grades">
              <li>Graduate Coursework: <strong>57 ECTS Completed</strong></li>
              <li>Aircraft Design & Aerodynamics of Aircraft</li>
              <li>Composite Materials & Additive Manufacturing</li>
              <li>Non-Destructive Testing (NDT)</li>
            </ul>
          </div>

          <div className="cred-card">
            <span className="cred-inst">KTU // INDIA</span>
            <h4>Bachelor of Technology (Honours)</h4>
            <p className="cred-major">Mechanical Engineering</p>
            <ul className="cred-grades">
              <li>Cumulative Grade: <strong>CGPA 9.28 / 10.0</strong></li>
              <li>Honours Thesis: Distributed Electric Propulsion (DEP)</li>
              <li>Secretary & Co-Founder: Aerospace Club</li>
              <li>Campus Ambassador: ASME & ISNT</li>
            </ul>
          </div>
        </div>

        <div className="cv-download-cta">
          <div>
            <h4>Looking for technical evaluation?</h4>
            <p>Download the concise 1-page aerospace engineering curriculum vitae.</p>
          </div>
          <div className="cta-actions">
            <a href="/resume.pdf" download className="btn-dl-cv">
              <FileText size={18} /> Download Verified CV (PDF)
            </a>
            <Link href="/projects" className="btn-explore-projects">
              Explore All 48 Projects <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
