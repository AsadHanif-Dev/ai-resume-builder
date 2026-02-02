import React from 'react'
import { Resume } from '../../lib/types'
import { formatDate } from '../../lib/utils'

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-8 shadow-sm max-w-[8.5in] mx-auto" style={{ minHeight: '11in' }}>
      {/* Header with accent bar */}
      <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">{resume.name}</h1>
        {resume.professionalTitle && (
          <p className="text-lg text-blue-600 font-medium mt-1">{resume.professionalTitle}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-zinc-600">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>• {resume.phone}</span>}
          {resume.location && <span>• {resume.location}</span>}
        </div>
        <div className="flex flex-wrap gap-3 mt-1 text-sm text-zinc-600">
          {resume.linkedin && <a href={resume.linkedin} className="hover:text-blue-600">LinkedIn</a>}
          {resume.github && <a href={resume.github} className="hover:text-blue-600">• GitHub</a>}
          {resume.portfolio && <a href={resume.portfolio} className="hover:text-blue-600">• Portfolio</a>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-2 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Experience
          </h2>
          {resume.experiences.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">{exp.title}</h3>
                  <p className="text-sm font-medium text-blue-600">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-zinc-600">
                  {exp.startDate && <div>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>}
                  {exp.location && <div>{exp.location}</div>}
                </div>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i} className="text-sm text-zinc-700">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          {resume.education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">{edu.school}</h3>
                  {edu.degree && <p className="text-sm text-zinc-700">{edu.degree}</p>}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <div className="text-sm text-zinc-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-2 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {resume.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Projects
          </h2>
          {resume.projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <h3 className="text-base font-semibold text-zinc-900">{proj.name}</h3>
              {proj.description && <p className="text-sm text-zinc-700 mt-1">{proj.description}</p>}
              {proj.techStack && <p className="text-sm text-blue-600 mt-1"><strong>Tech:</strong> {proj.techStack}</p>}
              {proj.outcome && <p className="text-sm text-zinc-700 mt-1"><strong>Outcome:</strong> {proj.outcome}</p>}
              {proj.link && (
                <a href={proj.link} className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                  {proj.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Certifications
          </h2>
          {resume.certifications.map(cert => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold text-zinc-900">{cert.name}</h3>
                {cert.year && <span className="text-sm text-zinc-600">{cert.year}</span>}
              </div>
              <p className="text-sm text-zinc-700">{cert.issuer}</p>
              {cert.link && <a href={cert.link} className="text-sm text-blue-600 hover:underline">Verify</a>}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Achievements & Awards
          </h2>
          {resume.achievements.map(ach => (
            <div key={ach.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold text-zinc-900">{ach.title}</h3>
                {ach.year && <span className="text-sm text-zinc-600">{ach.year}</span>}
              </div>
              {ach.description && <p className="text-sm text-zinc-700">{ach.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-2 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {resume.languages.map(lang => (
              <span key={lang.id} className="text-sm text-zinc-700">
                <strong>{lang.name}</strong> — {lang.proficiency}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {resume.publications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Publications
          </h2>
          {resume.publications.map(pub => (
            <div key={pub.id} className="mb-2">
              <h3 className="text-base font-semibold text-zinc-900">{pub.title}</h3>
              <p className="text-sm text-zinc-700">
                {pub.publisher && `${pub.publisher}`}
                {pub.year && ` (${pub.year})`}
              </p>
              {pub.link && <a href={pub.link} className="text-sm text-blue-600 hover:underline">View Publication</a>}
            </div>
          ))}
        </section>
      )}

      {/* Volunteer Experience */}
      {resume.volunteerExperiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
            Volunteer Experience
          </h2>
          {resume.volunteerExperiences.map(vol => (
            <div key={vol.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">{vol.role}</h3>
                  <p className="text-sm font-medium text-blue-600">{vol.organization}</p>
                </div>
                {(vol.startDate || vol.endDate) && (
                  <div className="text-sm text-zinc-600">
                    {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : 'Present'}
                  </div>
                )}
              </div>
              {vol.description && <p className="text-sm text-zinc-700">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
