import path from 'path'
import { CollectionConfig } from 'payload/types'

const dev = process.env.NODE_ENV !== 'production'

// TODO: fix this shit
// const home = process.env.HOME
const home = '/home/clients/e0f6b0129d9ebe0e9e898571fcb68d76'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [{ type: 'text', name: 'title' }],
  upload: {
    staticURL: '/media',
    staticDir: dev ? '../media' : path.resolve(home, 'dubs', 'media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 400,
        height: null,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1024,
        height: null,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
