import profile from "@/data/profile.json";
import Link from "next/link";
export default function Skills() {
  return (
    <div className="shell section">
      <p className="eyebrow">Capabilities / Tools & methods</p>
      <h1 className="page-title">
        A practical toolkit.
        <br />
        <em>A questioning mindset.</em>
      </h1>
      <p className="section-description">
        Tools used across academic projects and industry work. Individual case
        studies provide context for their application.
      </p>
      <div className="skills-grid">
        {Object.entries(profile.skills).map(([category, items], i) => (
          <section key={category}>
            <p className="eyebrow">0{i + 1}</p>
            <h2>{category}</h2>
            <div className="tool-tags">
              {items.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Link className="text-link" href="/projects">
        See the tools in context ↗
      </Link>
    </div>
  );
}
