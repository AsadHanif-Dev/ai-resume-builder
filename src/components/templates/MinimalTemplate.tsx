import React from 'react'
import { Resume } from '../../lib/types'
import { formatDate } from '../../lib/utils'

export default function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-8 max-w-[8.5in] mx-auto" style={{ minHeight: '11in' }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-zinc-900 mb-2">{resume.name}</h1>
        <div className="flex justify-center gap-3 text-sm text-zinc-600">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>|</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>|</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>
      {resume.summary && (
        <section className="mb-6">
          <p className="text-sm text-zinc-700 text-center italic">{resume.summary}</p>
        </section>
      )}
      {resume.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-widest">Experience</h2>
          {resume.experiences.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-zinc-900">{exp.title}</h3>
                <span className="text-sm text-zinc-600">{exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`}</span>
              </div>
              <p className="text-sm text-zinc-600 italic mb-2">{exp.company}{exp.location && ` • ${exp.location}`}</p>
              {exp.bullets.length > 0 && (
                <ul className="space-y-1">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i} className="text-sm text-zinc-700 pl-4 before:content-['–'] before:absolute before:left-0">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-widest">Education</h2>
          {resume.education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-base font-medium text-zinc-900">{edu.school}</h3>
                  {edu.degree && <p className="text-sm text-zinc-600">{edu.degree}</p>}
                </div>
                {(edu.startDate || edu.endDate) && <span className="text-sm text-zinc-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>}
              </div>
            </div>
          ))}
        </section>
      )}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-widest">Skills</h2>
          <p className="text-sm text-zinc-700">{resume.skills.join(' • ')}</p>
        </section>
      )}
      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-widest">Projects</h2>
          {resume.projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <h3 className="text-base font-medium text-zinc-900">{proj.name}</h3>
              {proj.description && <p className="text-sm text-zinc-700 mt-1">{proj.description}</p>}
              {proj.link && <a href={proj.link} className="text-sm text-zinc-600 hover:text-zinc-900 mt-1 inline-block">{proj.link}</a>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
