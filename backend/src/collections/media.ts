import { CollectionConfig } from 'payload/types'

require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'

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
    staticDir: dev ? '../media' : '~/dubs/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
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
