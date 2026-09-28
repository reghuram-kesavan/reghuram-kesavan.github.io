import Link from "next/link";
import profile from "@/data/profile.json";
export default function Activities() {
  return (
    <div className="shell section">
      <p className="eyebrow">Leadership</p>
      <h1 className="page-title">
        Building things.
        <br />
        <em>Bringing people together.</em>
      </h1>
      <div className="skills-grid">
        {profile.leadership.map((item) => (
          <article key={item}>
            <h2>{item}</h2>
          </article>
        ))}
      </div>
      <Link className="text-link" href="/profile">
        Explore the full profile ↗
      </Link>
    </div>
  );
}
