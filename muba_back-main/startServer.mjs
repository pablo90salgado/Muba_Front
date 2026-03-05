import app from './app.mjs'
import SERVER_CONFIG from './config/server.mjs'
import prisma from './config/database.mjs'

async function startServer () {
  try {
    await prisma.$connect()
    console.log('[Database] Connected successfully')

    app.listen(SERVER_CONFIG.PORT, () => {
      console.log(`[Server] ${SERVER_CONFIG.SERVICE} running on port ${SERVER_CONFIG.PORT}`)
      console.log(`[Server] Environment: ${SERVER_CONFIG.NODE_ENV}`)
    })
  } catch (error) {
    console.error('[Error] Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
