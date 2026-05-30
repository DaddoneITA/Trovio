import { Lead, TimeFilter } from './types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter
): Promise<Lead[]> {
  const openaiKey = process.env.OPENAI_API_KEY

  if (!openaiKey) {
    console.error('No OpenAI key found')
    return []
  }

  const timeLabel = timeFilter === '24h' ? 'last 24 hours' : timeFilter === 'week' ? 'last week' : 'last month'

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-search-preview',
      messages: [
        {
          role: 'user',
          content: `Search Reddit for people looking to hire or needing help with "${query}" posted in the ${timeLabel}. Search in these subreddits: ${subreddits.join(', ')}. Return ONLY a valid JSON array, no markdown. Each object must have: id (string), title (string), url (full reddit URL), subreddit (string), author (string), body (brief description max 200 chars), createdAt (unix timestamp approximate), isNew (boolean, true if posted in last 24h). Find 8-15 real results.`
        }
      ],
      web_search_options: {}
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