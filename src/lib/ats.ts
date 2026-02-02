import { Resume } from './types'

const STOPWORDS = new Set(['the','and','a','to','of','in','for','with','on','as','is','by','an','or','at','that','this','these','those','be','have','has'])

function tokenize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => !STOPWORDS.has(w))
}

// Simple keyword extraction from job description (top N frequent tokens)
export function extractKeywords(jobDescription: string, topN = 20) {
  const tokens = tokenize(jobDescription)
  const counts: Record<string, number> = {}
  tokens.forEach(t => counts[t] = (counts[t] || 0) + 1)
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0, topN).map(x=>x[0])
}

// Score resume by matching keyword presence and give a weighted score
export function scoreResume(resume: Resume, jobDescription: string) {
  const keywords = extractKeywords(jobDescription, 50)
  const resumeText = [resume.summary || '', resume.experiences.map(e=>[e.title, e.company, ...e.bullets].join(' ')).join(' '), resume.education.map(ed=>ed.school).join(' '), resume.skills.join(' ')].join(' ')
  const resumeTokens = new Set(tokenize(resumeText))

  const matched: string[] = []
  let weightSum = 0
  let matchedWeight = 0

  // give higher weight to tokens appearing earlier (more frequent in JD)
  keywords.forEach((kw, idx) => {
    const weight = Math.max(1, (keywords.length - idx))
    weightSum += weight
    if (resumeTokens.has(kw)) {
      matched.push(kw)
      matchedWeight += weight
    }
  })

  const rawScore = weightSum ? (matchedWeight / weightSum) : 0
  const score = Math.round(rawScore * 100)
  return { score, matched }
}

export function suggestKeywordsFromJD(jobDescription: string, topN = 15) {
  return extractKeywords(jobDescription, topN)
}
