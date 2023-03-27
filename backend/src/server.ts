import express from 'express'
import payload from 'payload'
import proxy from 'express-http-proxy'

require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5002

console.log('PAYLOAD_SECRET', process.env.PAYLOAD_SECRET)
console.log('SMTP_PASS', process.env.SMTP_PASS)

const app = express()

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URL,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: http://localhost:${port}`)

    // Sert le frontend
    const DUBS_PORT = dev ? '5173' : process.env['DUBS_PORT'] || 3000
    app.use('/', proxy(`http://localhost:${DUBS_PORT}`))
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
