import React from 'react'
import { Resume } from '../../lib/types'
import { formatDate } from '../../lib/utils'

export default function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="bg-white p-8 max-w-[8.5in] mx-auto font-serif" style={{ minHeight: '11in' }}>
      <div className="text-center border-b-2 border-zinc-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">{resume.name}</h1>
        <div className="text-sm text-zinc-700">{[resume.email, resume.phone, resume.location].filter(Boolean).join(' • ')}</div>
      </div>
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-zinc-900 mb-2 uppercase">Objective</h2>
          <p className="text-sm text-zinc-800 leading-relaxed">{resume.summary}</p>
        </section>
      )}
      {resume.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-zinc-900 mb-3 uppercase">Professional Experience</h2>
          {resume.experiences.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="mb-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold text-zinc-900">{exp.title}</h3>
                  <span className="text-sm text-zinc-700">{exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`}</span>
                </div>
                <p className="text-sm italic text-zinc-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i} className="text-sm text-zinc-800">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-zinc-900 mb-3 uppercase">Education</h2>
          {resume.education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-base font-bold text-zinc-900">{edu.school}</h3>
                  {edu.degree && <p className="text-sm text-zinc-800">{edu.degree}</p>}
                </div>
                {(edu.startDate || edu.endDate) && <span className="text-sm text-zinc-700">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>}
              </div>
            </div>
          ))}
        </section>
      )}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-zinc-900 mb-2 uppercase">Skills & Qualifications</h2>
          <p className="text-sm text-zinc-800">{resume.skills.join(', ')}</p>
        </section>
      )}
      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-zinc-900 mb-3 uppercase">Notable Projects</h2>
          {resume.projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <h3 className="text-base font-bold text-zinc-900">{proj.name}</h3>
              {proj.description && <p className="text-sm text-zinc-800 mt-1">{proj.description}</p>}
              {proj.link && <a href={proj.link} className="text-sm text-zinc-700 underline mt-1 inline-block">{proj.link}</a>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
