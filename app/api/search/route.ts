import { NextRequest, NextResponse } from 'next/server'
import { searchReddit } from '@/lib/reddit'
import { TimeFilter, SUBREDDITS } from '@/lib/types'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  pro: 200,
  agency: 500,
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Recupera piano utente
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true }
    })

    const plan = user?.plan || 'free'
    const limit = PLAN_LIMITS[plan] || 3

    // Conta ricerche questo mese
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const searchCount = await prisma.search.count({
      where: {
        userId: session.user.id,
        createdAt: { gte: startOfMonth }
      }
    })

    if (searchCount >= limit) {
      return NextResponse.json({
        error: 'LIMIT_REACHED',
        plan,
        limit,
        used: searchCount
      }, { status: 403 })
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

    const leads = await searchReddit(query, validSubreddits, validTimeFilter, null)

    // Salva ricerca nel DB
    await prisma.search.create({
      data: {
        userId: session.user.id,
        query,
        subreddits: validSubreddits,
        timeFilter: validTimeFilter,
        resultsCount: leads.length
      }
    })

    return NextResponse.json({
      leads,
      totalFound: leads.length,
      usage: { used: searchCount + 1, limit, plan }
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}