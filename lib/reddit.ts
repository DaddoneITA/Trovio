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

  const timeMapping: Record<TimeFilter, string> = {
    '24h': 'd',
    week: 'w',
    month: 'm',
  }

  const subredditQuery = subreddits.map(s => `subreddit:${s}`).join(' OR ')
  const fullQuery = `(${subredditQuery}) ${query}`

  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(fullQuery)}&tbs=qdr:${timeMapping[timeFilter]}&num=20&api_key=${serpKey}`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    console.error(`SerpAPI error: ${res.status}`)
    return []
  }

  const data = await res.json()
  const results = data.organic_results || []

  console.log(`SerpAPI: found ${results.length} results`)

  const now = Date.now() / 1000
  const leads: Lead[] = []

  for (const item of results) {
    if (!item.link?.includes('reddit.com')) continue

    const subredditMatch = item.link.match(/reddit\.com\/r\/(\w+)/)
    const subreddit = subredditMatch?.[1] || 'reddit'

    leads.push({
      id: item.position?.toString() || Math.random().toString(),
      title: item.title || '',
      body: item.snippet || '',
      subreddit,
      author: '',
      url: item.link,
      createdAt: now - 86400,
      isNew: false,
    })
  }

  return leads
}