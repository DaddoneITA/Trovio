import { Lead, TimeFilter } from '@/lib/types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter,
  apiKey: string | null
): Promise<Lead[]> {
  const openaiKey = apiKey || process.env.OPENAI_API_KEY || null

  if (!openaiKey) {
    console.error('No OpenAI key found')
    return []
  }

  const timeLabel =
    timeFilter === '24h' ? 'last 24 hours' :
    timeFilter === 'week' ? 'last week' : 'last month'

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-search-preview',
      web_search_options: {},
      messages: [{
        role: 'user',
        content: `Search Reddit for people looking to hire or needing help with "${query}" posted in the ${timeLabel}. Search in: ${subreddits.join(', ')}. Return ONLY a valid JSON array, no markdown. Each object: id (string), title (string), url (full reddit URL), subreddit (string), author (string), body (max 200 chars), createdAt (unix timestamp), isNew (boolean). Find 8-15 results.`
      }]
    })
  })

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const start = clean.indexOf('[')
    const end = clean.lastIndexOf(']')
    if (start === -1 || end === -1) return []
    return JSON.parse(clean.substring(start, end + 1))
  } catch {
    console.error('Parse error:', text)
    return []
  }
}