import { Lead, TimeFilter } from '@/lib/types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter,
  apiKey: string | null
): Promise<Lead[]> {
  const serpKey = process.env.SERPAPI_KEY
  if (!serpKey) {
    console.error('No SerpAPI key found')
    return []
  }

  const fullQuery = `site:reddit.com ${query}`
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(fullQuery)}&tbs=qdr:y&num=20&api_key=${serpKey}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    console.error(`SerpAPI error: ${res.status}`)
    return []
  }

  const data = await res.json()
  const results = data.organic_results || []
  console.log(`SerpAPI: found ${results.length} results`)

  const now = Date.now() / 1000
  const timeThreshold: Record<TimeFilter, number> = {
    '24h': now - 86400,
    week: now - 604800,
    month: now - 2592000,
  }

  const leads: Lead[] = []

  for (const item of results) {
    if (!item.link?.includes('reddit.com')) continue

    const subredditMatch = item.link.match(/reddit\.com\/r\/(\w+)/)
    const subreddit = subredditMatch?.[1] || 'reddit'

    if (subreddits.length > 0 && !subreddits.map(s => s.toLowerCase()).includes(subreddit.toLowerCase())) continue

    // Prova a parsare la data reale da SerpAPI
    let createdAt = now - 86400 * 7
    if (item.date) {
      const parsed = Date.parse(item.date)
      if (!isNaN(parsed)) createdAt = parsed / 1000
    }

    // Filtra per periodo selezionato
    if (createdAt < timeThreshold[timeFilter]) continue

    leads.push({
      id: item.position?.toString() || Math.random().toString(),
      title: item.title || '',
      body: item.snippet || '',
      subreddit,
      author: '',
      url: item.link,
      createdAt,
      isNew: now - createdAt < 86400,
    })
  }

  return leads
}