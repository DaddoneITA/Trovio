import { prisma } from '@/lib/db'

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  pro: 200,
  agency: 500,
}

type UsageResult = {
  ok: boolean
  used: number
  limit: number
  plan: string
}

export async function assertWithinUsageLimit(
  userId: string,
  _type: 'searches'
): Promise<UsageResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  const plan = user?.plan || 'free'
  const limit = PLAN_LIMITS[plan] ?? 3

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const used = await prisma.search.count({
    where: {
      userId,
      createdAt: { gte: startOfMonth },
    },
  })

  return {
    ok: used < limit,
    used,
    limit,
    plan,
  }
}
