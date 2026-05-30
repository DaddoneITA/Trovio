import { Lead, TimeFilter } from '@/lib/types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter,
  apiKey: string | null
): Promise<Lead[]> {
  const timeMapping: Record<TimeFilter, string> = {
    '24h': 'day',
    week: 'week',
    month: 'month',
  }

  const now = Date.now() / 1000

  const results = await Promise.allSettled(
    subreddits.map(async (subreddit) => {
      const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&sort=new&limit=15&restrict_sr=true&t=${timeMapping[timeFilter]}`
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Trovio/1.0)',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      })
      if (!res.ok) {
        console.error(`Reddit r/${subreddit}: ${res.status}`)
        return []
      }
      const data = await res.json()
      return data?.data?.children || []
    })
  )

  const seen = new Set<string>()
  const leads: Lead[] = []

  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    for (const post of result.value) {
      const d = post.data
      if (!d || seen.has(d.id)) continue
      seen.add(d.id)
      leads.push({
        id: d.id,
        title: d.title || '',
        body: d.selftext?.substring(0, 500) || '',
        subreddit: d.subreddit,
        author: d.author,
        url: `https://reddit.com${d.permalink}`,
        createdAt: d.created_utc,
        isNew: now - d.created_utc < 86400,
      })
    }
  }

  return leads.sort((a, b) => b.createdAt - a.createdAt)
}