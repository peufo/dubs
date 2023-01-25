import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './collections/user'
import { Resource } from './collections/resource'
import { Action } from './collections/action'
import { Product } from './collections/product'
import { Item } from './collections/item'
import { Tag } from './collections/tag'
import { State } from './collections/state'
import { Doc } from './collections/doc'

import { Logo, Icon } from './components/Graphics'

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
  collections: [Users, Action, State, Resource, Product, Item, Tag, Doc],
  typescript: {
    outputFile: path.resolve(__dirname, '../../types/collections.ts'),
  },
})
