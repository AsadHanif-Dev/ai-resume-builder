import React from "react";
import { Resume } from "../../lib/types";
import { formatDate } from "../../lib/utils";

/** Modern template â€” left-rule accent, tight spacing, inline skill tags */
export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      className="bg-white"
      style={{
        fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: "1.45",
        color: "#111827",
        padding: "0.6in 0.65in",
        minHeight: "11in",
        maxWidth: "8.5in",
        margin: "0 auto",
      }}
    >
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header
        style={{
          borderLeft: "3px solid #2563EB",
          paddingLeft: "0.6rem",
          marginBottom: "1.1rem",
        }}
      >
        <h1
          style={{
            fontSize: "20pt",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#0F172A",
            margin: 0,
          }}
        >
          {resume.name}
        </h1>

        {resume.professionalTitle && (
          <p
            style={{
              fontSize: "10.5pt",
              fontWeight: 500,
              color: "#2563EB",
              margin: "3px 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            {resume.professionalTitle}
          </p>
        )}

        <div
          style={{
            fontSize: "8.5pt",
            color: "#64748B",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {[resume.email, resume.phone, resume.location]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i}>
                {item}
                {i < arr.length - 1 && (
                  <span style={{ margin: "0 0.3rem", opacity: 0.4 }}>Â·</span>
                )}
              </span>
            ))}
        </div>

        {(resume.linkedin || resume.github || resume.portfolio) && (
          <div
            style={{
              fontSize: "8.5pt",
              color: "#2563EB",
              marginTop: "3px",
              display: "flex",
              gap: "1rem",
            }}
          >
            {resume.linkedin && <span>{resume.linkedin}</span>}
            {resume.github && <span>{resume.github}</span>}
            {resume.portfolio && <span>{resume.portfolio}</span>}
          </div>
        )}
      </header>

      {/* â”€â”€ Section heading helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* Inline component pattern for consistent section headers */}

      {/* â”€â”€ Summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.summary && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Professional Summary</SectionHeading>
          <p style={{ fontSize: "9.5pt", color: "#374151", lineHeight: "1.55", margin: 0 }}>
            {resume.summary}
          </p>
        </section>
      )}

      {/* â”€â”€ Experience â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.experiences.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Experience</SectionHeading>
          {resume.experiences.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < resume.experiences.length - 1 ? "0.75rem" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1px" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: "10pt", color: "#0F172A" }}>
                    {exp.title}
                  </span>
                  {exp.company && (
                    <span style={{ fontSize: "9.5pt", color: "#2563EB", marginLeft: "0.4rem" }}>
                      â€” {exp.company}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "8.5pt", color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                  {exp.startDate && `${formatDate(exp.startDate)} â€“ ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                  {exp.location && ` Â· ${exp.location}`}
                </span>
              </div>

              {exp.bullets.length > 0 && (
                <ul style={{ margin: "4px 0 0 0", paddingLeft: "1.1rem", listStyleType: "disc" }}>
                  {exp.bullets.filter((b) => b.trim()).map((bullet, bi) => (
                    <li
                      key={bi}
                      style={{ fontSize: "9.5pt", color: "#374151", lineHeight: "1.5", marginBottom: "2px" }}
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
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Education</SectionHeading>
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: "10pt", color: "#0F172A" }}>
                  {edu.school}
                </span>
                {edu.degree && (
                  <span style={{ fontSize: "9.5pt", color: "#475569", marginLeft: "0.4rem" }}>
                    â€” {edu.degree}
                  </span>
                )}
                {edu.gpa && (
                  <span style={{ fontSize: "8.5pt", color: "#94A3B8", marginLeft: "0.4rem" }}>
                    GPA {edu.gpa}
                  </span>
                )}
              </div>
              {(edu.startDate || edu.endDate) && (
                <span style={{ fontSize: "8.5pt", color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                  {formatDate(edu.startDate)} â€“ {formatDate(edu.endDate)}
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Skills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.skills.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Skills</SectionHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {resume.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  fontSize: "8.5pt",
                  padding: "2px 8px",
                  background: "#EFF6FF",
                  color: "#1E40AF",
                  borderRadius: "4px",
                  border: "1px solid #BFDBFE",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.projects.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Projects</SectionHeading>
          {resume.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 600, fontSize: "10pt", color: "#0F172A" }}>
                  {proj.name}
                </span>
                {proj.techStack && (
                  <span style={{ fontSize: "8.5pt", color: "#64748B" }}>
                    {proj.techStack}
                  </span>
                )}
              </div>
              {proj.description && (
                <p style={{ fontSize: "9.5pt", color: "#374151", margin: "2px 0", lineHeight: "1.5" }}>
                  {proj.description}
                </p>
              )}
              {proj.outcome && (
                <p style={{ fontSize: "9pt", color: "#475569", margin: "1px 0" }}>
                  <strong>Outcome:</strong> {proj.outcome}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Certifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.certifications.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Certifications</SectionHeading>
          {resume.certifications.map((cert) => (
            <div
              key={cert.id}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: "9.5pt", color: "#0F172A" }}>{cert.name}</span>
                <span style={{ fontSize: "9pt", color: "#64748B", marginLeft: "0.4rem" }}>â€” {cert.issuer}</span>
              </div>
              {cert.year && (
                <span style={{ fontSize: "8.5pt", color: "#94A3B8" }}>{cert.year}</span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Achievements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.achievements.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Achievements &amp; Awards</SectionHeading>
          {resume.achievements.map((ach) => (
            <div key={ach.id} style={{ marginBottom: "0.3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, fontSize: "9.5pt", color: "#0F172A" }}>{ach.title}</span>
                {ach.year && <span style={{ fontSize: "8.5pt", color: "#94A3B8" }}>{ach.year}</span>}
              </div>
              {ach.description && (
                <p style={{ fontSize: "9pt", color: "#374151", margin: "1px 0" }}>{ach.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Languages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.languages.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Languages</SectionHeading>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {resume.languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: "9.5pt", color: "#374151" }}>
                <strong>{lang.name}</strong>
                <span style={{ color: "#94A3B8" }}> â€” {lang.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* â”€â”€ Publications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.publications.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Publications</SectionHeading>
          {resume.publications.map((pub) => (
            <div key={pub.id} style={{ marginBottom: "0.4rem" }}>
              <span style={{ fontWeight: 600, fontSize: "9.5pt", color: "#0F172A" }}>{pub.title}</span>
              <span style={{ fontSize: "9pt", color: "#64748B" }}>
                {pub.publisher && ` â€” ${pub.publisher}`}
                {pub.year && ` (${pub.year})`}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* â”€â”€ Volunteer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {resume.volunteerExperiences.length > 0 && (
        <section style={{ marginBottom: "1rem" }}>
          <SectionHeading>Volunteer Experience</SectionHeading>
          {resume.volunteerExperiences.map((vol) => (
            <div key={vol.id} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: "10pt", color: "#0F172A" }}>{vol.role}</span>
                  <span style={{ fontSize: "9.5pt", color: "#2563EB", marginLeft: "0.4rem" }}>â€” {vol.organization}</span>
                </div>
                {(vol.startDate || vol.endDate) && (
                  <span style={{ fontSize: "8.5pt", color: "#94A3B8", whiteSpace: "nowrap" }}>
                    {formatDate(vol.startDate)} â€“ {vol.endDate ? formatDate(vol.endDate) : "Present"}
                  </span>
                )}
              </div>
              {vol.description && (
                <p style={{ fontSize: "9.5pt", color: "#374151", margin: "2px 0", lineHeight: "1.5" }}>
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

/* â”€â”€ Shared section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "8pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0F172A",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
      <div style={{ height: "1px", background: "#E2E8F0", flex: 1 }} />
    </div>
  );
}
