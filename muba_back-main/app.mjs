import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import SERVER_CONFIG from './config/server.mjs'

const app = express()

app.use(helmet())
app.use(cors(SERVER_CONFIG.CORS_OPTIONS))
app.use(express.json({ limit: SERVER_CONFIG.BODY_LIMIT }))
app.use(express.urlencoded({ extended: true, limit: SERVER_CONFIG.BODY_LIMIT }))
app.use(morgan('dev'))

app.get('/health', (request, response) => {
  response.send({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
