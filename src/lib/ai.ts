const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/complete'

type AIOptions = { model?: string }

async function callAnthropic(prompt: string, options?: AIOptions) {
  const key = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
  const model = options?.model || process.env.NEXT_PUBLIC_ANTHROPIC_MODEL || 'claude-2.1'
  if (!key) return null

  const body = {
    model,
    prompt,
    max_tokens_to_sample: 800,
    temperature: 0.2
  }

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Anthropic error: ${res.status} ${text}`)
  }
  const json = await res.json()
  // Claude returns `completion` text
  return json?.completion || null
}

async function callOpenAI(systemPrompt: string, userPrompt: string, options?: AIOptions) {
  const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  const model = options?.model || process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-4o-mini'
  if (!key) return null

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 800
  }

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenAI error: ${res.status} ${text}`)
  }
  const json = await res.json()
  const content = json?.choices?.[0]?.message?.content
  return content
}

// Top-level helper: prefer Anthropic/Claude if key present, otherwise OpenAI. Returns null if no API configured.
async function callAI(systemPrompt: string, userPrompt: string, options?: AIOptions) {
  // Try Anthropic first
  try {
    const anthropicKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
    if (anthropicKey) {
      // Format a simple prompt for Claude
      const prompt = `\nHuman: ${systemPrompt}\n${userPrompt}\nAssistant:`
      const out = await callAnthropic(prompt, options)
      if (out) return out
    }
  } catch (e) {
    console.warn('Anthropic call failed, falling back to OpenAI', e)
  }

  // Fallback to OpenAI
  try {
    const out = await callOpenAI(systemPrompt, userPrompt, options)
    return out
  } catch (e) {
    console.warn('OpenAI call failed', e)
    return null
  }
}

export async function rewriteBullets(bullets: string[]) {
  const system = 'You are a professional resume writer. Rewrite bullets to be concise, impact-focused, and ATS-friendly.'
  const user = `Rewrite these bullets into improved versions, keep same meaning and produce one bullet per line:\n${bullets.join('\n')}`
  const output = await callAI(system, user)
  if (!output) {
    // API key missing or call failed — return original bullets as fallback
    return bullets
  }
  return output.split('\n').map((s: string) => s.trim()).filter(Boolean)
}

export async function generateSummary(profileText: string) {
  const system = 'You are a professional resume writer.'
  const user = `Generate a 2-3 sentence professional summary for the following input:\n${profileText}`
  const output = await callAI(system, user)
  if (!output) return ''
  return output
}

export async function improveKeywords(resumeText: string, jobDescription: string) {
  const system = 'You are an ATS optimization assistant. Suggest keywords and short edits to improve relevance.'
  const user = `Given this resume:\n${resumeText}\n\nand this job description:\n${jobDescription}\n\nReturn a list of suggested keywords (comma separated) and 3 short edits to increase ATS relevance.`
  const output = await callAI(system, user)
  if (!output) return ''
  return output
}

export async function quantifyAchievements(bullets: string[]) {
  const system = 'You are a resume coach. Add quantification to achievements when possible.'
  const user = `Add quantification or measurable impact where reasonable for these bullets:\n${bullets.join('\n')}`
  const output = await callAI(system, user)
  if (!output) return bullets
  return output.split('\n').map((s: string) => s.trim()).filter(Boolean)
}

export async function extractKeywordsFromJob(jobDescription: string) {
  const system = 'You are an assistant that extracts important keywords from job descriptions.'
  const user = `Extract a comma-separated list of keywords and skills from the following job description:\n${jobDescription}`
  const output = await callAI(system, user)
  if (!output) return ''
  return output
}
