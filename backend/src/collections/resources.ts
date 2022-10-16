import type { CollectionConfig } from 'payload/types'

export const Resource: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 120,
    },
    {
      name: 'desciption',
      type: 'richText',
    },
    {
      name: 'location',
      type: 'point',
      required: true,
    },
  ],
}
