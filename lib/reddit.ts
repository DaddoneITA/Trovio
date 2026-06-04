import { Lead, TimeFilter } from '@/lib/types'

function buildQuery(query: string): string {
  const q = query.trim().toLowerCase()
  
  // Aggiungi varianti comuni
  const variants: string[] = [query]
  
  if (!q.endsWith('er') && !q.endsWith('ist')) {
    variants.push(query + 'er')
  }
  if (q.endsWith('design')) {
    variants.push(query.replace('design', 'designer'))
  }
  if (q.endsWith('develop')) {
    variants.push(query.replace('develop', 'developer'))
  }
  if (q.endsWith('write') || q.endsWith('writing')) {
    variants.push('writer', 'copywriter')
  }

  const intentKeywords = 'hiring OR "looking for" OR "need a" OR "need help" OR "help wanted" OR "seeking" OR "freelancer"'
  
  const variantQuery = variants.length > 1 
    ? `(${variants.map(v => `"${v}"`).join(' OR ')})` 
    : `"${query}"`

  return `site:reddit.com ${variantQuery} ${intentKeywords}`
}

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

  const fullQuery = buildQuery(query)
  console.log('Search query:', fullQuery)

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

    if (
      subreddits.length > 0 &&
      !subreddits.map(s => s.toLowerCase()).includes(subreddit.toLowerCase())
    ) continue

    let createdAt = now - 86400 * 7
    if (item.date) {
      const parsed = Date.parse(item.date)
      if (!isNaN(parsed)) createdAt = parsed / 1000
    }

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