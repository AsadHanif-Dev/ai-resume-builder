import React from "react";
import { Resume } from "../../lib/types";
import { formatDate } from "../../lib/utils";

/** Classic template â€” Georgia serif, centred header, ruled sections */
export default function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "10.5pt",
        lineHeight: "1.45",
        color: "#1a1a1a",
        background: "#fff",
        padding: "0.65in 0.75in",
        minHeight: "11in",
        maxWidth: "8.5in",
        margin: "0 auto",
      }}
    >
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header
        style={{
          textAlign: "center",
          paddingBottom: "0.6rem",
          marginBottom: "0.75rem",
          borderBottom: "1.5px solid #1a1a1a",
        }}
      >
        <h1
          style={{
            fontSize: "20pt",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#1a1a1a",
            margin: "0 0 4px",
          }}
        >
          {resume.name}
        </h1>

        {resume.professionalTitle && (
          <p style={{ fontSize: "10.5pt", color: "#4a4a4a", margin: "0 0 6px", fontStyle: "italic" }}>
            {resume.professionalTitle}
          </p>
        )}

        <div style={{ fontSize: "9pt", color: "#555", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.1rem" }}>
          {[resume.email, resume.phone, resume.location, resume.linkedin]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i}>
                {item}
                {i < arr.length - 1 && (
                  <span style={{ margin: "0 0.5rem", opacity: 0.4 }}>Â·</span>
                )}
              </span>
            ))}
        </div>
      </header>

      {/* â”€â”€ Summary / Objective â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.summary && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Objective</ClassicHeading>
          <p style={{ fontSize: "10pt", color: "#333", lineHeight: "1.6", margin: 0 }}>
            {resume.summary}
          </p>
        </section>
      )}

      {/* â”€â”€ Professional Experience â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.experiences.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Professional Experience</ClassicHeading>
          {resume.experiences.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < resume.experiences.length - 1 ? "0.75rem" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "10.5pt", color: "#1a1a1a" }}>{exp.title}</span>
                <span style={{ fontSize: "9pt", color: "#777", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                  {exp.startDate && `${formatDate(exp.startDate)} â€“ ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                </span>
              </div>
              <p style={{ fontStyle: "italic", fontSize: "10pt", color: "#555", margin: "1px 0 5px" }}>
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </p>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: "0", paddingLeft: "1.25rem", listStyleType: "disc" }}>
                  {exp.bullets.filter((b) => b.trim()).map((bullet, bi) => (
                    <li
                      key={bi}
                      style={{ fontSize: "10pt", color: "#333", lineHeight: "1.55", marginBottom: "2px" }}
                    >
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
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Education</ClassicHeading>
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}
            >
              <div>
                <span style={{ fontWeight: 700, fontSize: "10.5pt", color: "#1a1a1a" }}>{edu.school}</span>
                {edu.degree && (
                  <span style={{ fontSize: "10pt", color: "#555", marginLeft: "0.4rem" }}>â€” {edu.degree}</span>
                )}
                {edu.gpa && (
                  <span style={{ fontSize: "9pt", color: "#888", marginLeft: "0.4rem" }}>GPA {edu.gpa}</span>
                )}
              </div>
              {(edu.startDate || edu.endDate) && (
                <span style={{ fontSize: "9pt", color: "#777", whiteSpace: "nowrap" }}>
                  {formatDate(edu.startDate)} â€“ {formatDate(edu.endDate)}
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Skills & Qualifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.skills.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Skills &amp; Qualifications</ClassicHeading>
          <p style={{ fontSize: "10pt", color: "#333", lineHeight: "1.6", margin: 0 }}>
            {resume.skills.join(", ")}
          </p>
        </section>
      )}

      {/* â”€â”€ Notable Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.projects.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Notable Projects</ClassicHeading>
          {resume.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "10.5pt", color: "#1a1a1a" }}>{proj.name}</span>
              {proj.techStack && (
                <span style={{ fontSize: "9pt", color: "#777", marginLeft: "0.4rem" }}>({proj.techStack})</span>
              )}
              {proj.description && (
                <p style={{ fontSize: "10pt", color: "#333", margin: "2px 0", lineHeight: "1.55" }}>
                  {proj.description}
                </p>
              )}
              {proj.outcome && (
                <p style={{ fontSize: "9.5pt", color: "#555", margin: "1px 0" }}>
                  <em>Outcome:</em> {proj.outcome}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Certifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.certifications.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Certifications</ClassicHeading>
          {resume.certifications.map((cert) => (
            <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "10pt", color: "#333" }}>
                <strong>{cert.name}</strong> â€” {cert.issuer}
              </span>
              {cert.year && <span style={{ fontSize: "9pt", color: "#777" }}>{cert.year}</span>}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Languages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.languages.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Languages</ClassicHeading>
          <p style={{ fontSize: "10pt", color: "#333", margin: 0 }}>
            {resume.languages.map((l) => `${l.name} (${l.proficiency})`).join(" Â· ")}
          </p>
        </section>
      )}

      {/* â”€â”€ Publications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.publications.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Publications</ClassicHeading>
          {resume.publications.map((pub) => (
            <div key={pub.id} style={{ marginBottom: "0.3rem" }}>
              <span style={{ fontWeight: 700, fontSize: "10pt", color: "#1a1a1a" }}>{pub.title}</span>
              <span style={{ fontSize: "9.5pt", color: "#555" }}>
                {pub.publisher && ` â€” ${pub.publisher}`}
                {pub.year && ` (${pub.year})`}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Volunteer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.volunteerExperiences.length > 0 && (
        <section style={{ marginBottom: "0.9rem" }}>
          <ClassicHeading>Volunteer Experience</ClassicHeading>
          {resume.volunteerExperiences.map((vol) => (
            <div key={vol.id} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "10.5pt", color: "#1a1a1a" }}>{vol.role}</span>
                {(vol.startDate || vol.endDate) && (
                  <span style={{ fontSize: "9pt", color: "#777" }}>
                    {formatDate(vol.startDate)} â€“ {vol.endDate ? formatDate(vol.endDate) : "Present"}
                  </span>
                )}
              </div>
              <p style={{ fontStyle: "italic", fontSize: "10pt", color: "#555", margin: "1px 0 4px" }}>
                {vol.organization}
              </p>
              {vol.description && (
                <p style={{ fontSize: "10pt", color: "#333", margin: 0, lineHeight: "1.55" }}>
                  {vol.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function ClassicHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "9.5pt",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#1a1a1a",
        margin: "0 0 0.5rem",
        fontFamily: "Georgia, serif",
      }}
    >
      {children}
    </h2>
  );
}
