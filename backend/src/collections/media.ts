import path from 'path'
import { CollectionConfig } from 'payload/types'

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
    staticDir: dev ? '../media' : path.resolve(process.env.HOME, 'media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card_w',
        width: 400,
        height: null,
        position: 'centre',
      },
      {
        name: 'card_h',
        width: null,
        height: 400,
        position: 'centre',
      },
      {
        name: 'mini',
        width: 200,
        height: null,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 700,
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
