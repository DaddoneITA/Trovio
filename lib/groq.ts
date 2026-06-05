import { Lead } from '@/lib/types'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama3-8b-8192'

type EnrichedLead = {
  id: string
  intent: 'HIGH' | 'MEDIUM' | 'LOW'
  score: number
  score_reason: string
  category: string
  client_type: 'freelance' | 'agency' | 'business'
  summary: string
  keywords: string[]
  outreach_message: string
}

function buildBatchPrompt(leads: Lead[]): string {
  const items = leads
    .map(
      (l, i) =>
        `[${i}] ID: ${l.id}\nTitle: ${l.title}\nBody: ${l.body?.substring(0, 300)}\nSubreddit: r/${l.subreddit}`
    )
    .join('\n\n')

  return `You are a lead scoring engine for a SaaS tool that helps freelancers find clients on Reddit.

Analyze each Reddit post below and return a JSON array. Each object must have exactly these fields:
- id: the post ID (string)
- intent: "HIGH" | "MEDIUM" | "LOW" (HIGH = clear buying intent, MEDIUM = need present but not urgent, LOW = informational)
- score: number 0-100 (commercial value for a freelancer)
- score_reason: 1 sentence explaining the score
- category: main service category needed (e.g. "web development", "SEO", "copywriting", "design")
- client_type: "freelance" | "agency" | "business"
- summary: 1 sentence describing the problem
- keywords: array of 3-5 relevant keywords
- outreach_message: a natural, non-salesy Reddit DM (3-4 lines) personalized to this specific post

Return ONLY a valid JSON array, no markdown, no explanation.

Posts:
${items}`
}

export async function enrichLeadsWithGroq(leads: Lead[]): Promise<Lead[]> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.warn('GROQ_API_KEY not set, skipping AI enrichment')
    return leads
  }

  if (leads.length === 0) return leads

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: buildBatchPrompt(leads),
          },
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      console.error(`Groq API error: ${response.status}`)
      return leads
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content || ''

    const cleaned = raw.replace(/```json|```/g, '').trim()
    const enriched: EnrichedLead[] = JSON.parse(cleaned)

    const enrichedMap = new Map(enriched.map((e) => [e.id, e]))

    return leads.map((lead) => {
      const ai = enrichedMap.get(lead.id)
      if (!ai) return lead
      return {
        ...lead,
        intent: ai.intent,
        score: ai.score,
        score_reason: ai.score_reason,
        category: ai.category,
        client_type: ai.client_type,
        summary: ai.summary,
        keywords: ai.keywords,
        outreach_message: ai.outreach_message,
      }
    })
  } catch (error) {
    console.error('Groq enrichment error:', error)
    return leads
  }
}
