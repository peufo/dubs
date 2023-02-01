import { buildConfig } from 'payload/config'
import path from 'path'

import { Users } from './collections/user'
import { Action } from './collections/action'
import { Tag } from './collections/tag'
import { Media } from './collections/media'
import { Logo, Icon } from './components/Graphics'
import { Landing } from './globals/landing'

const dev = process.env.NODE_ENV !== 'production'
// TODO: fix this shit
// const serverURL = dev ? 'http://localhost:5002' : process.env.DUBS_ORIGIN
const serverURL = dev ? 'http://localhost:5002' : 'https://dubs-apiculture.ch'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
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
    },
  },
  collections: [Users, Action, Tag, Media],
  globals: [Landing],
  typescript: {
    outputFile: path.resolve(__dirname, '../../types/collections.ts'),
  },
  cors: '*',
})
