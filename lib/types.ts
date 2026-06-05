export type LeadIntent = 'HIGH' | 'MEDIUM' | 'LOW'

export type Lead = {
  id: string
  title: string
  body: string
  subreddit: string
  author: string
  url: string
  createdAt: number
  isNew: boolean
  // AI enrichment (Groq)
  intent?: LeadIntent
  score?: number
  score_reason?: string
  category?: string
  client_type?: 'freelance' | 'agency' | 'business'
  summary?: string
  keywords?: string[]
  outreach_message?: string
}

export type SavedLead = Lead & {
  savedAt: number
}

export type SearchHistoryEntry = {
  id: string
  query: string
  resultsCount: number
  subreddits: string[]
  timeFilter: string
  timestamp: number
}

export type TimeFilter = '24h' | 'week' | 'month'

export const SUBREDDITS = [
  'forhire',
  'hiring',
  'entrepreneur',
  'smallbusiness',
  'startups',
  'webdev',
  'SEO',
  'digitalnomad',
] as const

export type SubredditName = (typeof SUBREDDITS)[number]
