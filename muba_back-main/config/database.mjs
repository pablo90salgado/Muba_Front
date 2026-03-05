import pkg from '@prisma/client'
const { PrismaClient } = pkg
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const globalForPrisma = globalThis

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://muba_user:muba_pass@localhost:5432/muba?schema=public'
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
