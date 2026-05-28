import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function initPrisma(): PrismaClient | undefined {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return undefined

  try {
    const adapter = new PrismaPg({ connectionString: databaseUrl })
    const client = new PrismaClient({ adapter })
    globalForPrisma.prisma = client
    return client
  } catch {
    return undefined
  }
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const client = initPrisma()
    if (!client) {
      throw new Error(
        'Database not configured. Set DATABASE_URL in .env.local'
      )
    }
    return client
  }
  return globalForPrisma.prisma
}

export const prisma = new Proxy<PrismaClient>({} as PrismaClient, {
  get(_, prop) {
    return getPrisma()[prop as keyof PrismaClient]
  },
})
