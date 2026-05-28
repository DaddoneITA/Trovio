import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { generateMessage } from '@/lib/messageGenerator'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const { service, postTitle, postBody } = body

    if (!service || !postTitle) {
      return NextResponse.json(
        { error: 'Service and postTitle are required' },
        { status: 400 }
      )
    }

    let credentials: { provider: 'openai' | 'anthropic' | 'gemini'; apiKey: string }[] | undefined

    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { aiProvider: true },
      })
      const allCreds = await prisma.aiCredential.findMany({
        where: { userId: session.user.id },
      })
      if (user?.aiProvider && allCreds.length > 0) {
        const matched = allCreds.find((c: any) => c.provider === user.aiProvider)
        if (matched) {
          credentials = [{ provider: matched.provider as any, apiKey: matched.apiKey }]
        }
      }
    }

    const message = await generateMessage(service, postTitle, postBody || '', credentials)

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Generate message API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
