import { NextRequest, NextResponse } from 'next/server'
import { searchReddit } from '@/lib/reddit'
import { TimeFilter, SUBREDDITS } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      query,
      subreddits,
      timeFilter,
    }: {
      query: string
      subreddits: string[]
      timeFilter: TimeFilter
    } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const validSubreddits =
      subreddits?.filter((s: string) =>
        (SUBREDDITS as readonly string[]).includes(s)
      ) || [...SUBREDDITS]

    const validTimeFilter: TimeFilter =
      timeFilter && ['24h', 'week', 'month'].includes(timeFilter)
        ? timeFilter
        : 'week'

    const leads = await searchReddit(query, validSubreddits, validTimeFilter)

    return NextResponse.json({
      leads,
      totalFound: leads.length,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
