import { NextRequest, NextResponse } from 'next/server'
import { searchReddit } from '@/lib/reddit'
import { TimeFilter, SUBREDDITS } from '@/lib/types'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { decrypt } from '@/lib/crypto'

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

    const validSubreddits = subreddits?.filter((s: string) =>
      (SUBREDDITS as readonly string[]).includes(s)
    ) || [...SUBREDDITS]

    const validTimeFilter: TimeFilter =
      timeFilter && ['24h', 'week', 'month'].includes(timeFilter) ? timeFilter : 'week'

    const credential = await db.aiCredential.findUnique({
      where: { userId_provider: { userId: session.user.id, provider: 'openai' } }
    })

    const apiKey = credential ? decrypt(credential.apiKey) : null

    const leads = await searchReddit(query, validSubreddits, validTimeFilter, apiKey)

    return NextResponse.json({ leads, totalFound: leads.length })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}