import { NextRequest, NextResponse } from 'next/server'
import { searchReddit } from '@/lib/reddit'
import { TimeFilter, SUBREDDITS } from '@/lib/types'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { assertWithinUsageLimit } from '@/lib/usage'
import { enrichLeadsWithGroq } from '@/lib/groq'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { query, subreddits, timeFilter }: {
      query: string
      subreddits: string[]
      timeFilter: TimeFilter
    } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const usage = await assertWithinUsageLimit(session.user.id, 'searches')
    if (!usage.ok) {
      return NextResponse.json(
        {
          error: 'Monthly search limit reached',
          limit: usage.limit,
          used: usage.used,
          plan: usage.plan,
        },
        { status: 429 }
      )
    }

    const validSubreddits = subreddits?.filter((s: string) =>
      (SUBREDDITS as readonly string[]).includes(s)
    ) || [...SUBREDDITS]

    const validTimeFilter: TimeFilter =
      timeFilter && ['24h', 'week', 'month'].includes(timeFilter) ? timeFilter : 'week'

    const rawLeads = await searchReddit(query, validSubreddits, validTimeFilter, null)
    const leads = await enrichLeadsWithGroq(rawLeads)

    await prisma.search.create({
      data: {
        userId: session.user.id,
        query: query.trim(),
        subreddits: validSubreddits,
        timeFilter: validTimeFilter,
        resultsCount: leads.length,
      },
    })

    return NextResponse.json({
      leads,
      totalFound: leads.length,
      usage: { used: usage.used + 1, limit: usage.limit, plan: usage.plan },
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
