import Link from "next/link";
import profile from "@/data/profile.json";
export default function About() {
  return (
    <div className="shell section">
      <p className="eyebrow">About / Reghuram Kesavan</p>
      <h1 className="page-title">
        An engineer’s curiosity.
        <br />
        <em>A creative perspective.</em>
      </h1>
      <p className="section-description">
        I’m completing the Master in Aerospace Engineering at ISAE-SUPAERO in
        Toulouse, specialising in Advanced Aerodynamics & Propulsion, following
        graduate aerospace studies at TUM.
      </p>
      <p className="section-description">
        My work spans aerodynamic modelling, scientific computing and aerospace
        test hardware.{" "}
      </p>
      <div className="about-grid">
        <section>
          <p className="eyebrow">Education</p>
          <Link className="text-link" href="/profile">
            Explore the complete profile archive ↗
          </Link>
          {profile.education.map((e) => (
            <article className="education-row" key={e.institution}>
              <p className="eyebrow">
                {e.period} · {e.location}
              </p>
              <h2>{e.institution}</h2>
              <h3>{e.degree}</h3>
              <p>{e.details}</p>
            </article>
          ))}
        </section>
        <aside className="profile-aside">
          <p className="eyebrow">Current focus</p>
          <h3>TRACE FanGEO</h3>
          <p>
            Requirement-driven fan geometry to body-force model preprocessing.
            Master’s thesis at ISAE-SUPAERO, DAEP.
          </p>
          <Link className="text-link" href="/projects/trace-fangeo">
            Explore the project ↗
          </Link>
          <p className="eyebrow" style={{ marginTop: 40 }}>
            Languages · self-reported
          </p>
          {profile.languages.map((l) => (
            <p key={l.language}>
              {l.language} <span>{l.level}</span>
            </p>
          ))}
          <Link className="text-link personal-only" href="/awards">
            Leadership & activities ↗
          </Link>
        </aside>
      </div>
    </div>
  );
}
