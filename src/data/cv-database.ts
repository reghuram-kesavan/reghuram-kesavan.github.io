export const REGHURAM_BRAIN = {
  profile: {
    summary:
      "Aerospace Engineer completing the Master in Aerospace Engineering at ISAE-SUPAERO (Major: Advanced Aerodynamics & Propulsion), with graduate studies at TUM. Specialized in low- and high-fidelity aerodynamics, RANS CFD, scientific Python tool development (VOROM-X, ApexSim, TRACE FanGEO), high-lift numerical aerodynamic analysis, and propulsion–airframe interaction, supported by professional aerospace test and mechanical engineering experience at Lilium.",
    core_competencies: [
      "Aerodynamics & Flight Physics",
      "RANS CFD & Mesh Convergence (GCI)",
      "Low-Order Aerodynamic Modelling (3D VLM / Trefftz Drag)",
      "High-Lift Aerodynamics & Wind-Tunnel Testing",
      "Propulsion–Airframe Interaction",
      "Scientific Computing & Automation (Python, NumPy, SciPy)",
      "Mechanical Design & ASME Y14.5 GD&T (Siemens NX)",
      "Structural Testing & Pre-Test Nonlinear FEA (ANSYS Workbench)",
      "Configuration Management (Teamcenter PLM)",
    ],
  },
  experience: [
    {
      company: "Lilium eAircraft GmbH",
      role: "Mechanical Design Engineer Intern",
      period: "04/2024 – 11/2024",
      tech: [
        "Siemens NX",
        "ASME Y14.5 GD&T",
        "ANSYS Workbench",
        "Teamcenter PLM",
        "UTM Testing",
      ],
      impact:
        "Defined structural test requirements and designed custom test fixtures and support hardware for composite sandwich panels in Siemens NX with ASME Y14.5 GD&T. Conducted pre-test nonlinear FEM in ANSYS Workbench and managed controlled drawing releases in Teamcenter.",
    },
    {
      company: "Feynman Aerospace LLP",
      role: "Aircraft Design Intern",
      period: "04/2021 – 10/2021",
      tech: ["XFLR5", "ANSYS Fluent", "SolidWorks", "Flight Testing"],
      impact:
        "Conducted low-Reynolds aerodynamic and stability analysis for an ~2 m fixed-wing UAV using XFLR5 and Fluent; generated 3D airframe geometry in SolidWorks and supported prototype flight testing.",
    },
    {
      company: "WARR Rocketry Club TUM",
      role: "Mechanical Engineer / Structural Analysis",
      period: "10/2023 – 04/2024",
      tech: ["ANSYS FEA", "Composite Laminates", "Buckling Analysis", "CAD"],
      impact:
        "Enhanced structural performance and evaluated buckling margins of CFRP cryogenic propellant tanks for student sounding rockets under combined internal pressure and axial launch loads.",
    },
  ],
  projects: [
    {
      name: "VOROM-X: 3D Vortex Lattice & Trefftz Drag Simulator",
      type: "Scientific Python Tool",
      tech: ["Python", "NumPy", "SciPy", "VLM", "Trefftz Drag"],
      details:
        "Developed an object-oriented 3D VLM research prototype with Trefftz-plane induced drag calculation, automated longitudinal trim, and static stability derivatives (196+1 tests).",
    },
    {
      name: "High-Lift Aerodynamics: Wind Tunnel & Transition-SST RANS",
      type: "ISAE-SUPAERO Research",
      tech: ["ANSYS Fluent", "Wind Tunnel", "XFOIL", "Transition-SST"],
      details:
        "Conducted numerical analysis of the HLHLSD4 airfoil at Re = 1.0×10⁶; correlated Transition-SST RANS on multi-block grids (y⁺ < 1) with ~0.15% CL and ~2% CD convergence.",
    },
    {
      name: "ApexSim: Aerodynamic Methods & Scientific Automation",
      type: "Engineering Methods Tool",
      tech: ["Python", "SU2 RANS", "Kriging", "Surrogates", "DOE"],
      details:
        "Engineered automated CFD pipelines and surrogate models (69/69 tests); established numerical evidence gates with domain boundary remediation (ΔCL: 7.22% → 1.52%).",
    },
    {
      name: "TRACE FanGEO: Turbomachinery Design Workflow",
      type: "Master's Thesis Research",
      tech: ["Python", "B-splines", "Throughflow", "Radial Equilibrium"],
      details:
        "Developed a requirement-driven fan throughflow and 3D blade geometry preprocessor across 41 spanwise sections at ISAE-SUPAERO DAEP.",
    },
    {
      name: "Distributed Electric Propulsion (DEP) Aircraft Aerodynamics",
      type: "B.Tech Honours Thesis",
      tech: ["ANSYS Fluent", "HyperMesh", "SolidWorks", "RANS"],
      details:
        "Investigated aerodynamic interaction between a transport wing and stationary nacelle installations using steady RANS, mapping pressure fields and boundary-layer velocity slices.",
    },
  ],
  education: {
    masters:
      "Master in Aerospace Engineering (Year 2), ISAE-SUPAERO (Advanced Aerodynamics & Propulsion, 2025–2026)",
    graduate_studies:
      "Graduate Aerospace Engineering Studies, Technical University of Munich (57 ECTS, 2023–2025)",
    bachelors:
      "B.Tech (Honours) in Mechanical Engineering, APJ Abdul Kalam Technological University (CGPA: 9.3/10.0, 2018–2022)",
  },
};
