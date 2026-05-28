import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { encrypt, decrypt } from '@/lib/crypto'

const PROVIDERS = ['openai', 'anthropic', 'gemini'] as const
export type AiProvider = typeof PROVIDERS[number]

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const credentials = await prisma.aiCredential.findMany({
    where: { userId: session.user.id },
    select: { provider: true, apiKey: true },
  })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { aiProvider: true },
  })

  const result: Record<string, { configured: boolean; key: string }> = {}
  for (const p of PROVIDERS) {
    const cred = credentials.find((c) => c.provider === p)
    if (cred) {
      let masked = ''
      try {
        const decrypted = decrypt(cred.apiKey)
        masked = decrypted.substring(0, 8) + '...' + decrypted.slice(-4)
      } catch {
        masked = '❌ error'
      }
      result[p] = { configured: true, key: masked }
    } else {
      result[p] = { configured: false, key: '' }
    }
  }

  return NextResponse.json({
    credentials: result,
    selectedProvider: user?.aiProvider || '',
  })
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { provider, apiKey, selectedProvider } = body

  if (provider && apiKey !== undefined) {
    if (!PROVIDERS.includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
    }
    if (apiKey === '') {
      await prisma.aiCredential.deleteMany({
        where: { userId: session.user.id, provider },
      })
    } else {
      const encrypted = encrypt(apiKey)
      await prisma.aiCredential.upsert({
        where: { userId_provider: { userId: session.user.id, provider } },
        create: { userId: session.user.id, provider, apiKey: encrypted },
        update: { apiKey: encrypted },
      })
    }
  }

  if (selectedProvider !== undefined) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { aiProvider: selectedProvider },
    })
  }

  return NextResponse.json({ success: true })
}
