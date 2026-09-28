import { ArrowUpRight } from "lucide-react";
import profile from "@/data/profile.json";
export default function Contact() {
  return (
    <div className="shell section contact-page">
      <p className="eyebrow">Contact / Toulouse, France</p>
      <h1 className="page-title">
        Good engineering
        <br />
        starts with
        <br />
        <em>a conversation.</em>
      </h1>
      <p className="section-description">
        For aerospace opportunities, research collaborations or a conversation
        about the work.
      </p>
      <div className="contact-options">
        {[
          ["Email", profile.email, `mailto:${profile.email}`],
          ["LinkedIn", "Reghuram Kesavan", profile.linkedin],
        ].map(([label, text, url]) => (
          <a key={label} href={url}>
            <span className="eyebrow">{label}</span>
            <strong>{text}</strong>
            <ArrowUpRight />
          </a>
        ))}
      </div>
      <p className="section-description">
        Based in Toulouse. Interested in opportunities across Europe.
      </p>
    </div>
  );
}
