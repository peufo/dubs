import express from 'express'
import payload from 'payload'
import proxy from 'express-http-proxy'
require('dotenv').config()
import { env } from './env'

const dev = env('NODE_ENV') !== 'production'
const port = env('PORT', 5002)
const frontUrl = env('FRONT_URL', `http://localhost:${dev ? 5173 : 3000}`)
const secret = env('PAYLOAD_SECRET')
const mongoURL = env('MONGODB_URL')
const app = express()

payload.init({
  secret,
  mongoURL,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload server listening on port ${port}`)
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)

    // Sert le frontend
    if (frontUrl) {
      app.use(proxy(frontUrl))
      payload.logger.info(`Proxy to FRONT_URL actived: ${frontUrl}`)
    } else {
      payload.logger.info(`Proxy to FRONT_URL not actived`)
    }
  },
  email: {
    fromName: 'Dubs-apiculture',
    fromAddress: 'Dubs-apiculture <info@dubs-apiculture.ch>',
    transportOptions: {
      host: 'mail.infomaniak.com',
      auth: {
        user: 'info@dubs-apiculture.ch',
        pass: process.env.SMTP_PASS,
      },
      port: 465,
    },
  },
})

app.listen(port)
