import { Resume } from './types'

/**
 * Parse uploaded resume file (TXT, PDF text extraction, or JSON)
 * Returns a partial Resume object
 */
export async function parseResumeFile(file: File): Promise<Partial<Resume>> {
  const fileName = file.name.toLowerCase()
  
  try {
    if (fileName.endsWith('.json')) {
      const text = await file.text()
      const data = JSON.parse(text)
      return data as Partial<Resume>
    }
    
    if (fileName.endsWith('.txt')) {
      const text = await file.text()
      return parseResumeText(text)
    }
    
    // For PDF, we'd need a library like pdf-parse (server-side) or pdf.js
    // For now, just return empty structure
    throw new Error('PDF parsing requires server-side processing. Please use TXT or JSON format.')
  } catch (error) {
    console.error('Resume parsing error:', error)
    throw new Error('Failed to parse resume file. Supported formats: JSON, TXT')
  }
}

/**
 * Simple text-based resume parser
 * Attempts to extract structured data from plain text
 */
function parseResumeText(text: string): Partial<Resume> {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  
  const resume: Partial<Resume> = {
    experiences: [],
    education: [],
    skills: [],
    projects: []
  }
  
  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/)
  if (emailMatch) resume.email = emailMatch[0]
  
  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
  if (phoneMatch) resume.phone = phoneMatch[0]
  
  // Try to extract name (usually first line)
  if (lines[0] && lines[0].length < 50 && !lines[0].includes('@')) {
    resume.name = lines[0]
  }
  
  // Look for skills section
  const skillsIndex = lines.findIndex(l => 
    /^(skills?|technical skills?|core competencies?):/i.test(l)
  )
  if (skillsIndex !== -1 && lines[skillsIndex + 1]) {
    const skillsText = lines[skillsIndex + 1]
    resume.skills = skillsText.split(/[,;|]/).map(s => s.trim()).filter(Boolean)
  }
  
  // Extract summary (look for "summary" or "profile" section)
  const summaryIndex = lines.findIndex(l => 
    /^(summary|profile|professional summary|about):/i.test(l)
  )
  if (summaryIndex !== -1) {
    let summary = ''
    for (let i = summaryIndex + 1; i < lines.length; i++) {
      if (lines[i] && !/^(experience|education|skills)/i.test(lines[i])) {
        summary += lines[i] + ' '
      } else {
        break
      }
    }
    resume.summary = summary.trim()
  }
  
  return resume
}

/**
 * Export resume to JSON file
 */
export function exportToJSON(resume: Resume): void {
  const dataStr = JSON.stringify(resume, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${resume.name.replace(/\s+/g, '_')}_resume.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export resume to plain text format
 */
export function exportToText(resume: Resume): void {
  let text = `${resume.name}\n`
  if (resume.email) text += `${resume.email} | `
  if (resume.phone) text += `${resume.phone} | `
  if (resume.location) text += resume.location
  text += '\n\n'
  
  if (resume.summary) {
    text += `PROFESSIONAL SUMMARY\n${resume.summary}\n\n`
  }
  
  if (resume.experiences.length > 0) {
    text += `EXPERIENCE\n\n`
    resume.experiences.forEach(exp => {
      text += `${exp.title} — ${exp.company}\n`
      if (exp.startDate || exp.endDate) {
        text += `${exp.startDate || ''} to ${exp.endDate || 'Present'}\n`
      }
      if (exp.location) text += `${exp.location}\n`
      exp.bullets.forEach(bullet => {
        text += `• ${bullet}\n`
      })
      text += '\n'
    })
  }
  
  if (resume.education.length > 0) {
    text += `EDUCATION\n\n`
    resume.education.forEach(edu => {
      text += `${edu.school}`
      if (edu.degree) text += ` — ${edu.degree}`
      text += '\n'
      if (edu.startDate || edu.endDate) {
        text += `${edu.startDate || ''} to ${edu.endDate || ''}\n`
      }
      text += '\n'
    })
  }
  
  if (resume.skills.length > 0) {
    text += `SKILLS\n${resume.skills.join(', ')}\n\n`
  }
  
  if (resume.projects.length > 0) {
    text += `PROJECTS\n\n`
    resume.projects.forEach(proj => {
      text += `${proj.name}\n`
      if (proj.description) text += `${proj.description}\n`
      if (proj.link) text += `${proj.link}\n`
      text += '\n'
    })
  }
  
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${resume.name.replace(/\s+/g, '_')}_resume.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
