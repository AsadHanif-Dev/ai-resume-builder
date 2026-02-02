import { NextRequest, NextResponse } from 'next/server'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

// Server-side only - API key never exposed to client
export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()
    
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    let systemPrompt = ''
    let userPrompt = ''

    switch (action) {
      case 'rewrite-bullets':
        systemPrompt = 'You are a professional resume writer. Rewrite resume bullets to be concise, impact-focused, quantified, and ATS-friendly. Use strong action verbs. Focus on achievements and results.'
        userPrompt = `Rewrite these resume bullets into improved versions. Keep the same meaning but make them more impactful. Produce one bullet per line:\n\n${data.bullets.join('\n')}`
        break

      case 'generate-summary':
        systemPrompt = 'You are a professional resume writer. Generate compelling professional summaries that highlight key strengths and achievements.'
        userPrompt = `Generate a 2-3 sentence professional summary based on this information:\n\nName: ${data.name}\nRole: ${data.role || 'Professional'}\nSkills: ${data.skills}\nExperience highlights: ${data.experience || 'Various professional experiences'}`
        break

      case 'extract-keywords':
        systemPrompt = 'You are an ATS optimization expert. Extract the most important keywords and skills from job descriptions.'
        userPrompt = `Extract a comma-separated list of the top 15-20 most important keywords, skills, and qualifications from this job description:\n\n${data.jobDescription}`
        break

      case 'tailor-resume':
        systemPrompt = 'You are an ATS resume optimization expert. Suggest specific improvements to tailor a resume for a job description.'
        userPrompt = `Given this resume:\n${JSON.stringify(data.resume, null, 2)}\n\nAnd this job description:\n${data.jobDescription}\n\nProvide 5-7 specific suggestions to improve ATS match. Format as numbered list.`
        break

      case 'quantify-achievements':
        systemPrompt = 'You are a resume coach specializing in quantifying achievements. Add specific metrics, percentages, or numbers where reasonable and impactful.'
        userPrompt = `Add quantification and measurable impact to these resume bullets. If specific numbers aren\'t provided, suggest realistic ranges:\n\n${data.bullets.join('\n')}`
        break

      case 'improve-bullet':
        systemPrompt = 'You are a resume writing expert. Improve a single resume bullet to be more impactful, quantified, and ATS-friendly.'
        userPrompt = `Improve this resume bullet:\n\n"${data.bullet}"\n\nMake it more impactful, add quantification if possible, use strong action verbs, and focus on results. Return only the improved bullet.`
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      return NextResponse.json(
        { error: 'AI service error' },
        { status: response.status }
      )
    }

    const result = await response.json()
    const content = result.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      )
    }

    return NextResponse.json({ result: content })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
