import express from 'express'
import payload from 'payload'
import proxy from 'express-http-proxy'

require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5002

const app = express()

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: 'mongodb://localhost/dubs',
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: http://localhost:${port}`)
  },
})

if (dev) {
  // Sert le site astro
  app.use('/', proxy('http://localhost:3000'))
}

app.listen(port)
