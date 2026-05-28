import { Lead, TimeFilter } from './types'

export async function searchReddit(
  query: string,
  subreddits: string[],
  timeFilter: TimeFilter
): Promise<Lead[]> {
  const searchTerms = `${query} (hiring OR need OR "looking for" OR freelancer OR help)`
  const allLeads: Lead[] = []
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

  for (const subreddit of subreddits) {
    try {
      const params = new URLSearchParams({
        q: searchTerms,
        sort: 'new',
        limit: '25',
        restrict_sr: 'true',
        t: timeMapping[timeFilter],
      })

      const url = `https://www.reddit.com/r/${subreddit}/search.json?${params}`
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Trovio/1.0 (lead finder tool)',
        },
        next: { revalidate: 300 },
      })

      if (!response.ok) {
        console.error(
          `Reddit API error for r/${subreddit}: ${response.status}`
        )
        continue
      }

      const data = await response.json()
      const posts = data?.data?.children || []

      for (const post of posts) {
        const d = post.data
        if (seenIds.has(d.id)) continue
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

      // Rate limit: wait between requests
      await new Promise((resolve) => setTimeout(resolve, 1200))
    } catch (error) {
      console.error(`Error searching r/${subreddit}:`, error)
    }
  }

  allLeads.sort((a, b) => b.createdAt - a.createdAt)
  return allLeads
}
