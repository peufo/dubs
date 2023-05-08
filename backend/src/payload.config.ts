import { buildConfig } from 'payload/config'
import path from 'path'

import { User, Account, Session } from './collections/user'
import { Action } from './collections/action'
import { Tag } from './collections/tag'
import { Media } from './collections/media'
import { Product } from './collections/product'
import { Order } from './collections/order'

import { Landing } from './globals/landing'
import { Footer } from './globals/footer'
import { Process } from './globals/process'
import { Email } from './globals/email'

import { Logo, Icon } from './components/Graphics'
import { BeforeNavLinks } from './components/BeforeNavLinks'
import { env } from './env'

const port = env('PORT', 5002)
const serverURL = env('SERVER_URL', `http://localhost:${port}`)

export default buildConfig({
  serverURL,
  admin: {
    user: User.slug,
    meta: {
      ogImage: '/img/logo.png',
      titleSuffix: '- Dubs Apiculture',
      favicon: '/favicon.ico',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
      beforeNavLinks: [BeforeNavLinks],
    },
  },
  collections: [User, Account, Session, Action, Tag, Media, Product, Order],
  globals: [Landing, Footer, Process, Email],
  typescript: {
    outputFile: path.resolve(__dirname, '../../types/collections.ts'),
  },
  cors: '*',
})
