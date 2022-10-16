import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './collections/Users'
import { Resource } from './collections/Resources'

import { Logo, Icon } from './Custom'

export default buildConfig({
  serverURL: `http://localhost:5002`,
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
  collections: [Users, Resource],
  typescript: {
    outputFile: path.resolve(__dirname, '../../types/collections.ts'),
  },
})
