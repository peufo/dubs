import { buildConfig } from 'payload/config'
import path from 'path'
import TodoLists from './collections/TodoLists'
import Users from './collections/Users'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [TodoLists, Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'collections.ts'),
  },
})