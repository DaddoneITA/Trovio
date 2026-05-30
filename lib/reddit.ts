import { Lead, TimeFilter } from './types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter
): Promise<Lead[]> {
  const searchTerms = `${query} (hiring OR need OR "looking for" OR freelancer)`
  const seenIds = new Set<string>()
  const timeMapping: Record<TimeFilter, string> = {
    '24h': 'day',
    week: 'week',
    month: 'month',
  }
  const now = Date.now() / 1000
  const minTimestamp: Record<TimeFilter, number> = {
    '24h': now - 86400,
    week: now - 604800,
    month: now - 2592000,
  }

  const results = await Promise.allSettled(
    subreddits.map(async (subreddit) => {
      const params = new URLSearchParams({
        q: searchTerms,
        sort: 'new',
        limit: '10',
        restrict_sr: 'true',
        t: timeMapping[timeFilter],
      })
      const url = `https://www.reddit.com/r/${subreddit}/search.json?${params}`
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Trovio/1.0' },
      })
      if (!response.ok) return []
      const data = await response.json()
      return data?.data?.children || []
    })
  )

  const allLeads: Lead[] = []
  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    for (const post of result.value) {
      const d = post.data
      if (!d || seenIds.has(d.id)) continue
      if (d.created_utc < minTimestamp[timeFilter]) continue
      seenIds.add(d.id)
      allLeads.push({
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

  return allLeads.sort((a, b) => b.createdAt - a.createdAt)
}