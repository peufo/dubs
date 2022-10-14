import path from 'path'
import { buildConfig } from 'payload/config'

import { Users } from './collections'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users],
  typescript: path.resolve(__dirname, 'types', 'payload.ts'),
})
