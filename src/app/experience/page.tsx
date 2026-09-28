import Link from "next/link";
const entries = [
  {
    name: "Lilium eAircraft GmbH",
    role: "Mechanical Design Engineer Intern",
    date: "April–November 2024",
    place: "Munich, Germany",
    type: "Industry",
    text: "Worked on mechanical test hardware for composite sandwich structures: test requirements, fixture design, drawing preparation and physical test support.",
    points: [
      "Designed and documented hardware with Siemens NX and GD&T.",
      "Used pre-test finite element analysis to examine fixture behaviour and load introduction.",
      "Contributed to compression and insert-pull-out testing and technical reporting.",
    ],
    link: "lilium-sandwich-structures",
  },
  {
    name: "Feynman Aerospace LLP",
    role: "Aircraft Design Intern",
    date: "April–October 2021",
    place: "India",
    type: "Industry",
    text: "Supported the development of a fixed-wing UAV through aerodynamic analysis, airframe CAD and prototype flight-test support.",
    points: [
      "Used XFLR5 and ANSYS Fluent for low-Reynolds-number aerodynamic studies.",
      "Developed airframe geometry in SolidWorks.",
      "Connected analysis and design work with prototype development.",
    ],
    link: "feynman-fixed-wing-uav",
  },
  {
    name: "WARR Rocketry · TUM",
    role: "Student team / Structural analysis",
    date: "2023–2024",
    place: "Munich, Germany",
    type: "Student engineering",
    text: "Contributed to composite cryogenic tank structural analysis in a student rocketry setting.",
    points: [
      "Explored finite element modelling and buckling assessment.",
      "Worked within the practical constraints of a multidisciplinary student team.",
    ],
    link: "warr-cryotank-fea",
  },
];
export default function Experience() {
  return (
    <div className="shell section">
      <p className="eyebrow">Experience / Industry & student engineering</p>
      <h1 className="page-title">
        Engineering is
        <br />
        <em>a team effort.</em>
      </h1>
      <p className="section-description">
        From aerospace test hardware to UAV design: the places where analysis
        meets practical constraints.
      </p>
      <div className="career-timeline">
        {entries.map((e, i) => (
          <article key={e.name}>
            <div className="timeline-meta">
              <span className="eyebrow">
                0{i + 1} / {e.type}
              </span>
              <p>{e.date}</p>
              <small>{e.place}</small>
            </div>
            <div className="timeline-content">
              <h2>{e.name}</h2>
              <h3>{e.role}</h3>
              <p>{e.text}</p>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link href={`/projects/${e.link}`} className="text-link">
                Related work ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
