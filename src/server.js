import express from 'express'
import payload from 'payload'
import * as dotenv from 'dotenv'
import { handler as ssrHandler } from '../dist/server/entry.mjs'

dotenv.config()

const app = express()

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: 'mongodb://localhost/dubs',
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

app.use(express.static('dist/client'))
app.use(ssrHandler)

app.listen(5001)
