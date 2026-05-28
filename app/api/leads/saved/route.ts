import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const leads = await prisma.savedLead.findMany({
      where: { userId: session.user.id },
      orderBy: { savedAt: 'desc' },
    })

    return NextResponse.json({
      leads: leads.map((l) => ({
        id: l.redditId,
        title: l.title,
        url: l.url,
        subreddit: l.subreddit,
        body: l.snippet || '',
        savedAt: l.savedAt.getTime(),
      })),
    })
  } catch (error) {
    console.error('Get saved leads error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
