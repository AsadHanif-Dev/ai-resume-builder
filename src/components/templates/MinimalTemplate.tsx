import React from "react";
import { Resume } from "../../lib/types";
import { formatDate } from "../../lib/utils";

/** Minimal template â€” generous white space, understated hierarchy, dot separator */
export default function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      style={{
        fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
        fontSize: "10pt",
        lineHeight: "1.5",
        color: "#1e293b",
        background: "#fff",
        padding: "0.7in 0.75in",
        minHeight: "11in",
        maxWidth: "8.5in",
        margin: "0 auto",
      }}
    >
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header style={{ marginBottom: "1.25rem" }}>
        <h1
          style={{
            fontSize: "22pt",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#0f172a",
            margin: "0 0 6px",
          }}
        >
          {resume.name}
        </h1>

        {resume.professionalTitle && (
          <p style={{ fontSize: "10pt", color: "#64748B", fontWeight: 400, margin: "0 0 8px" }}>
            {resume.professionalTitle}
          </p>
        )}

        <div style={{ fontSize: "8.5pt", color: "#94A3B8", display: "flex", flexWrap: "wrap" }}>
          {[
            resume.email,
            resume.phone,
            resume.location,
            resume.linkedin,
            resume.github,
          ]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i}>
                {item}
                {i < arr.length - 1 && (
                  <span style={{ margin: "0 0.45rem", opacity: 0.5 }}>Â·</span>
                )}
              </span>
            ))}
        </div>
      </header>

      <div style={{ height: "1px", background: "#E2E8F0", marginBottom: "1.25rem" }} />

      {/* â”€â”€ Summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.summary && (
        <section style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontSize: "10pt",
              color: "#475569",
              lineHeight: "1.65",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {resume.summary}
          </p>
        </section>
      )}

      {/* â”€â”€ Experience â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.experiences.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Experience</MinimalHeading>
          {resume.experiences.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < resume.experiences.length - 1 ? "0.9rem" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 500, fontSize: "10pt", color: "#0f172a" }}>
                  {exp.title}
                </span>
                <span style={{ fontSize: "8.5pt", color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                  {exp.startDate && `${formatDate(exp.startDate)} â€“ ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                </span>
              </div>
              <p style={{ fontSize: "9pt", color: "#64748B", fontStyle: "italic", margin: "1px 0 5px" }}>
                {exp.company}
                {exp.location && ` Â· ${exp.location}`}
              </p>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {exp.bullets.filter((b) => b.trim()).map((bullet, bi) => (
                    <li
                      key={bi}
                      style={{
                        fontSize: "9.5pt",
                        color: "#374151",
                        lineHeight: "1.55",
                        paddingLeft: "0.9rem",
                        position: "relative",
                        marginBottom: "2px",
                      }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "#CBD5E1" }}>â€“</span>
                      {bullet.replace(/^[â€¢\-â€“â€”]\s*/, "")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Education â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.education.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Education</MinimalHeading>
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}
            >
              <div>
                <span style={{ fontWeight: 500, fontSize: "10pt", color: "#0f172a" }}>
                  {edu.school}
                </span>
                {edu.degree && (
                  <span style={{ fontSize: "9.5pt", color: "#64748B", marginLeft: "0.4rem" }}>
                    â€” {edu.degree}
                  </span>
                )}
              </div>
              {(edu.startDate || edu.endDate) && (
                <span style={{ fontSize: "8.5pt", color: "#94A3B8", whiteSpace: "nowrap" }}>
                  {formatDate(edu.startDate)} â€“ {formatDate(edu.endDate)}
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Skills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.skills.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Skills</MinimalHeading>
          <p style={{ fontSize: "9.5pt", color: "#374151", lineHeight: "1.6", margin: 0 }}>
            {resume.skills.join(" Â· ")}
          </p>
        </section>
      )}

      {/* â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.projects.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Projects</MinimalHeading>
          {resume.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "0.6rem" }}>
              <span style={{ fontWeight: 500, fontSize: "10pt", color: "#0f172a" }}>{proj.name}</span>
              {proj.techStack && (
                <span style={{ fontSize: "8.5pt", color: "#94A3B8", marginLeft: "0.4rem" }}>
                  {proj.techStack}
                </span>
              )}
              {proj.description && (
                <p style={{ fontSize: "9.5pt", color: "#475569", margin: "2px 0", lineHeight: "1.5" }}>
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Certifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.certifications.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Certifications</MinimalHeading>
          {resume.certifications.map((cert) => (
            <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "9.5pt", color: "#374151" }}>
                {cert.name} <span style={{ color: "#94A3B8" }}>â€” {cert.issuer}</span>
              </span>
              {cert.year && <span style={{ fontSize: "8.5pt", color: "#94A3B8" }}>{cert.year}</span>}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Languages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.languages.length > 0 && (
        <section style={{ marginBottom: "1.25rem" }}>
          <MinimalHeading>Languages</MinimalHeading>
          <p style={{ fontSize: "9.5pt", color: "#374151", margin: 0 }}>
            {resume.languages.map((l) => `${l.name} (${l.proficiency})`).join(" Â· ")}
          </p>
        </section>
      )}
    </div>
  );
}

function MinimalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "7.5pt",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#94A3B8",
        margin: "0 0 0.55rem",
      }}
    >
      {children}
    </h2>
  );
}
