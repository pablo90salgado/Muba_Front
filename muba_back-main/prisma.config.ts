import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://muba_user:muba_pass@localhost:5432/muba_test?schema=public'
  }
})
