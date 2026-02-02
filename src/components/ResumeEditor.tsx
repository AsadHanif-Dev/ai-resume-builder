"use client"
import React, { useEffect, useState } from 'react'
import { useResumeStore } from '../lib/store'
import { rewriteBullets, generateSummary, extractKeywordsFromJob, improveKeywords } from '../lib/ai'
import { scoreResume, suggestKeywordsFromJD } from '../lib/ats'
import EditsModal from './EditsModal'
import { exportToPdf } from '../lib/export'

function uid(prefix='id') { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}` }

export default function ResumeEditor() {
  const resume = useResumeStore(s => s.resume)
  const setResume = useResumeStore(s => s.setResume)
  const addExperience = useResumeStore(s => s.addExperience)
  const updateExperience = useResumeStore(s => s.updateExperience)
  const removeExperience = useResumeStore(s => s.removeExperience)
  const addEducation = useResumeStore(s => s.addEducation)
  const updateEducation = useResumeStore(s => s.updateEducation)
  const removeEducation = useResumeStore(s => s.removeEducation)
  const addProject = useResumeStore(s => s.addProject)
  const updateProject = useResumeStore(s => s.updateProject)
  const removeProject = useResumeStore(s => s.removeProject)
  const addCertification = useResumeStore(s => s.addCertification)
  const updateCertification = useResumeStore(s => s.updateCertification)
  const removeCertification = useResumeStore(s => s.removeCertification)
  const addAchievement = useResumeStore(s => s.addAchievement)
  const updateAchievement = useResumeStore(s => s.updateAchievement)
  const removeAchievement = useResumeStore(s => s.removeAchievement)
  const addLanguage = useResumeStore(s => s.addLanguage)
  const updateLanguage = useResumeStore(s => s.updateLanguage)
  const removeLanguage = useResumeStore(s => s.removeLanguage)
  const addPublication = useResumeStore(s => s.addPublication)
  const updatePublication = useResumeStore(s => s.updatePublication)
  const removePublication = useResumeStore(s => s.removePublication)
  const addVolunteerExperience = useResumeStore(s => s.addVolunteerExperience)
  const updateVolunteerExperience = useResumeStore(s => s.updateVolunteerExperience)
  const removeVolunteerExperience = useResumeStore(s => s.removeVolunteerExperience)
  const saveToLocal = useResumeStore(s => s.saveToLocal)
  const loadFromLocal = useResumeStore(s => s.loadFromLocal)

  useEffect(() => { loadFromLocal() }, [])

  const [loadingAI, setLoadingAI] = useState(false)
  // Detect configured AI provider (build-time env var inlined)
  const hasAnthropic = Boolean(process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY)
  const hasOpenAI = Boolean(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
  const provider = hasAnthropic ? 'Anthropic (Claude)' : hasOpenAI ? 'OpenAI' : null

  async function onGenerateSummary() {
    if (!provider) return alert('AI is disabled. Add NEXT_PUBLIC_ANTHROPIC_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY to enable AI helpers.')
    setLoadingAI(true)
    try {
      const out = await generateSummary([resume.name, resume.summary, resume.skills.join(', ')].join('\n'))
      setResume({ summary: out })
    } catch (e) { console.error(e) }
    setLoadingAI(false)
  }

  async function onRewriteFirstExperienceBullets() {
    if (!resume.experiences[0]) return
    if (!provider) return alert('AI is disabled. Add NEXT_PUBLIC_ANTHROPIC_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY to enable AI helpers.')
    setLoadingAI(true)
    try {
      const newBullets = await rewriteBullets(resume.experiences[0].bullets)
      updateExperience(resume.experiences[0].id, { bullets: newBullets })
    } catch (e) { console.error(e) }
    setLoadingAI(false)
  }

  // Job description analysis
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<{ score?: number; matched?: string[]; suggestedKeywords?: string[]; aiKeywords?: string; suggestedEdits?: string } | null>(null)
  const [editsOpen, setEditsOpen] = useState(false)

  async function analyzeJob() {
    if (!jobDescription.trim()) return alert('Paste a job description to analyze')
    // Local keyword extraction + scoring
    const localKeywords = suggestKeywordsFromJD(jobDescription, 20)
    const { score, matched } = scoreResume(resume, jobDescription)
    setAnalysis({ score, matched, suggestedKeywords: localKeywords })

    if (!provider) return

    setLoadingAI(true)
    try {
      const aiKeywords = await extractKeywordsFromJob(jobDescription)
      const edits = await improveKeywords(JSON.stringify(resume), jobDescription)
      setAnalysis({ score, matched, suggestedKeywords: localKeywords, aiKeywords, suggestedEdits: edits })
    } catch (e) {
      console.error(e)
    }
    setLoadingAI(false)
  }

  const sampleJD = `We are seeking a Senior Frontend Engineer with 5+ years of experience building React applications. Required skills: TypeScript, React, Next.js, Tailwind CSS, accessibility, performance optimization. Experience with state management (Zustand, Redux), testing, and CI/CD. Responsibilities include building features, collaborating with designers, and optimizing for SEO and accessibility.`

  function applyKeywordsToSkills() {
    if (!analysis?.suggestedKeywords?.length) return alert('No suggested keywords to apply')
    const merged = Array.from(new Set([...resume.skills, ...(analysis.suggestedKeywords || [])]))
    setResume({ skills: merged })
    alert('Keywords added to skills')
  }

  function applyEditsToResume(selected: string[]) {
    if (!selected || selected.length === 0) return
    // If user has a summary, replace it with the first selected edit and append others as new bullets
    if (resume.summary && resume.summary.trim().length > 0) {
      setResume({ summary: selected.join('\n\n') })
      alert('Applied edits to summary')
      return
    }
    // Otherwise, append edits as bullets to first experience (or create one)
    if (!resume.experiences[0]) {
      const id = uid('exp')
      addExperience({ id, title: 'Edited Role', company: '', bullets: selected })
      alert('Created experience with suggested edits')
      return
    }
    const target = resume.experiences[0]
    updateExperience(target.id, { bullets: [...target.bullets, ...selected] })
    alert('Applied edits as bullets to first experience')
  }

  return (
    <div className="space-y-6">
      <div className="p-3 rounded bg-yellow-50 dark:bg-yellow-900/30 border">
        <strong className="mr-2">AI:</strong>
        {provider ? (
          <span>{provider} configured — AI helpers available</span>
        ) : (
          <span>Disabled — add `NEXT_PUBLIC_ANTHROPIC_API_KEY` or `NEXT_PUBLIC_OPENAI_API_KEY` to enable in-browser AI helpers.</span>
        )}
      </div>
      
      {/* Header / Personal Information */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <h3 className="text-lg font-semibold mb-4">1️⃣ Header / Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={resume.name} onChange={e=>setResume({name:e.target.value})} className="border rounded p-2" placeholder="Full name *" />
          <input value={resume.professionalTitle || ''} onChange={e=>setResume({professionalTitle:e.target.value})} className="border rounded p-2" placeholder="Professional Title (e.g., Senior Software Engineer)" />
          <input value={resume.email || ''} onChange={e=>setResume({email:e.target.value})} className="border rounded p-2" placeholder="Email *" />
          <input value={resume.phone || ''} onChange={e=>setResume({phone:e.target.value})} className="border rounded p-2" placeholder="Phone" />
          <input value={resume.location || ''} onChange={e=>setResume({location:e.target.value})} className="border rounded p-2" placeholder="City, Country" />
          <input value={resume.linkedin || ''} onChange={e=>setResume({linkedin:e.target.value})} className="border rounded p-2" placeholder="LinkedIn URL" />
          <input value={resume.portfolio || ''} onChange={e=>setResume({portfolio:e.target.value})} className="border rounded p-2" placeholder="Portfolio URL" />
          <input value={resume.github || ''} onChange={e=>setResume({github:e.target.value})} className="border rounded p-2" placeholder="GitHub URL" />
        </div>
      </section>

      {/* Professional Summary */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <h3 className="text-lg font-semibold mb-4">2️⃣ Professional Summary</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">3-4 lines: Career focus + key skills + years of experience + target role</p>
        <textarea value={resume.summary} onChange={e=>setResume({summary:e.target.value})} className="w-full border rounded p-2 h-24" placeholder="e.g., Experienced Full-Stack Developer with 5+ years building scalable web applications..." />
        <div className="mt-2 flex gap-2">
          <button onClick={onGenerateSummary} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" disabled={loadingAI}>{loadingAI? 'AI...' : '✨ Generate with AI'}</button>
          <button onClick={() => { setResume({ summary: '' }) }} className="px-3 py-1 rounded border hover:bg-zinc-100 dark:hover:bg-zinc-700">Clear</button>
        </div>
      </section>

      {/* Skills */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <h3 className="text-lg font-semibold mb-4">3️⃣ Skills</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Separate with commas. Group by: Technical Skills, Tools & Frameworks, Soft Skills</p>
        <input value={resume.skills.join(', ')} onChange={e=>setResume({ skills: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} className="w-full border rounded p-2" placeholder="React, TypeScript, Node.js, Problem Solving, Team Leadership" />
      </section>

      {/* Work Experience */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">4️⃣ Work Experience</h3>
          <div className="flex gap-2">
            <button onClick={() => addExperience({ id: uid('exp'), title: '', company: '', location: '', startDate: '', endDate: '', bullets: [] })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Experience</button>
            <button onClick={onRewriteFirstExperienceBullets} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700" disabled={loadingAI}>✨ Rewrite bullets (AI)</button>
          </div>
        </div>
        <div className="space-y-4">
          {resume.experiences.map(exp => (
            <div key={exp.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
              <div className="grid md:grid-cols-2 gap-2 mb-2">
                <input value={exp.title} onChange={e=>updateExperience(exp.id, { title: e.target.value })} className="border rounded p-2" placeholder="Job Title *" />
                <input value={exp.company} onChange={e=>updateExperience(exp.id, { company: e.target.value })} className="border rounded p-2" placeholder="Company *" />
                <input value={exp.location || ''} onChange={e=>updateExperience(exp.id, { location: e.target.value })} className="border rounded p-2" placeholder="Location" />
                <div className="flex gap-2">
                  <input value={exp.startDate || ''} onChange={e=>updateExperience(exp.id, { startDate: e.target.value })} className="border rounded p-2 flex-1" placeholder="Start (e.g., Jan 2022)" />
                  <input value={exp.endDate || ''} onChange={e=>updateExperience(exp.id, { endDate: e.target.value })} className="border rounded p-2 flex-1" placeholder="End (or Present)" />
                </div>
              </div>
              <textarea value={exp.bullets.join('\n')} onChange={e=>updateExperience(exp.id, { bullets: e.target.value.split('\n').filter(b => b.trim()) })} className="w-full border rounded p-2 h-32" placeholder="Bullet points - one per line&#10;• Start with action verbs&#10;• Quantify achievements when possible&#10;• Focus on impact and results" />
              <button onClick={() => removeExperience(exp.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
            </div>
          ))}
          {resume.experiences.length === 0 && <p className="text-zinc-500 text-center py-4">No experiences added yet</p>}
        </div>
      </section>

      {/* Projects */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">5️⃣ Projects</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Important for juniors & tech roles</p>
          </div>
          <button onClick={() => addProject({ id: uid('proj'), name: '', description: '', techStack: '', outcome: '', link: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Project</button>
        </div>
        <div className="space-y-4">
          {resume.projects.map(proj => (
            <div key={proj.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
              <input value={proj.name} onChange={e=>updateProject(proj.id, { name: e.target.value })} className="w-full border rounded p-2 mb-2" placeholder="Project Name *" />
              <textarea value={proj.description || ''} onChange={e=>updateProject(proj.id, { description: e.target.value })} className="w-full border rounded p-2 h-20 mb-2" placeholder="Description - What does it do?" />
              <input value={proj.techStack || ''} onChange={e=>updateProject(proj.id, { techStack: e.target.value })} className="w-full border rounded p-2 mb-2" placeholder="Tech Stack (e.g., React, Node.js, MongoDB)" />
              <input value={proj.outcome || ''} onChange={e=>updateProject(proj.id, { outcome: e.target.value })} className="w-full border rounded p-2 mb-2" placeholder="Outcome (e.g., 1000+ users, Featured on Product Hunt)" />
              <input value={proj.link || ''} onChange={e=>updateProject(proj.id, { link: e.target.value })} className="w-full border rounded p-2 mb-2" placeholder="Link (GitHub, Live Demo)" />
              <button onClick={() => removeProject(proj.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
            </div>
          ))}
          {resume.projects.length === 0 && <p className="text-zinc-500 text-center py-4">No projects added yet</p>}
        </div>
      </section>

      {/* Education */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">6️⃣ Education</h3>
          <button onClick={() => addEducation({ id: uid('edu'), school: '', degree: '', startDate: '', endDate: '', gpa: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Education</button>
        </div>
        <div className="space-y-4">
          {resume.education.map(edu => (
            <div key={edu.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
              <div className="grid md:grid-cols-2 gap-2">
                <input value={edu.school} onChange={e=>updateEducation(edu.id, { school: e.target.value })} className="border rounded p-2" placeholder="Institution *" />
                <input value={edu.degree || ''} onChange={e=>updateEducation(edu.id, { degree: e.target.value })} className="border rounded p-2" placeholder="Degree (e.g., BS Computer Science)" />
                <input value={edu.startDate || ''} onChange={e=>updateEducation(edu.id, { startDate: e.target.value })} className="border rounded p-2" placeholder="Start Year" />
                <input value={edu.endDate || ''} onChange={e=>updateEducation(edu.id, { endDate: e.target.value })} className="border rounded p-2" placeholder="Graduation Year" />
                <input value={edu.gpa || ''} onChange={e=>updateEducation(edu.id, { gpa: e.target.value })} className="border rounded p-2" placeholder="GPA (optional)" />
              </div>
              <button onClick={() => removeEducation(edu.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
            </div>
          ))}
          {resume.education.length === 0 && <p className="text-zinc-500 text-center py-4">No education added yet</p>}
        </div>
      </section>

      {/* Certifications */}
      <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">7️⃣ Certifications</h3>
          <button onClick={() => addCertification({ id: uid('cert'), name: '', issuer: '', year: '', link: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Certification</button>
        </div>
        <div className="space-y-4">
          {resume.certifications.map(cert => (
            <div key={cert.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
              <div className="grid md:grid-cols-3 gap-2">
                <input value={cert.name} onChange={e=>updateCertification(cert.id, { name: e.target.value })} className="border rounded p-2" placeholder="Certification Name *" />
                <input value={cert.issuer} onChange={e=>updateCertification(cert.id, { issuer: e.target.value })} className="border rounded p-2" placeholder="Issuer *" />
                <input value={cert.year || ''} onChange={e=>updateCertification(cert.id, { year: e.target.value })} className="border rounded p-2" placeholder="Year" />
              </div>
              <input value={cert.link || ''} onChange={e=>updateCertification(cert.id, { link: e.target.value })} className="w-full border rounded p-2 mt-2" placeholder="Verification Link (optional)" />
              <button onClick={() => removeCertification(cert.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
            </div>
          ))}
          {resume.certifications.length === 0 && <p className="text-zinc-500 text-center py-4">No certifications added yet</p>}
        </div>
      </section>

      {/* Optional Sections */}
      <div className="border-t-2 pt-6">
        <h2 className="text-xl font-bold mb-4">⭐ Optional / Advanced Sections</h2>
        
        {/* Achievements / Awards */}
        <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">8️⃣ Achievements / Awards</h3>
            <button onClick={() => addAchievement({ id: uid('ach'), title: '', description: '', year: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Achievement</button>
          </div>
          <div className="space-y-4">
            {resume.achievements.map(ach => (
              <div key={ach.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
                <div className="grid md:grid-cols-2 gap-2">
                  <input value={ach.title} onChange={e=>updateAchievement(ach.id, { title: e.target.value })} className="border rounded p-2" placeholder="Achievement Title *" />
                  <input value={ach.year || ''} onChange={e=>updateAchievement(ach.id, { year: e.target.value })} className="border rounded p-2" placeholder="Year" />
                </div>
                <textarea value={ach.description || ''} onChange={e=>updateAchievement(ach.id, { description: e.target.value })} className="w-full border rounded p-2 mt-2 h-20" placeholder="Description" />
                <button onClick={() => removeAchievement(ach.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">9️⃣ Languages</h3>
            <button onClick={() => addLanguage({ id: uid('lang'), name: '', proficiency: 'Professional' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Language</button>
          </div>
          <div className="space-y-4">
            {resume.languages.map(lang => (
              <div key={lang.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
                <div className="grid md:grid-cols-2 gap-2">
                  <input value={lang.name} onChange={e=>updateLanguage(lang.id, { name: e.target.value })} className="border rounded p-2" placeholder="Language *" />
                  <select value={lang.proficiency} onChange={e=>updateLanguage(lang.id, { proficiency: e.target.value })} className="border rounded p-2">
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
                <button onClick={() => removeLanguage(lang.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">🔟 Publications</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">For academic roles</p>
            </div>
            <button onClick={() => addPublication({ id: uid('pub'), title: '', publisher: '', year: '', link: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Publication</button>
          </div>
          <div className="space-y-4">
            {resume.publications.map(pub => (
              <div key={pub.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
                <input value={pub.title} onChange={e=>updatePublication(pub.id, { title: e.target.value })} className="w-full border rounded p-2 mb-2" placeholder="Publication Title *" />
                <div className="grid md:grid-cols-2 gap-2">
                  <input value={pub.publisher || ''} onChange={e=>updatePublication(pub.id, { publisher: e.target.value })} className="border rounded p-2" placeholder="Publisher / Conference" />
                  <input value={pub.year || ''} onChange={e=>updatePublication(pub.id, { year: e.target.value })} className="border rounded p-2" placeholder="Year" />
                </div>
                <input value={pub.link || ''} onChange={e=>updatePublication(pub.id, { link: e.target.value })} className="w-full border rounded p-2 mt-2" placeholder="Link (DOI, arXiv, etc.)" />
                <button onClick={() => removePublication(pub.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer Experience */}
        <section className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">1️⃣1️⃣ Volunteer Experience</h3>
            <button onClick={() => addVolunteerExperience({ id: uid('vol'), role: '', organization: '', startDate: '', endDate: '', description: '' })} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">+ Add Volunteer Work</button>
          </div>
          <div className="space-y-4">
            {resume.volunteerExperiences.map(vol => (
              <div key={vol.id} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
                <div className="grid md:grid-cols-2 gap-2 mb-2">
                  <input value={vol.role} onChange={e=>updateVolunteerExperience(vol.id, { role: e.target.value })} className="border rounded p-2" placeholder="Role *" />
                  <input value={vol.organization} onChange={e=>updateVolunteerExperience(vol.id, { organization: e.target.value })} className="border rounded p-2" placeholder="Organization *" />
                  <input value={vol.startDate || ''} onChange={e=>updateVolunteerExperience(vol.id, { startDate: e.target.value })} className="border rounded p-2" placeholder="Start Date" />
                  <input value={vol.endDate || ''} onChange={e=>updateVolunteerExperience(vol.id, { endDate: e.target.value })} className="border rounded p-2" placeholder="End Date" />
                </div>
                <textarea value={vol.description || ''} onChange={e=>updateVolunteerExperience(vol.id, { description: e.target.value })} className="w-full border rounded p-2 h-20" placeholder="Description of your volunteer work" />
                <button onClick={() => removeVolunteerExperience(vol.id)} className="mt-2 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950">Remove</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h4 className="font-medium">Job description (paste to analyze)</h4>
        <textarea value={jobDescription} onChange={e=>setJobDescription(e.target.value)} className="w-full border rounded p-2 h-36" placeholder="Paste job description here" />
        <div className="mt-2 flex gap-2">
          <button onClick={analyzeJob} className="px-3 py-1 rounded bg-emerald-600 text-white" disabled={loadingAI}>{loadingAI? 'Analyzing...' : 'Analyze'}</button>
          <button onClick={applyKeywordsToSkills} className="px-3 py-1 rounded border">Apply keywords to skills</button>
          <button onClick={() => { setJobDescription(sampleJD); analyzeJob() }} className="px-3 py-1 rounded border">Fill demo JD & Analyze</button>
          {analysis?.suggestedEdits && (
            <button onClick={()=>setEditsOpen(true)} className="px-3 py-1 rounded bg-indigo-600 text-white">View suggested edits</button>
          )}
        </div>

        {analysis && (
          <div className="mt-3 p-3 border rounded bg-white dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <div>ATS score: <strong>{analysis.score}</strong></div>
              <div>Matched: <strong>{analysis.matched?.slice(0,8).join(', ') || '—'}</strong></div>
            </div>
            <div className="mt-2">Suggested keywords: {analysis.suggestedKeywords?.slice(0,20).join(', ')}</div>
            {analysis.aiKeywords && <div className="mt-2 text-sm text-zinc-600">AI keywords: {analysis.aiKeywords}</div>}
            {analysis.suggestedEdits && <div className="mt-2 text-sm">Suggested edits available</div>}
          </div>
        )}
      </section>

      <div className="flex gap-2">
        <button onClick={saveToLocal} className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
        <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(resume)); }} className="px-4 py-2 rounded border">Copy JSON</button>
        <button onClick={async () => {
          const el = document.getElementById('resume-preview')
          if (!el) return alert('Preview element not found')
          try {
            await exportToPdf(el as HTMLElement, `${resume.name || 'resume'}.pdf`)
          } catch (err) {
            console.error(err)
            alert('Failed to export PDF. See console for details.')
          }
        }} className="px-4 py-2 rounded bg-blue-600 text-white">Export PDF</button>
      </div>
      <EditsModal open={editsOpen} onClose={()=>setEditsOpen(false)} edits={(analysis?.suggestedEdits || '').split('\n').map(s=>s.trim()).filter(Boolean)} onApply={applyEditsToResume} />
    </div>
  )
}
