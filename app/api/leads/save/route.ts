import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { leadId, title, url, subreddit, snippet } = await request.json()

    if (!leadId || !title || !url || !subreddit) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existing = await prisma.savedLead.findUnique({
      where: { userId_redditId: { userId: session.user.id, redditId: leadId } },
    })

    if (existing) {
      return NextResponse.json({ success: true })
    }

    await prisma.savedLead.create({
      data: {
        userId: session.user.id,
        redditId: leadId,
        title,
        url,
        subreddit,
        snippet: snippet?.substring(0, 500) || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save lead error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { leadId } = await request.json()

    await prisma.savedLead.deleteMany({
      where: { userId: session.user.id, redditId: leadId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete lead error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
