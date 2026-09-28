import type { Metadata } from "next";
export const metadata: Metadata = { title: "CV" };
export default function Resume() {
  return (
    <div className="shell section">
      <p className="eyebrow">Profile / Curriculum vitae</p>
      <h1 className="page-title">The concise version.</h1>
      <p className="section-description">
        Download the portfolio CV or explore the project case studies for more
        technical context.
      </p>
      <div className="hero-actions">
        <a href="/resume.pdf" download className="button-primary">
          Download CV · PDF ↓
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Open PDF in a new tab ↗
        </a>
      </div>
      <p className="pdf-note">
        If your browser cannot display the preview, use either link above.
      </p>
      <iframe
        className="cv-preview"
        src="/resume.pdf"
        title="Reghuram Kesavan curriculum vitae"
      />
    </div>
  );
}
